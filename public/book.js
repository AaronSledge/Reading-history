window.onload = async function displayBookInfo() {
    const searchParams = new URLSearchParams(window.location.search);
    const bookKey = searchParams.get("bookKey");
    const imagesrc = searchParams.get("image");

    if(!bookKey) {
        return;
    }

    try {
        const description = document.getElementsByClassName("description")[0];
        const cover = document.getElementsByClassName("BookCover")[0];

        let updatedBookKey = bookKey.split("name");

        const response = await fetch(`/api/display?q=${encodeURIComponent(updatedBookKey[0])}`);

        const data = await response.json();

        console.log(`https://openlibrary.org${updatedBookKey[0]}.json`)
        console.log(data.description);

        const newImage = document.createElement("img");
        newImage.src = decodeURIComponent(imagesrc);

        cover.appendChild(newImage);
        description.textContent = data.description;

    } catch (error){
        console.error("Error fetching book data:", error);
    }
}