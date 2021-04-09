<a name="3iyYq"></a>
#### API 及插件体系
![](https://cdn.nlark.com/yuque/0/2021/jpeg/85556/1617949012904-f27286fe-815d-4843-b7e6-25986b2ffc38.jpeg)<a name="5Ujsd"></a>
#### 项目目录结构
```
project                 
├─ public             
│  └─ index.html        React 渲染挂载页面节点
├─ src                
│  ├─ actions           action（同步和异步）
│  │  └─ index.js     
│  ├─ components      
│  │  ├─ Component1.js  公共组件  
│  ├─ containers        页面
│  │  └─ Page1.js       
│  ├─ middleware        中间件
│  │  └─ index.ts    
│  ├─ reducers          纯函数
│  │  └─ index.ts     
|  ├─ store
|  │  └─ index.ts       创建存储 state  
│  └─ index.js        
└─ package.json        

```
<a name="BUgN5"></a>
#### 开发步骤

1. 定义 reducer（**required**）
```typescript
// src/reducers/reducer1.ts
const reducer1 = (state = {}, action) => {
  // 根据 action.type 返回新的 state
}

// 其它 reducer...

// src/reducers/index.ts
// 合并 reducer
import { combineReducers } from 'redux'
const rootReducer = combineReducer({reducer1, reducer2,...})
```

2. 定义 action（**required**）
```typescript
// src/actions/index.ts
// 常量定义 action type
export const ACTION_TYPE1 = 'ACTION_TYPE1'
export const ACTION_TYPE2 = 'ACTION_TYPE2'
// 同步 action，修改 store
const syncAction1 = (payload) => {
  // 最佳实践结构：type、payload
  return {
    type: ACTION_TYPE1,
    // 处理 payload 返回新的数据作为 store 的一部分
    payload: handle(payload)
  }
}
const syncAction2 = (payload, json) => {
  return {
    type: ACTION_TYPE2,
    payload,
    json
  }
}
// 异步 action，异步操作，拿到通过纯 reducer 函数修改 store
// 通过 dispatch 发起一个新的 action，通过 getState 可以拿到最新的 store
const asyncAction1 = (payload) => (dispatch, getState) => {
  dispatch(syncActiion1(payload))
  return fetch('url')
    .then(res => res.json())
    .then(json => {
  		dispatch(syncAction2(payload, json))
    })
}
```

3. 创建 store（**required**）
```typescript
// src/store/index.ts
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

const configStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    // applyMiddleware(thunk, createLogger())
    // 或
    compose(
      // 引用中间件
      applyMiddleware(thunk, createLogger()),
      // 浏览器控制台调试工具
      DevTools.instrument()
    )
  )
  
  // 开发环境下，热更新
  if (module.hot) {
    // Enable Webpack hot module replacement for reducer
    module.hot.accept('../reducers', () => {
      stroe.replaceReducer(rootReducer)
    })
  }
  
  return store
}
export default configureStore
```

4. 创建、引用、注入中间件
4. 将 redux store 与 React 组件关联（增删改查数据、订阅数据变化）（**required**）
```typescript
// src/App.ts 根组件
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * from actions from './actions'

// syncAction1、syncAction2、asyncAction1 是通过 line 13~15 注入的 
const App = ({ syncAction1, syncAction2, asyncAction1 }) => {
  return <div>...</div>
}
// 可以要全部 store
// const mapStateToProps = (state) => state
// 或要部分 store
const mapStateToProps = (state) => ({
  counter: state.counter
})
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}
// 将 redux store、action 注入组件
export default connect(mapStateToProps, mapDispatchToProps)(App)
```
```typescript
// src/index.ts 项目入口
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { App } from './App'

const preloadedState = {}
const store = configureStore(preloadedState)
ReactDOM.render(<Propvider store={store}><App /></Provider>, document.getElementById('root'))
```


<a name="oIalW"></a>
#### 学习资源
[Redux](https://github.com/reduxjs/redux)<br />[Redux 中文文档](https://www.redux.org.cn/)
