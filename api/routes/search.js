var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();

const names = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'static', 'names.json'), 'utf-8'));

router.get('/', function(req, res, next) {
    res.send(names);
});

module.exports = router;
