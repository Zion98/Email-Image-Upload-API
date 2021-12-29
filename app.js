const express = require("express");
const path = require("path");
const morgan = require("morgan");
require("express-async-errors");

const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//database
const connectDB = require("./db/connect");
require("dotenv").config();

const productRouter = require("./routes/product");

// const errorHandler=require("./middlewares/errorHandler")
const app = express();

const { sendEmail } = require("./controllers/sendEmail");
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler.js");

//setup static middleware
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("tiny"));

app.use(fileUpload({ useTempFiles: true }));

//routes
app.use("/api/v1/products", productRouter);
app.get("/send", sendEmail);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.all("*", (req, res) => {
  res.status(404).send("<h1>Resource not found</h1>");
});

const PORT = process.env.PORT || 5100;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
