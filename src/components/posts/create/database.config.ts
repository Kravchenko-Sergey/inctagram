import Dexie from 'dexie'

export const database = new Dexie('database')

database.version(1).stores({
  photos: 'id',
  pages: 'page',
})

export const draftTable = database.table('photos')
export const pageTable = database.table('pages')


export default database;


