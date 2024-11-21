const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get('/api/search', async (req, res) => {
    const query = req.query.q;
    if(!query) {
        return res.status(400).json({error: "Search query is required "});
    }

    try  {
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`)

        const data = await response.json();

        res.json(data);
    } 
    catch (error) {
        console.error("Error fetching data from OpenLibrary:", error.message);
        res.status(500).json({error: "An error occured while fetching data from OpenLibrary"});
    }
});

app.get('/api/display', async (req, res) => {
    const query = req.query.q;

    try {
        const response = await fetch(`https://openlibrary.org${query}.json`);

        const data = await response.json();

        res.json(data);
    } catch (error) {
        console.error("Error fetching book data from specfic page:", error.message);
        res.status(500).json({error: "An error occured while fetching data from OpenLibrary"});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})
