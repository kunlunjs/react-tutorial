import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware, { END } from 'redux-saga'
import sagaMonitor from '@redux-saga/simple-saga-monitor'
import rootReducer from '../reducers'

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor })

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(sagaMiddleware, createLogger())
      // typeof window === 'object' &&
      //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
      //   window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }
  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  return store
}
