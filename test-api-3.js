const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env.local" });

async function main() {
  const user = await prisma.user.findFirst();
  if (!user) {
    console.log("No user found");
    return;
  }
  const payload = {
    userId: user.id,
    email: user.email,
    role: "USER", // Or whatever the role is
    type: "access"
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET || "default_secret");
  console.log("Using token:", token);
  
  const r = await fetch("http://localhost:3000/api/ccpayment/coins", {
    headers: { "WizcoinAccessToken": token }
  });
  const data = await r.json();
  console.log(r.status, data);
}
main();
