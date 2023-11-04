const getAllPrdouctsStatic = async (req, res) => {
  res.status(200).json({ msg: "testing all products" });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "all products" });
};

module.exports = {
  getAllPrdouctsStatic,
  getAllProducts,
};
