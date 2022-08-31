import React from 'react'
import {
  Tabs, TabList, Tab,
} from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { findIndex, map } from 'lodash'

export interface TabsNavProps {
  baseUrl?: string
  tabs: {
    title: string
    path: string
    exact?: boolean
  }[]
}

export function TabsNav ({ tabs, baseUrl }: TabsNavProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const index = findIndex(tabs, ({ exact, path }) =>
    (exact && `${baseUrl ?? ''}${path}` === location.pathname) ||
    (!exact && location.pathname.startsWith(`${baseUrl ?? ''}${path}`)),
  )

  return (
    <Tabs
      onChange={(index) => {
        const path = tabs[index]?.path
        navigate(`${baseUrl ?? ''}${path}`)
      }}
      onClick={() => {
        const path = tabs[index]?.path
        navigate(`${baseUrl ?? ''}${path}`)
      }}
      index={index}
      colorScheme='brand'
    >
      <TabList>
        {map(tabs, ({ path, title }) => (
          <Tab key={path}>{ title }</Tab>
        ))}
      </TabList>
    </Tabs>
  )
}
