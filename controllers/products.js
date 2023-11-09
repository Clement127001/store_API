const Product = require("../models/product");

const getAllPrdouctsStatic = async (req, res) => {
  res.status(200).json({ msg: "testing all products" });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  if (featured) queryObject.featured = featured;

  if (company) queryObject.company = company;

  if (name) queryObject.name = { $regex: name, $options: "i" };

  //numeric filters

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    const regex = /\b(>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regex,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [fields, operator, value] = item.split("-");

      if (options.includes(fields)) {
        queryObject[fields] = { [operator]: Number(value) };
      }
    });

    console.log(queryObject);
  }

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
