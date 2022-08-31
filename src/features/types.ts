export interface User {
  id: string
  name: string
  desc: string
  icon: string
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

export interface Tweet {
  id: string
  message: string
  user: string
  $pk: string
}