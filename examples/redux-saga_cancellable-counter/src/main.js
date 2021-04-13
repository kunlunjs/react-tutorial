import 'regenerator-runtime/runtime'
import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
import rootSaga from './sagas'
import Counter from './components/Counter'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)
sagaMiddleware.run(rootSaga)

render(
  <Provider store={store}>
    <Counter />
  </Provider>,
  document.getElementById('root')
)
