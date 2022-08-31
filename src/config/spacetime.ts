import { Spacetime } from '@spacetimexyz/client'

const spacetime = new Spacetime({
  baseURL: `${process.env.REACT_APP_API_URL}/v0/data`,
})

export default spacetime