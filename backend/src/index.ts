import express, { Express } from "express";
import connectDB from "./modules/config/mongo";
import userRoute from "./modules/Users/interfaces/routes/userRoute";
import cors from "cors";
import adminRoute from "./modules/Admin/interfaces/routes/adminRoutes";
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.listen(5000, () => {
  console.log("connected ts");
});

connectDB();
app.use("/", userRoute);
app.use("/admin", adminRoute);
