/* eslint-disable testing-library/prefer-screen-queries */
import { Page, test } from '@playwright/test'
import { wait, waitForPageLoaded } from '../utils/common'
import { createUser, walletLogin } from '../utils/auth/wallet'

test.describe('social tests', async () => {
  let page: Page
  // let auth: Auth

  test.beforeEach(async ({ context }) => {
    const res = await walletLogin(context)
    // console.log(res)
    await createUser(res)
    page = await context.newPage()
    await page.goto('/')
    await waitForPageLoaded(page)

    const windowObject = await page.evaluate(() => {
      return JSON.stringify((window as any).ethereum)
    })
    // console.log(windowObject)
    // await page.addInitScript(() => {
    //   (window as any).ethereum = {
    //     enable: () => Promise.resolve(),
    //     selectedAddress: '0x4d3a30a13440fc4ba7a41b30efcc5bc7336831d0',
    //     // _state: {
    //     //   accounts: ['0x4d3a30a13440fc4ba7a41b30efcc5bc7336831d0'],
    //     //   isUnlocked: true,
    //     // },
    //   }
    // })
    // await page.goto('/')
    // await waitForPageLoaded(page)
  })

  test('has login btn', async () => {
    await page.getByRole('button', { name: 'Login' }).click()
    await wait(4000)
  })
})
