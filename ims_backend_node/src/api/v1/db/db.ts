import { Sequelize } from "sequelize";
import * as fs from "fs";

export const sequelize = new Sequelize("imsdb", "tibi", "password@123", {
    host: "restaurantdemo-server.mysql.database.azure.com",
    dialect: "mysql",
    ssl: true,
    logging: false,
    dialectOptions: {
      ssl: {
        ca: fs
          .readFileSync(
            "./certificate.pem"
          )
          .toString(),
      },
    },
  });

export const dbConnection = async () => {
    sequelize.authenticate()
    .then(() => {
      console.log("connected to database");
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
    });
};
