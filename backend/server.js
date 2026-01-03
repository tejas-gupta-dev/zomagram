require('dotenv').config()
const app = require('./src/App');
const connecDB = require('./src/db/db');

connecDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

