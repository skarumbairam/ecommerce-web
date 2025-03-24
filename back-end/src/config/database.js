const { default: mongoose } = require("mongoose");
const { DATA_BASE_STR } = require("../constant");

const connectDB = async () => {
  await mongoose.connect(process.env.DATA_BASE_STR);
};

module.exports = {
  connectDB,
};
