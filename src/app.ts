// app.ts
import express from "express";
import bodyParser from "body-parser";
import { UserRoutes } from "./routes/userRoutes";
import { Roleroutes } from "./routes/roleRoutes";
import { MongoConnector } from "./utilities/mongoConnector";
import { setupSwagger } from "./swaggerDef";
import { Loginroutes } from "./routes/loginRoutes";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

MongoConnector.connectToMongo();

// Add all the routes here.
app.use(UserRoutes);
app.use(Roleroutes);
app.use(Loginroutes);

// Set up Swagger documentation
setupSwagger(app);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
