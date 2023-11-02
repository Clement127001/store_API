require("dotenv").config();

const express = require("express");
const app = express();

const notFound = require("./middleware/not-found");
const errorHandlingMiddleware = require("./middleware/error-handler");

//pre-route middlewares
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      `<h1>Visit the store api with the following link</h1><a href="/api/v1/products">Store</a>`
    );
});

//products route
app.use("/api/v1/products");

//post-route middlewares
app.use(notFound);
app.use(errorHandlingMiddleware);

//connecting and server starting

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    //connectDB
    app.listen(port, console.log(`server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
