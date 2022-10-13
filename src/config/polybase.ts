import { Polybase } from '@polybase/client'

const polybase = new Polybase({
  baseURL: `${process.env.REACT_APP_API_URL}/v0`,
})

export default polybase
