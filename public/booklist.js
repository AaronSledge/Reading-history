import {findBook} from "./script.js";

window.onload = async function showNumResults() {
    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get("name"); //get the name inputted from URL

    try {
        const response = await fetch(`/api/search?q=${query}&maxResults=20`);
        const data = await response.json();
        const numResults = data.totalItems;
        const resultInfo = document.getElementsByClassName("resultInfo")[0];
        const text = document.createElement("p");

        console.log(numResults);
        console.log(data);
        if(numResults > 2000) { //limit results to only 2000
            text.textContent = "Page 1 of about 2000 results";
        }
        else {
            text.textContent = `Page 1 of about ${numResults} results`
        }

        resultInfo.appendChild(text);
        loadResults(data, query);

    } catch(error) {
        console.error("Error fetching book data", error);
    }
    
}

async function loadResults(data, query) {
    const searchBar = document.getElementById("search");
    searchBar.value = query;
    const books = data.items;
    const table = document.getElementById("table"); //get the table element

    books.forEach((book) => {
        const name = document.createElement("p");
        name.textContent = book.volumeInfo.title; //get the title from book at specfic index

        const image = document.createElement("img");

        if(Object.hasOwn(book.volumeInfo, "imageLinks")) {
            image.src = book.volumeInfo.imageLinks.thumbnail; //get the book cover
        }
        else {
            image.src = "image/placeholder.png";
        }
        
        image.alt = name.textContent;  //if image doesn't load   

        const imageLink = document.createElement("a");
        const titleLink = document.createElement("a");
        imageLink.href = `/results.html?name=${encodeURIComponent(book.volumeInfo.title)}&ID=${encodeURIComponent(book.id)}&image=${encodeURIComponent(image.src)}`;
        titleLink.href = `/results.html?name=${encodeURIComponent(book.volumeInfo.title)}&ID=${encodeURIComponent(book.id)}&image=${encodeURIComponent(image.src)}`;
        imageLink.target = "_self";
        titleLink.target = "_self";

        const row = document.createElement("tr");
        const imageInfo = document.createElement("td");
        const titleInfo = document.createElement("td");

        imageLink.appendChild(image);
        imageInfo.appendChild(imageLink);

        titleLink.appendChild(name);
        titleInfo.appendChild(titleLink);

        row.appendChild(imageInfo);
        row.appendChild(titleInfo);
        table.appendChild(row);
    });
    
}