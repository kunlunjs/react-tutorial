import {
  select,
  takeEvery,
  take,
  put,
  call,
  fork,
  spawn,
  race,
  cancel,
  cancelled
} from 'redux-saga/effects'
import { delay, eventChannel, END } from 'redux-saga'

/**
 * take 等待一个特定的 action
 * put 发起 action 到 store
 * call 异步调用 action
 * fork 非阻塞请求，用来创建 attached forks
 * spawn 用来创建 detached forks
 */
function* authorize(user, password) {
  try {
    const token = yield call(Api.authorize, user, password)
    // 同步保存 token 到 store
    yield put({ type: 'LOGIN_SUCCESS', token })
    // 异步存储 token
    yield call(Api.storeItem, { token })
    return token
  } catch (error) {
    // 登录失败
    yield put({ type: 'LOGIN_ERROR', error })
  } finally {
    // 监听是否被取消操作
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}
function* loginFlow1() {
  while (true) {
    const { user, password } = yield take('LOGIN_REQUEST')
    const token = yield call(authorize, user, password)
    if (token) {
      yield call(Api.storeItem({ token }))
      yield take('LOGOUT')
      yield call(Api.clearItem('token'))
    }
  }
}
function* loginFlow2() {
  while (true) {
    const { user, password } = yield take('LOGIN_REQUEST')
    // 相比上面的 call，fork 不会阻塞 authorize 请求，可以继续监听下面的 action
    const task = yield fork(authorize, user, password)
    const action = yield take(['LOGOUT', 'LOGIN_ERROR'])
    if (action.type === 'LOGOUT') {
      // 如果用户发起了 LOGOUT，则取消正在进行的 authorize 请求
      yield cancel(task)
      yield call(Api.clearItem('token'))
    }
  }
}
/**
 * 监听所有发起到 store 的 action
 */
function* watchAndLog1() {
  yield takeEvery('*', function* logger(action) {
    const state = yield select()
    console.log(`action `, action)
    console.log(`state after`, state)
  })
}
function* watchAndLog2() {
  while (true) {
    const action = yield take('*')
    const state = yield select()
    console.log(`action `, action)
    console.log(`state after`, state)
  }
}

/**
 * 监听用户操作，三次以后显示祝贺信息
 */
function* watchFirstThreeTodosCreation() {
  for (let i = 0; i < 3; i++) {
    const action = yield take('TODO_CREATED')
  }
  yield put({ type: 'SHOW_CONGRATULATION' })
}

/**
 * 60s 内完成任务
 */
function* game(getState) {
  let finished
  while (!finished) {
    const { score, timeout } = yield race({
      score: call(play, getState),
      timeout: call(delay, 60000)
    })
    if (!timeout) {
      finished = true
      yield put(showScore(score))
    }
  }
}
