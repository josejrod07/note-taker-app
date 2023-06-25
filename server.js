// Required packages
const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', apiRoutes); // this is the api route
app.use('/', htmlRoutes); // this is the default route

// Start the server on the port
app.listen(PORT, () => console.log(`Listening at: http://localhost:${PORT}`));