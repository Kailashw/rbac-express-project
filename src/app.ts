// app.ts
import express from "express";
import bodyParser from "body-parser";
import { UserRoutes } from "./routes/userRoutes";
import { Roleroutes } from "./routes/roleRoutes";
import { MongoConnector } from "./utilities/mongoConnector";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

MongoConnector.connectToMongo();

// Add all the routes here.
app.use(UserRoutes);
app.use(Roleroutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
