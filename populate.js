require("dotenv").config();

const Product = require("./models/product");
const connectDB = require("./db/connect");
const productsJson = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(productsJson);
    console.log("The products are create successfully");
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
