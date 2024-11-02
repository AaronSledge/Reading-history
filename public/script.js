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