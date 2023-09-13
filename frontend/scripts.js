const form  = document.getElementById('dictionaryForm')
const input = document.getElementById('input')
const tableBody = document.getElementById('tableBody')

async function fetchMeaning(word){
    const url = `http://127.0.0.1:5460/${word}`
    const response = await fetch(url)
    return response.json()
}

form.addEventListener('submit', async (e) =>{
    e.preventDefault()
    const userInput = input.value

    try {
        const response = await fetchMeaning(userInput)
        console.log(response)

        if(response.statusCode === 200){
            const output = `
            <tr>
                <td>${response.word}</td>
                <td>${response.meaning}</td>
                <td>${response.Synonyms}</td>
            </tr>
        
        `
        tableBody.innerHTML = output

        }else{
            // Display a "Word not found" message if the word is not found
            tableBody.innerHTML = `
                <tr>
                    <td colspan="3">Word not found</td>
                </tr>
            `
            
        }
        

        
    } catch (responseError) {
        console.error('Error while fetching meaning: ',responseError)
        
    }


})