import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.json({message:' api server'})
})

app.listen(8000, () => console.log('HTTP SERVER RUNNING!'))