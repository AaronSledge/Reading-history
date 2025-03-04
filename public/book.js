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

        const response = await fetch(`/api/display?q=${encodeURIComponent(ID)}`);

        const data = await response.json();

        console.log(data);

        const newImage = document.createElement("img");
        newImage.src = decodeURIComponent(imagesrc);

        cover.appendChild(newImage);
        description.innerHTML = data.volumeInfo.description;

    } catch (error){
        console.error("Error fetching book data:", error);
    }
}