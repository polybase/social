import React from 'react'
import ReactLoadable from 'react-loadable'

function Loading (props: any) {
  if (props.error) {
    if (process.env.NODE_ENV !== 'production') console.error(props.error)
    return <div>Error!</div>
  } else if (props.pastDelay) {
    return <div>Loading...</div>
  } else {
    return null
  }
}

export default function Loadable (loader: () => Promise<React.ComponentType<any> | { default: React.ComponentType<any> }>) {
  return ReactLoadable({
    loading: Loading,
    loader,
    delay: 300,
  })
}
