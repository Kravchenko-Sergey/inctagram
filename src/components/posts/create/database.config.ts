import Dexie from 'dexie'

export const database = new Dexie('database')

database.version(1).stores({
  photos: 'id',
})

export const customerTable = database.table('photos')

export default database;


