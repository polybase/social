import { ColorModeScript } from '@chakra-ui/react'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserTracing } from '@sentry/tracing'
import * as Sentry from '@sentry/react'
import { App } from './App'
import reportWebVitals from './reportWebVitals'
import * as serviceWorker from './serviceWorker'
import posthog from 'posthog-js'

const {
  REACT_APP_VERSION,
  REACT_APP_SENTRY_DSN,
  REACT_APP_ENV_NAME,
  NODE_ENV,
} = process.env

if (NODE_ENV === 'production') {
  Sentry.init({
    dsn: REACT_APP_SENTRY_DSN,
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    release: `v${REACT_APP_VERSION}`,
    environment: REACT_APP_ENV_NAME,
  })
}

// Analytics
posthog.init('phc_DBZY8MbRdRIIwSwX4ZSwTAjy5ogdQPDMVdPObOuQQf', { api_host: 'https://a.polybase.xyz' })
if (process.env.REACT_APP_ENV_NAME !== 'production') {
  posthog.opt_out_capturing()
}

const container = document.getElementById('root')
if (!container) throw new Error('Failed to find the root element')
const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <ColorModeScript />
    <App />
  </React.StrictMode>,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

