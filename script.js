const XHRbutton = document.getElementById("xhr-button");
const fetchbutton = document.getElementById("fetch-button");
const asyncbutton = document.getElementById("async-button");
const APIKEY = "eOsCW8SOUFgMCDyKBYlAdiYKD4nIpbf8";
XHRbutton.addEventListener("click" , function(){
  const searchWord = document.getElementById("search-query").value;
  searchXHR(searchWord);
} );
fetchbutton.addEventListener("click" , function(){
  const searchWord = document.getElementById("search-query").value;
  searchFetch(searchWord);
} );
asyncbutton.addEventListener("click" , function(){
  const searchWord = document.getElementById("search-query").value;
searchasyncawait(searchWord);
} );

function searchXHR(search){
let XHRSearch = new XMLHttpRequest();
XHRSearch.open("Get", `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=` + encodeURIComponent(search) + "&limit=5", true);
XHRSearch.onload = function() {
  if (XHRSearch.status >= 200 && XHRSearch.status < 400){
    let response = JSON.parse(XHRSearch.responseText);
    displayGIFs(response);
  } else {
    console.error("Error during Request....");
  }
};

XHRSearch.onerror = function() {
  console.error("Network Error");
};
XHRSearch.send();
}

function searchFetch (search){
fetch(`https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=` + encodeURIComponent(search) + "&limit=5")
.then(response => {
  if (response.ok) {
    return response.json();
  }
  throw new Error("Error Happend...");
})
.then(data => {
  displayGIFs(data);
})
.catch(error => {
  console.error("There is a problem in fetch operation....")
})
}

async function searchasyncawait(search){
  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=` + encodeURIComponent(search) + "&limit=5");
    if (!response.ok){
      throw new Error("Error Happend ......");
    }
    const result = await response.json();
    displayGIFs(result);
  } catch (error) {
    console.error("Error Happend....")
  }
}


function displayGIFs(data) {
let resultContainer = document.getElementById("gifs-results");
resultContainer.innerHTML = '';

data.data.forEach(gif => {
  let imgElem = document.createElement("img");
  imgElem.src = gif.images.fixed_height.url;
  imgElem.alt = gif.title;
  imgElem.width = 200;
  resultContainer.appendChild(imgElem);

});

}








