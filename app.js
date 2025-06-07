let selects = document.querySelectorAll(".dropdown select")
let image = document.querySelectorAll("img");
let btn = document.querySelector("button");
let input = document.querySelector("input");
let display = document.querySelector('p');
let change = document.querySelector("#arrow");


selects.forEach(select => {
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.textContent = currCode;
        newOption.value = currCode;

         if(select.name === "From" && currCode === "USD"){
            newOption.selected="selected";
            select.appendChild(newOption);
         }
         else if(select === selects[1] && currCode === "INR"){
            newOption.selected=true;
            select.appendChild(newOption);
         }
         else{
            select.appendChild(newOption);
        }
    }

    select.addEventListener("change", (evt)=>{
        updateFlag(countryList[evt.target.value], evt.target.name);
    })
})


const updateFlag = (country, elementName) => {
        if(elementName === "From"){
            image[0].src = `https://flagsapi.com/${country}/flat/64.png`;
        }
        
        if(elementName === "To"){
            image[1].src = `https://flagsapi.com/${country}/flat/64.png`;
        }
}


let URL = "https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/USD/INR/AMOUNT";

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    if(input.value.trim() === "" || input.value < 1){
        input.value=1;
    }
    let amount = input.value;

    URL = `https://v6.exchangerate-api.com/v6/00b056b45c0b9e23070cd5c8/pair/${selects[0].value}/${selects[1].value}/${amount}`;

    try{
        let response = await fetch(URL);
        let data = await response.json();
        data = data["conversion_result"];
        display.textContent = `${input.value} ${selects[0].value} = ${data} ${selects[1].value}`;
    }

    catch{
        display.textContent = "Error fetching exchange rate!";
    }
    

})

change.addEventListener("click", (evt) => {
    let temp=selects[0].value;
    selects[0].value=selects[1].value;
    selects[1].value=temp;

    image[0].src = `https://flagsapi.com/${countryList[selects[0].value]}/flat/64.png`;
    image[1].src = `https://flagsapi.com/${countryList[selects[1].value]}/flat/64.png`;
})