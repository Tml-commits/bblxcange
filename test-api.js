const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env.local" });

const token = jwt.sign({ userId: "123" }, process.env.JWT_SECRET || "default_secret");
console.log("Token:", token);

fetch("http://localhost:3000/api/ccpayment/coins", {
  headers: {
    "WizcoinAccessToken": token
  }
}).then(r => r.json().then(data => console.log(r.status, data)));
