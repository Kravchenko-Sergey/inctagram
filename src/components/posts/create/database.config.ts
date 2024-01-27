import Dexie from 'dexie'

export const database = new Dexie('database')

database.version(1).stores({
  photos: 'id',
  pages: 'page',
  publication: 'publication',
})

export const draftTable = database.table('photos')
export const pageTable = database.table('pages')
export const textPublicationTable = database.table('publication')

export default database
