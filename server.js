const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect(process.env.MONGODB_URL)
.then(console.log("Database connnected"))
.catch(error => console.log(error));

app.use(express.json());

const bookRoutes = require("./routes/bookRoute.js");

app.use("/api/books", bookRoutes);

app.listen(process.env.PORT, ()=>{
    console.log("Server started...");
});