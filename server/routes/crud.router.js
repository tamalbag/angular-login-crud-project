
const router = require('express').Router();
const Crud = require('../controllers/crud.controller');


// To get all the books from the database
router.get('/crud', function (req, res) {
	Crud.getCruds(function (err, cruds) {
		if (err) {
			throw err;
		}
		res.json(cruds);
	});
});

//To get a book details using it's id
router.get('/crud/:_id', function (req, res) {
	Crud.getCrudById(req.params._id, function (err, crud) {
		if (err) {
			throw err;
		}
		res.json(crud);
	});
});

//To add a new book to the database
router.post('/crud', function (req, res) {
	var crud = req.body;
	Crud.addCrud(crud, function (err, crud) {
		if (err) {
			throw err;
		}
		res.json(crud);
	});
});

//To update a book details by its id
router.put('/crud/:_id', function (req, res) {
	var id = req.params._id;
	var book = req.body;
	Crud.updateCrud(id, crud, {}, function (err, crud) {
		if (err) {
			throw err;
		}
		res.json(crud);
	});
});

//To delete a book using its id
router.delete('/crud/:_id', function (req, res) {
	var id = req.params._id;
	Crud.deleteCrud(id, function (err, crud) {
		if (err) {
			throw err;
		}
		res.json(crud);
	});
});

module.exports = router;