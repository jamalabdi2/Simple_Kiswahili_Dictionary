const express = require('express')
const cors = require('cors')
const router = require('./routes/mainRoute')

require('dotenv').config()


const app = express()
app.use(express.json())
app.use('/',router)
app.use(express.urlencoded({extended:false}))
app.use(cors())


PORT = process.env.PORT || 5460

app.listen(PORT, () =>{
    console.log(`server running on port: ${PORT}`)
})
