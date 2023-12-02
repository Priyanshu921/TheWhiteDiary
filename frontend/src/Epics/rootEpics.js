import {combineEpics} from 'redux-observable'
import { userEpics } from './userEpics'
import { quoteEpics } from './quoteEpic'
import { postEpics } from './postEpic'
export const rootEpics = combineEpics(
    ...userEpics,
    ...quoteEpics,
    ...postEpics
)