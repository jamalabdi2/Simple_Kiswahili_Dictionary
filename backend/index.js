const express = require('express')
const cors = require('cors')
require('dotenv').config()

const dictionary = require('./words.json')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

PORT = process.env.PORT || 5460


app.get('/:word',(req,res) =>{
    console.log(req.params)
    const userInput = req.params.word.toLowerCase()
    console.log(`User input is: ${userInput}`)
    
    for(const key in dictionary){
        if(dictionary[key].Word.toLowerCase() === userInput){
            const meaning = dictionary[key].Meaning
            const Synonyms = dictionary[key].Synonyms
            res.status(200).json({
                word:userInput,
                meaning:meaning,
                Synonyms:Synonyms,
                statusCode:200,
                status: "ok"
            })
            return // word already found so stop searching

        }
    }
    res.status(404).json({
        statusCode:404,
        status: 'Not Found',
        message: `${userInput} is not found in dictionary`
    })

    //login
    //sanitize the userinput
    //validate it to make sure is only string
    //make is sure it is lowercase and spaces removed
    //read the json file containing words and it's meaning
    //if the word is found return success and the meaning back to the client
    //if not return error erro message with not found error
  
})
app.listen(PORT, () =>{
    console.log(`server running on port: ${PORT}`)
})
