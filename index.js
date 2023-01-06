const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const router = require("./app/router");
const connexionMiddleware = require("./app/middleware/connexionMiddleware")
const session = require("express-session")

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'I see you', 
  resave: true,
  saveUninitialized: true

}));

app.use(connexionMiddleware);
app.use(router); 

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});