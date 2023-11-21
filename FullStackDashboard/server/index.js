import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

// DATA IMPORTS
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/index.js";

// CONFIGURATION
dotenv.config();
const app = express();

// Middleware
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Set mongoose strictQuery to false
mongoose.set('strictQuery', false);

// ROUTES
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

// MONGOOSE SETUP
const PORT = process.env.PORT || 9000;
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log(`Connected to MongoDB`);

    // Check if data exists in each collection
    const userCount = await User.countDocuments();
    const productCount = await Product.countDocuments();
    const productStatCount = await ProductStat.countDocuments();
    const transactionCount = await Transaction.countDocuments();
    const overallStatCount = await OverallStat.countDocuments();
    const affiliateStatCount = await AffiliateStat.countDocuments();

    if (userCount === 0) {
      await User.insertMany(dataUser);
      console.log(`Inserted ${dataUser.length} User records`);
    }

    if (productCount === 0) {
      await Product.insertMany(dataProduct);
      console.log(`Inserted ${dataProduct.length} Product records`);
    }

    if (productStatCount === 0) {
      await ProductStat.insertMany(dataProductStat);
      console.log(`Inserted ${dataProductStat.length} ProductStat records`);
    }

    if (transactionCount === 0) {
      await Transaction.insertMany(dataTransaction);
      console.log(`Inserted ${dataTransaction.length} Transaction records`);
    }

    if (overallStatCount === 0) {
      await OverallStat.insertMany(dataOverallStat);
      console.log(`Inserted ${dataOverallStat.length} OverallStat records`);
    }

    if (affiliateStatCount === 0) {
      await AffiliateStat.insertMany(dataAffiliateStat);
      console.log(`Inserted ${dataAffiliateStat.length} AffiliateStat records`);
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB: ${error}`);
  });
