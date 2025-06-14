import {findBook} from "./script.js";

window.onload = async function showNumResults() {
    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get("name"); //get the name inputted from URL
    let currentPage = searchParams.get("page"); //get current page number

    const currentPageNum = parseInt(currentPage); 
    try {
        let startIndex = 0;
        if(currentPageNum == 1) {
            startIndex = 0;
        }

        else {
            startIndex = (0 + currentPageNum) * 10; //used for query
        }
        
        console.log(startIndex);
        const response = await fetch(`/api/search?q=${query}&maxResults=20&startIndex=${startIndex}`);
        const data = await response.json();
        const numResults = data.totalItems;
        const resultInfo = document.getElementsByClassName("resultInfo")[0];
        const text = document.createElement("p");
        console.log(data);

        let numPages = 0;
        if(numResults > 2000) { //limit results to only 2000
            text.textContent = `Page ${currentPageNum} of about 2000 results`;
            numPages = 2000 / 20;
        }
        else {
            text.textContent = `Page ${currentPageNum} of about ${numResults} results`
            numPages = numResults / 20;
        }

        resultInfo.appendChild(text);
        loadResults(data, query);
        pageTabs(currentPageNum, numResults, query, numPages);


    } catch(error) {
        console.error("Error fetching book data", error);
    }
    
}

async function loadResults(data, query) {
    const searchBar = document.getElementById("search");
    searchBar.value = query; //want what the user types to be present in the search bar
    const books = data.items;
    const table = document.getElementById("table"); //get the table element

    books.forEach((book) => {
        const name = document.createElement("span");
        name.classList.add("resultsTitle");
        name.textContent = book.volumeInfo.title; //get the title from book at specfic index

        const image = document.createElement("img");

        if(Object.hasOwn(book.volumeInfo, "imageLinks")) { //some books don't provide a book cover, so this is error checking
            image.src = book.volumeInfo.imageLinks.thumbnail; 
        }
        else {
            image.src = "image/placeholder.png";
        }
        
        image.alt = name.textContent;  //if image doesn't load   

        const imageLink = document.createElement("a");
        const titleLink = document.createElement("a"); //want to link to results page from both image and title
        imageLink.href = `/results.html?name=${encodeURIComponent(book.volumeInfo.title)}&ID=${encodeURIComponent(book.id)}&image=${encodeURIComponent(image.src)}`;
        titleLink.href = `/results.html?name=${encodeURIComponent(book.volumeInfo.title)}&ID=${encodeURIComponent(book.id)}&image=${encodeURIComponent(image.src)}`;
        imageLink.target = "_self";
        titleLink.target = "_self";


        const author = document.createElement("span");

        if(Array.isArray(book.volumeInfo.authors)) {
            author.textContent = `By ${book.volumeInfo.authors[0]}`;
        }
        else {
            author.textContent = `By ${book.volumeInfo.authors}`;
        }


        const row = document.createElement("tr");
        const imageInfo = document.createElement("td");
        const titleInfo = document.createElement("td");

        imageLink.appendChild(image);
        imageInfo.appendChild(imageLink);

        titleLink.appendChild(name);
        titleInfo.appendChild(titleLink);
        titleInfo.appendChild(document.createElement("br"));
        titleInfo.appendChild(author);

        row.appendChild(imageInfo);
        row.appendChild(titleInfo);

        const horizontalRule = document.createElement("hr"); //add line between each row
        horizontalRule.classList.add("seperator");
        table.appendChild(row);
        table.appendChild(horizontalRule);
    });
    
}

async function pageTabs(currentPageNum, numResults, query, numPages) {
    if(numResults > 20) { //if they are not more than 20 results no need for next tag;
        const pages = document.getElementsByClassName("pages")[0];
        const first = document.createElement("a");
        const last = document.createElement("a");

        const firstPage = document.createElement("a");
        const secondPage = document.createElement("a");
        const thirdPage = document.createElement("a");

        first.textContent = "first";
        first.href = `search.html?name=${query}&page=1`;
        last.textContent = "last";
        last.href = `search.html?name=${query}&page=${numPages}`;

        first.classList.add("tabs");
        firstPage.classList.add("tabs");
        secondPage.classList.add("tabs");
        thirdPage.classList.add("tabs");
        last.classList.add("tabs");

        if(currentPageNum == 1) {
            firstPage.href = `search.html?name=${query}&page=${currentPageNum.toString()}`;
            firstPage.style.color = "blue";
            firstPage.textContent = currentPageNum;
            secondPage.href = `search.html?name=${query}&page=${(currentPageNum + 1).toString()}`;
            secondPage.textContent = currentPageNum + 1;
            thirdPage.href = `search.html?name=${query}&page=${(currentPageNum + 2).toString()}`;
            thirdPage.textContent = currentPageNum + 2;

        }
        else if(currentPageNum == numPages) {
            firstPage.href = `search.html?name=${query}&page=${(currentPageNum - 2).toString()}`;
            firstPage.textContent = currentPageNum - 2;
            secondPage.href = `search.html?name=${query}&page=${(currentPageNum - 1).toString()}`;
            secondPage.textContent = currentPageNum - 1;
            thirdPage.href = `search.html?name=${query}&page=${currentPageNum.toString()}`;
            thirdPage.style.color = "blue";
            thirdPage.textContent = currentPageNum;

        }
        else {
            firstPage.href = `search.html?name=${query}&page=${(currentPageNum - 1).toString()}`;
            firstPage.textContent = currentPageNum - 1;
            secondPage.href = `search.html?name=${query}&page=${currentPageNum.toString()}`;
            secondPage.style.color = "blue";
            secondPage.textContent = currentPageNum;
            thirdPage.href = `search.html?name=${query}&page=${(currentPageNum + 1).toString()}`;
            thirdPage.textContent = currentPageNum + 1;

        }
        pages.appendChild(first);
        pages.appendChild(firstPage);
        pages.appendChild(secondPage);
        pages.appendChild(thirdPage);
        pages.appendChild(last);

    }
}