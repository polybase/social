import * as React from 'react'
import {
  ChakraProvider,
} from '@chakra-ui/react'
import { Global } from '@emotion/react'
import globalStyles from './globalStyles'
import { BrowserRouter as Router } from 'react-router-dom'
import theme from './theme'
import AppRoutes from './AppRoutes'
import ScrollToTop from 'modules/common/ScrollToTop'
import PostHogPageView from 'modules/common/PostHogPageView'
import { AuthProvider } from 'features/users/AuthProvider'
import { SpacetimeProvider } from '@spacetimexyz/react'
import spacetime from 'config/spacetime'


export const App = () => {
  return (
    <SpacetimeProvider spacetime={spacetime}>
      <AuthProvider
        domain={process.env.REACT_APP_DOMAIN}
        storagePrefix={process.env.REACT_APP_AUTH_STORAGE_PREFIX}
      >
        <ChakraProvider theme={theme}>
          <Global styles={[globalStyles]} />
          <Router>
            <PostHogPageView />
            <ScrollToTop />
            <AppRoutes />
          </Router>
        </ChakraProvider>
      </AuthProvider>
    </SpacetimeProvider>
  )
}
