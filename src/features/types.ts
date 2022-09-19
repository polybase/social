export interface User {
  id: string
  name?: string
  description?: string
  icon?: string
  account: string
  pvkey: string
  $pk: string
}

export interface Follower {
  id: string
  follower: string
  followee: string
  email: string
  $pk: string
}

export interface Message {
  id: string
  message: string
  account: string
  timestamp: string
  $pk: string
}
