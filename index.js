const express     = require("express");
const app         = express();
const dotenv      = require("dotenv");
const bodyParser  = require("body-parser");
const morgan      = require('morgan')
const fs          = require('fs')
const path        = require('path')
const swaggerUi   = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

var helloWorld    = require("./routes/helloWorld.js");
var sites         = require("./routes/sites.js");
dotenv.config();

// Constants
PORT = process.env.PORT;
// End of Constants
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
// log all requests to access.log
app.use(morgan('combined'))
app.use(morgan('combined', {
  stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}))
// Routers 
app.use(bodyParser.json());
app.use("/api/sites", sites);

// Error middleware
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('500: Server Error');
});

// Listener
app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
