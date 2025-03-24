const { default: mongoose } = require("mongoose");
const { DATA_BASE_STR } = require("../constant");

const connectDB = async () => {
  await mongoose.connect(DATA_BASE_STR);
};

module.exports = {
  connectDB,
};
