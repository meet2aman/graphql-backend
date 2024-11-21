import express from "express";
import figlet from "figlet";
import "dotenv/config";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import ApolloGQLServer from "./graphql";

async function init() {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.get("/", (req, res) => {
    res.json({
      message: "/ hitted succesfully",
    });
  });
  // graphql server middleware
  app.use("/graphql", expressMiddleware(await ApolloGQLServer()));

  app.listen(process.env.PORT, () => {
    console.log(`Server Started on port ${process.env.PORT}`);
    figlet("Server Started", function (err, data) {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      console.log(data);
    });
  });
}
init();