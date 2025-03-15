const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get('/api/search', async (req, res) => {
    const query = req.query.q;
    const results = req.query.maxResults;
    if(!query) {
        return res.status(400).json({error: "Search query is required "});
    }

    try  {
        
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${results}`);

        const data = await response.json();


        res.json(data);
    } 
    catch (error) {
        console.error("Error fetching data from GoogleAPI:", error.message);
        res.status(500).json({error: "An error occured while fetching data from GooleAPI"});
    }
});

app.get('/api/display', async (req, res) => {
    const query = req.query.q;

    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${query}`);

        const data = await response.json();

        res.json(data);
    } catch (error) {
        console.error("Error fetching book data from specfic page:", error.message);
        res.status(500).json({error: "An error occured while fetching data from GoogleAPI"});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})
