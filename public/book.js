window.onload = async function displayBookInfo() {
    const searchParams = new URLSearchParams(window.location.search);
    const ID = searchParams.get("ID");
    const imagesrc = searchParams.get("image");

    if(!ID) {
        return;
    }

    try {
        const description = document.getElementsByClassName("description")[0];
        const cover = document.getElementsByClassName("BookCover")[0];
        const title = document.getElementsByClassName("title")[0];
        const author = document.getElementsByClassName("author")[0];
        const pageCount = document.getElementsByClassName("page-count")[0];
        const date = document.getElementsByClassName("date")[0];

        const response = await fetch(`/api/display?q=${encodeURIComponent(ID)}`);

        const data = await response.json();

        console.log(data);

        const newImage = document.createElement("img");
        newImage.src = decodeURIComponent(imagesrc);

        cover.appendChild(newImage);

        title.textContent = data.volumeInfo.title;
        
        author.textContent = data.volumeInfo.authors[0];

        description.innerHTML = data.volumeInfo.description;

        pageCount.textContent = `Page count: ${data.volumeInfo.pageCount}`;

        date.textContent = `Publication date: ${data.volumeInfo.publishedDate}`;

    } catch (error){
        console.error("Error fetching book data:", error);
    }
}