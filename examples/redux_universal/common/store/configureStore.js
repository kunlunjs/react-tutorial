import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk)
      // TODO FIX
      // typeof window === 'object' &&
      //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
      // window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer)
    })
  }

  return store
}

export default configureStore
