const express = require('express');
const app = express();

const mongoose = require('./database/mongoose');

app.listen(3000, () => console.log("Server Connected on port 3000"));