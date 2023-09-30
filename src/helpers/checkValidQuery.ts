import { ParsedUrlQuery } from 'querystring'

export const checkValidQuery = <T extends ParsedUrlQuery>(query: ParsedUrlQuery): query is T => {
  return Object.values(query).every(key => typeof key === 'string')
}
