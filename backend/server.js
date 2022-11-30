const app = require("./app");
// Destructuring PORT from .env file
const { PORT } = process.env;

// Setting up the server
app.listen(PORT || 4001, () => {
  console.log(`Server is running at PORT - ${PORT || 4001}`);
});
