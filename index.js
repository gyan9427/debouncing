
const search = document.querySelector(".search");
const btn = document.querySelector(".btn");
const input = document.querySelector(".input");
const queryResult = document.querySelector("#queryResult");
const searchRst = document.querySelector('.searchResult');
const file = "/data/CountryCodes.json";

let CountryCodes;


fetch(file)
  .then(response => response.json())
  .then(json => {
      CountryCodes = json;
     
  });

btn.addEventListener("click",()=>{
    search.classList.toggle("active");
    input.focus();
})

function searchResult(){
    const queryData = input.value;
    const data = searchForData(queryData);
    searchRst.classList.add("active");
    if(data.length === 0)searchRst.classList.remove("active");
    console.log(data);
    queryResult.innerHTML = null;
    for(let i=0;i<data.length;i++){
        const listElement = document.createElement('li');
        listElement.innerText = data[i].name;
        queryResult.appendChild(listElement);
    }
}

function searchForData(string){
    const countryData = []
    if(!string)return [];
    CountryCodes.forEach(element => {
        if(element.name.toLowerCase().search(string) !== -1)countryData.push(element)
    });
    return countryData;
}

const debounce = function (fn,delay){
    let timer;
    return function(){
        let context = this,
            args = arguments;
        clearInterval(timer);
        timer = setTimeout(()=>{
            searchResult.apply(context,args)
        },delay)

    }
}

const betterSearch = debounce(searchResult,300);