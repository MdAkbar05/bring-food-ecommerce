const sample_foods = [
  {
    id: 1,
    name: "Pizza Pepperoni",
    cookTime: "10-20",
    price: 10,
    favorite: false,
    origins: ["italy"],
    stars: 4.5,
    imgUrl: "food-1.jpg",
    tags: ["FastFood", "Pizza", "Lunch"],
  },
  {
    id: 2,
    name: "Meatball",
    cookTime: "20-30",
    price: 20,
    favorite: true,
    origins: ["persia", "china"],
    stars: 5,
    imgUrl: "food-2.jpg",
    tags: ["SlowFood", "Lunch", "Fry"],
  },
  {
    id: 3,
    name: "Humburger",
    cookTime: "10-15",
    price: 5,
    favorite: false,
    origins: ["germany", "us"],
    stars: 3.5,
    imgUrl: "food-3.jpg",
    tags: ["FastFood", "Hamburger"],
  },
  {
    id: 4,
    name: "Fried Potatoes",
    cookTime: "10-15",
    price: 2,
    favorite: true,
    origins: ["belgium", "france"],
    stars: 4.0,
    imgUrl: "food-4.jpg",
    tags: ["FastFood", "Pizza", "Lunch"],
  },
  {
    id: 5,
    name: "Chiken Soup",
    cookTime: "30-40",
    price: 11,
    favorite: false,
    origins: ["india", "asia"],
    stars: 3.5,
    imgUrl: "food-5.jpg",
    tags: ["SlowFood", "Soup"],
  },
  {
    id: 6,
    name: "Vegetables Pizza",
    cookTime: "30-40",
    price: 9,
    favorite: false,
    origins: ["italy"],
    stars: 4.0,
    imgUrl: "food-6.jpg",
    tags: ["FastFood", "Pizza", "Lunch"],
  },
];

const sample_tags = [
  {
    name: "All",
    count: 6,
  },
  {
    name: "FastFood",
    count: 4,
  },
  {
    name: "Pizza",
    count: 3,
  },
  {
    name: "Lunch",
    count: 3,
  },
  {
    name: "SlowFood",
    count: 2,
  },
  {
    name: "Hamburger",
    count: 1,
  },
  {
    name: "Fry",
    count: 1,
  },
  {
    name: "Soup",
    count: 1,
  },
];

module.exports = { sample_foods, sample_tags };
