require("dotenv").config();
const app = require("./src/app");
const port =8080
const connectToDB = require("./src/config/database");
connectToDB();
app.listen(port, () => {
  console.log("connect to 8080"); 
});
