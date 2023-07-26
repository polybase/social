import { Page, Frame, expect } from '@playwright/test'

export const waitForPageLoaded = async (page: Page | Frame) =>
  page.waitForLoadState('load')

export const pathNameShouldMatchRoute = async (page: Page, path: string) =>
  expect(page.url()).toEqual('http://localhost:3000' + path)

export const wait = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time))
