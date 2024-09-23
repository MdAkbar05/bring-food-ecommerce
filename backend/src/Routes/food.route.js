const express = require("express");
const { sample_foods, sample_tags } = require("../data");

// http://localhost:5000/api/foods/
const foodRouter = express.Router();

// Find all foods
foodRouter.get("/", (req, res) => {
  res.send(sample_foods);
});

// Find Food with search term
foodRouter.get("/search/:searchTerm", (req, res) => {
  const { searchTerm } = req.params;
  const foods = sample_foods.filter((item) =>
    item.name.toLocaleLowerCase().includes(searchTerm.toLowerCase())
  );
  res.send(foods);
});

//Find foods by tag name
foodRouter.get("/tag/:tag", (req, res) => {
  const { tag } = req.params;

  const foods = sample_foods.filter((item) => item.tags?.includes(tag));

  res.send(foods);
});

//Find all tags
foodRouter.get("/tags", (req, res) => {
  res.send(sample_tags);
});

//Find single food by ID
foodRouter.get("/:foodId", (req, res) => {
  let { foodId } = req.params;
  const food = sample_foods.find((item) => item.id === +foodId);
  res.send(food);
});

module.exports = foodRouter;
