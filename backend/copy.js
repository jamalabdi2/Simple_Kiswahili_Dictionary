const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const user = require('./jamal.json')


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

PORT = process.env.PORT || 5460

app.get('/word', async (req,res) =>{
    const word = req.params.word.toLowerCase()

    try {
        dictionaryPath = '/Users/jamal/Documents/kiswahili/backend/words.json'
        const dictionary = await fs.readFile(dictionaryPath,'utf-8')
        const dictionaryData = JSON.parse(dictionary)
        const meaning = dictionaryData[word]

        if(meaning){
            res.status(200).json({
                word: word,
                meaning: meaning.meaning,
                synonyms: meaning.synonyms,
            });
        }else {
            res.status(404).json({ error: 'Word not found' });
        }
            
      
        
    } catch (dictionaryReadingError) {
        console.error('Error reading dictionary,',dictionaryReadingError)
        res.status(500).json({errorMessage: dictionaryReadingError.message})
        
    }
    console.table({
        word
    })
    res.status(200).json({
        answer: 'Hey it is from fetch api',
        method:'GET',
        status:200,
        Response:'Ok'
    })
})
app.get('/api/user', async (req, res) => {
    try {
        // Specify the path to the JSON file in the base directory
        const filePath = path.join(__dirname, 'jamal.json');

        // Read the JSON file
        const fileContent = await fs.readFile(filePath, 'utf-8');
        
        // Parse the JSON data
        const userData = JSON.parse(fileContent);
        console.log(userData)
        // Send the JSON data as a response
        res.json(userData.slice(0,2));
    } catch (error) {
        console.error('Error reading or sending user data:', error);
        res.status(500).json({ errorMessage: error.message });
    }
});
app.get('/:word', (req,res) =>{
    const filePath = path.join(__dirname,'words.json')
    const userInput = req.params.word.toLowerCase().trim()
    console.log('params: ',userInput)
    fs.readFile(filePath,'utf-8', (fileReadingError,data) =>{
        if(fileReadingError) throw fileReadingError
        const fileContent = JSON.parse(data)
        for(const key in fileContent){
            
            const value = fileContent[key].Word
            if (userInput === value){
                console.log('matched')
                console.log(fileContent[key].Meaning)
                res.send('matched')
                return
            }else{
                res.send('not matched')
            }
            // if(userInput == value){
            //     console.log('yes')
            //     console.log(fileContent[key].Meaning)
            //     return fileContent[key].Meaning
            // }else{
            //     console.log('not found')
            //     return
            // }
         
            
        }

        // res.send('okau')
    })
})
app.listen(PORT, () =>{
    console.log(`server running on port: ${PORT}`)
})
