import React from 'react'
import { render } from 'react-dom'
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import generateTree from './generateTree'
import Node from './containers/Node'

const tree = generateTree()
const store = createStore(
  reducer,
  tree,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

render(
  <Provider store={store}>
    <Node id={0} />
  </Provider>,
  document.getElementById('root')
)
