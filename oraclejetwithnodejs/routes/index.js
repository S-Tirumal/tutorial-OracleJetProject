/**var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
*/
var express = require('express'); 
var router = express.Router(); 
router.get('/', function (req, res, next) {     
	//res.sendFile('index.html', {root: './views/'});     
	res.sendFile('index.html', {root: './public/'}); 
}); 
module.exports = router;
