import App from '../common/containers/App'
import { Provider } from 'react-redux'
import React from 'react'
import configureStore from '../common/store/configureStore'
import { render } from 'react-dom'

// 在服务端注入
const preloadedState = window.__PRELOADED_STATE__
const store = configureStore(preloadedState)
const rootElement = document.getElementById('app')

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
