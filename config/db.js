const sql = require("mssql");
const config = require("config");

const dbConfig = {
  user: config.get("sqlServer.user"),
  password: config.get("sqlServer.password"),
  server: config.get("sqlServer.server"),
  database: config.get("sqlServer.database"),
  options: {
    encrypt: false, // For security reasons, set to true if using Azure
  },
};
const connectDB = async () => {
  try {
    await sql.connect(dbConfig);
    // console.log("SQL Server Connected ...");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
