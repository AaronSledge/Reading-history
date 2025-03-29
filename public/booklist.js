import {findBook} from "./script.js";

window.onload = async function showNumResults() {
    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get("name");

    try {
        const response = await fetch(`/api/search?q=${query}&maxResults=20`);
        const data = await response.json();
        const numResults = data.totalItems;
        const resultInfo = document.getElementsByClassName("resultInfo")[0];
        const text = document.createElement("p");
        if(numResults > 2000) {
            text.textContent = "Page 1 of about 2000 results";
        }
        else {
            text.textContent = `Page 1 of about ${numResults} results`
        }

        resultInfo.appendChild(text);

    } catch(error) {
        console.error("Error fetching book data", error);
    }
    
}

/*window.onload = async function loadResults() {

}*/