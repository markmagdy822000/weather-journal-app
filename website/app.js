let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate() +'.'+ d.getFullYear();

const apiKey = "67b6b02c942192afbbc32446df5b886d"

const generateBtn = document.querySelector('#generate')

generateBtn.addEventListener("click", async () => {
    try{    
        // TO Get The Full Link
        const zipCode = document.querySelector('#zip').value
        const fullUrl = getFullUrl(apiKey, zipCode)
        let temp = await getTemp(fullUrl, zipCode, apiKey);
        
        // To Get the Content
        const content = document.querySelector('#feelings').value
        
        await fetchData(temp, content);
        
        //display temp
        await dispTemp();
        
}catch(err){
    console.log("Error: ", err);
}
})

function getFullUrl(apiKey, zipCode){
        if(!zipCode)
        {
            alert("This is can't be a Zipcode ");
            return
        }
        return fullUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`
}

async function dispTemp(){
    const resp = await fetch('/getWeatherData')
    const finalData = await resp.json()
    console.log(finalData);
    let t = document.createTextNode(finalData.temp);
    let c = document.createTextNode(finalData.content);
    let d = document.createTextNode(finalData.date);
    
    document.querySelector("#date").appendChild(d)
    document.querySelector("#temp").appendChild(t)
    document.querySelector("#content").appendChild(c)
}


async function getTemp(fullUrl, zipCode, apiKey) {

    const res = await fetch(fullUrl)
    const weatherData = await res.json()
    const temp = weatherData.main.temp
    console.log(temp)
    return temp
}

async function fetchData(temp, content){

    await(await fetch('/saveData', {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            date: newDate,
            temp,
            content
        })
    })).json();

}
