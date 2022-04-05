import { DataStore } from 'notarealdb'

const store = new DataStore('./data')

export const restaurants = store.collection('restaurants')
export const courses = store.collection('courses')