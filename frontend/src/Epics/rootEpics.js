import {combineEpics} from 'redux-observable'
import { userEpics } from './userEpics'
import { quoteEpics } from './quoteEpic'
export const rootEpics = combineEpics(
    ...userEpics,
    ...quoteEpics
)