const dictionary = require('../words.json')
const handleGetRequest = (req,res) =>{
    console.log(req.params)
    const userInput = req.params.word.toLowerCase()
    console.log(`User input is: ${userInput}`)
    
    for(const key in dictionary){
        if(dictionary[key].Word.toLowerCase() === userInput){
            const meaning = dictionary[key].Meaning
            const Synonyms = dictionary[key].Synonyms
            return res.status(200).json({
                word:userInput,
                meaning:meaning,
                Synonyms:Synonyms,
                statusCode:200,
                status: "ok"
            })
            

        }
    }
    res.status(404).json({
        statusCode:404,
        status: 'Not Found',
        message: `${userInput} is not found in dictionary`
    })

}

module.exports = {
    handleGetRequest
}