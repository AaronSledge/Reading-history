export async function findBook() {
    const query = document.getElementById("search").value;
    
    if (!query) {
        return;
    }

    try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        window.location.replace("search.html");
    }
    catch (error) {
        console.error("Error fetching book data:", error);
    }
}

window.onload = async function loadTopBooks() {
    const items = document.querySelectorAll(".col");
    try {
        const response = await fetch("/api/search?q=subject:fiction&maxResults=16");
        const data = await response.json();
        
        const books = data.items;

        console.log(books);

        Array.from(items).forEach((element, index) => {
            if(index < books.length) {
                const book = books[index];
                const image = document.createElement("img");
                image.src = book.volumeInfo.imageLinks.thumbnail;
                image.alt = book.volumeInfo.title;
                

                const link = document.createElement('a');
                link.href = `/results.html?name=${encodeURIComponent(book.volumeInfo.title)}&ID=${encodeURIComponent(book.id)}&image=${encodeURIComponent(image.src)}`;
                link.target = "_self";


                link.appendChild(image);
                element.appendChild(link);

            }
            
        });

    } catch (error) {
        console.error("Error fetching book data:", error);
    }
}
window.findBook = findBook;