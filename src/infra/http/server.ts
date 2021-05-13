import express from 'express'

const port = 8000

const app = express()
app.use(express.json())
app.listen(8000, () => {console.log(`server is running on port: ${port}`)})
