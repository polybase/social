/* eslint-disable handle-callback-err */
import React, { ErrorInfo, createContext } from 'react'
import * as Sentry from '@sentry/browser'
import merge from 'lodash/merge'
import isEqual from 'lodash/isEqual'
import { useAuth } from 'features/users/useAuth'

export const ErrorBoundaryContext = createContext<ErrorBoundaryDefaults>({})

interface ErrorBoundaryDefaults {
  logFilters?: string[]
  extra?: any
  content?: React.ReactNode
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  content?: React.ReactNode
  code?: string
  extra?: any
  logFilters?: string[]
  defaults?: any
  userId?: string
}

interface ErrorBoundaryState {
  hasError: boolean
}

export default function ErrorBoundary (props: ErrorBoundaryProps) {
  const { auth } = useAuth()
  const userId = auth?.userId || undefined
  return <ErrorBoundaryInner userId={userId} {...props} />
}

export class ErrorBoundaryInner extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  value: ErrorBoundaryDefaults = {}

  constructor (props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
    this.value = {}
  }

  static contextType = ErrorBoundaryContext

  static getDerivedStateFromError (err: Error) {
    return { hasError: !!err }
  }

  getValue (): ErrorBoundaryDefaults {
    const val = merge(
      {},
      (this.context as any).defaults,
      this.props.defaults,
      this.props,
    )
    if (isEqual(this.value, val)) return this.value
    this.value = val
    return val
  }

  componentDidCatch (error: Error, info: ErrorInfo) {
    const logFilters = this.getValue().logFilters
    // Skip if matches prevent log
    if (logFilters &&
      logFilters.filter(filterStr => error?.message.includes(filterStr)).length > 0
    ) return

    // You can also log the error to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      const props = this.props
      Sentry.configureScope(function (scope) {
        scope.setExtra('info', info)
        if (props.code) scope.setTag('code', props.code)
        if (props.extra) scope.setExtras(props.extra)
        if (props.userId) {
          scope.setUser({
            id: props.userId,
            // email: user.email || undefined,
          })
        }
        Sentry.captureException(error)
      })
    } else {
      console.error(error, info, this.props.code)
    }
  }

  render () {
    const { content } = this.getValue()
    const childEl = this.state.hasError
      ? (content || <p data-error-code={this.props.code}>Sorry, we&apos;re unable to show this right now</p>)
      : this.props.children

    if (this.props.defaults) {
      return (
        <ErrorBoundaryContext.Provider value={this.value}>
          {childEl}
        </ErrorBoundaryContext.Provider>
      )
    }

    return childEl
  }
}
