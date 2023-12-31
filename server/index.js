const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { 
    getCompliment,
    getStocks,
    createStock,
    updateStock,
    deleteStock,
} = require('./controller')

app.get("/api/compliment", getCompliment);

app.get("/api/stocks", getStocks);

app.post("/api/stocks", createStock);

app.put("/api/stocks/:id", updateStock);

app.delete("/api/stocks/:id", deleteStock);

app.listen(4000, () => console.log("Server running on 4000"));
