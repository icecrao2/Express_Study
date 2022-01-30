const ex0 = (req, res, next) => {
  console.log("첫번째");
  next();
};

const ex1 = (req, res, next) => {
  console.log("두번째");
  next();
};

const ex2 = (req, res, next) => {
  console.log("세번째");
  res.send("끝!")
};

module.exports = {
  ex0, ex1, ex2
}