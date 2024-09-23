const express = require("express");
const cors = require("cors");
const foodRouter = require("./Routes/food.route");

const app = express();

app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));

app.use("/api/foods", foodRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
