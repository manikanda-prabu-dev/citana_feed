const express = require('express');

const Router = express();

Router.get('/', (req, res) => {
     res.send("user");
});

module.exports = Router