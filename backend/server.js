require('dotenv').config()
const app = require('./src/App');
const connecDB = require('./src/db/db');

connecDB();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});


