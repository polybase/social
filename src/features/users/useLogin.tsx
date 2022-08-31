// import { useWeb3 } from 'features/web3/useWeb3'
import { useAuth } from './useAuth'

export function useLogin () {
  // const web3 = useWeb3()
  const { login } = useAuth()

  return async () => {
    // const t = Math.floor(new Date().getTime() / 1000)
    // const hash = web3.utils.keccak256(t + '.' + 'body')
    console.log('Hello World')
    // const account = await web3.eth.requestAccounts()
    // console.log(account)
    // // const signature = await web3.eth.sign(hash, account)
    // login(account[0])
  }
}