import { createConnection } from "typeorm";
import path from 'path' 

const app = path.resolve(__dirname, 'http','app.ts')

createConnection()
  .then(() => {
    console.log("Connected to the database")
    import(app)
  })
  .catch((err => {
    console.error(err)
    process.exit(1)
  }))