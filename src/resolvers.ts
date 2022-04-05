import * as db from "./db"

export const Query = {
  test: () => 'Success ! GraphQL server is up & running',
  restaurants: () => db.restaurants.list(),
  courses: () => db.courses.list()
}