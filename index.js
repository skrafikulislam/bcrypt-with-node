import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";

const app = express();

app.use(express.json());
app.use(cors());

let passwords = [];

app.get("/", (req, res) => {
  res.status(200).json("Get Request Working Fine..");
});

app.post("/login", async (req, res) => {
  const { password } = req.body;
  // Hash The Password Before Sending...
  const saltRound = 10;
  const hash_password = await bcrypt.hash(password, saltRound);
  res.status(200).json("Your Hashed Password is " + hash_password);
  passwords.push(hash_password);
});

app.post("/compare", async (req, res) => {
  const { password } = req.body;
  if (passwords[0] === password) {
    res.status(200).json("Password Matched");
  } else {
    res.status(300).json("Password Is not matching");
  }
});

app.listen(5000, () => console.log("Server is running on port 5000"));
