export interface TweetDTO {
  id: number,
  body: string,
  image: string,
  author: {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
  }
}
