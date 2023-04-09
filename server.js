import express from "express";
import mongoose from "mongoose";
import Cards from "./dbCards.js";
import cors from "cors";

// App config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = "mongodb+srv://admin:Kishore007@cluster0.1sm5p4b.mongodb.net/?retryWrites=true&w=majority"



// middlewares
app.use(express.json()); // allows us to send data in json format

app.use(cors({  origin: "*"}));
// app.use(cors({origin: "*"})); // allows us to send data from one domain to another (cross origin resource sharing)

//DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
).then(
    console.log("Connected to DB")
)

//API Endpoints
app.get("/", (req, res) => {
    res.status(200).send("Hello World");
})

app.post("/tinder/card", async (req, res) => {
    try {
        const dbCard = req.body;
        const newCard = await Cards.create(dbCard);
        res.status(201).send(dbCard);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get("/tinder/card", async (req, res) => {
    try {
        const dbCard = await Cards.find();
        res.status(200).send(dbCard);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


//Listener  
app.listen(port, () => console.log(`Listening on localhost:${port}`));  