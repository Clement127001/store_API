const Product = require("../models/product");

const getAllPrdouctsStatic = async (req, res) => {
  res.status(200).json({ msg: "testing all products" });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {};

  if (featured) queryObject.featured = featured;

  if (company) queryObject.company = company;

  if (name) queryObject.name = { $regex: name, $options: "i" };

  // console.log(queryObject);
  let result = Product.find(queryObject);

  //sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  //select
  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }

  //pagination
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const products = await result;

  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllPrdouctsStatic,
  getAllProducts,
};
