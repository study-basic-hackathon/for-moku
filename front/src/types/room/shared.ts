export type User = {
  id: string,
  name: string,
  email: string,
  image: string,
  bio?: string,
  interests?: string,
}

export type UserIcon = {
  user: User,
  position: { x: number, y: number },
}
