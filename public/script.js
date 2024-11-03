async function findBook() {
    const query = document.getElementById("search").value;
    if (!query) {
        return;
    }

    try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();

        console.log(data.docs.map(book => book.title));
    }
    catch (error) {
        console.error("Error fetching book data:", error);
    }
}

window.onload = async function loadTopBooks() {
    const items = document.querySelectorAll(".col");
    try {
        const response = await fetch("/api/search?q=stephen+king");
        const data = await response.json();
        
        const books = data.docs;

        Array.from(items).forEach((element, index) => {
            if(index < books.length) {
                const book = books[index];

                const link = document.createElement('a');
                link.href = `/results.html?bookKey=${encodeURIComponent(book.key)}`;
                link.target = "_self";

                const image = document.createElement("img");
                image.src = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
                image.alt = book.title;

                link.appendChild(image);
                element.appendChild(link);
            }
            
        });

    } catch (error) {
        console.error("Error fetching book data:", error);
    }
}