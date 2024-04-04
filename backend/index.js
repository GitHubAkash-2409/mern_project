const express = require("express");
const cors = require("cors");
const dbConfig = require("./db/config");
const Users = require("./db/users");
const Product = require("./db/product");
// const Jwt = require("jsonwebtoken");
// const jwtKey = "e-comm";
const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  const newUser = new Users(req.body);
  const result = await newUser.save();
  let sanitizedResult = result.toObject();
  delete sanitizedResult.password;
  // Jwt.sign({ sanitizedResult }, jwtKey, { expiresIn: "1h" }, (err, token) => {
  //   if (err) {
  //     res.send({ result: "something wnt wrong, Please try again later" });
  //   }
  //   res.send({ sanitizedResult, auth: token });
  // });
  res, send(sanitizedResult);
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await Users.findOne(req.body).select("-password");
    if (user) {
      // Jwt.sign({ user }, jwtKey, { expiresIn: "1h" }, (err, token) => {
      //   if (err) {
      //     res.send({ result: "something wnt wrong, Please try again later" });
      //   }
      //   res.send({ user, auth: token });
      // });
      res.send(user);
    } else {
      res.send({ result: "No User Found" });
    }
  } else {
    res.send({ result: "No User Found" });
  }
});

app.post("/add-product", async (req, res) => {
  let newProduct = new Product(req.body);
  let result = await newProduct.save();
  res.send(result);
});

app.get("/products", async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send("No Products Found");
  }
});

app.delete("/product/:id", async (req, res) => {
  const result = await Product.deleteMany({ _id: req.params.id });
  res.send(result);
});

app.get("/product/:id", async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No Record Found." });
  }
});

app.put("/product/:id", async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(result);
});

app.get("/search/:key", async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { price: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

app.listen(5000);
