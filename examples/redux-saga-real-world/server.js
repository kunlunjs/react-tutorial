/* eslint-disable no-console */
import 'regenerator-runtime/runtime'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import express from 'express'
import favicon from 'serve-favicon'
import { match, createMemoryHistory } from 'react-router'
import config from './webpack.config'
import routes from './src/routes'
import Root from './src/containers/Root'
import configureStore from './src/store/configureStore'
import rootSaga from './src/sagas'

const app = express()
const port = 3000

app.use(favicon(path.join(__dirname, 'public/favicon.ico')))
const compiler = webpack(config)
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    writeToDisk: true
  })
)
app.use(webpackHotMiddleware(compiler))

const layout = (body, initialState) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8"/>
    <title>Redux-saga real-world universal example</title>
  </head>
  <body>
    <div id="root"><div>${body}</div></div>
    <script type="text/javascript" charset="utf-8">
      window.__INITIAL_STATE__ = ${initialState};
    </script>
    <script src="/static/bundle.js"></script>
  </body>
  </html>
`

app.use(function (req, res) {
  console.log('req', req.url)
  const store = configureStore()

  // Note that req.url here should be the full URL path from
  // the original request, including the query string.
  match(
    { routes, location: req.url },
    (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps && renderProps.components) {
        const rootComp = (
          <Root
            store={store}
            routes={routes}
            history={createMemoryHistory()}
            renderProps={renderProps}
            type="server"
          />
        )

        store
          .runSaga(rootSaga)
          .toPromise()
          .then(() => {
            console.log('sagas complete')
            res
              .status(200)
              .send(
                layout(
                  renderToString(rootComp),
                  JSON.stringify(store.getState())
                )
              )
          })
          .catch(e => {
            console.log(e.message)
            res.status(500).send(e.message)
          })

        renderToString(rootComp)
        store.close()

        //res.status(200).send(layout('','{}'))
      } else {
        res.status(404).send('Not found')
      }
    }
  )
})

app.listen(port, function (error) {
  if (error) {
    console.error(error)
  } else {
    console.info(
      '==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.',
      port,
      port
    )
  }
})
