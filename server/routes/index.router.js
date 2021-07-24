const express = require('express');
const Crud = require('../controllers/crud.controller');

const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.post('/create',)


// To get all  from the database
router.get('/getCrud', function (req, res) {
	Crud.getCruds(function (err, cruds) {
		if (err) {
			throw err;
		}
		res.json({msg : cruds});
	});
});

//To get a details using it's id
router.get('/crudInfo/:_id', function (req, res) {
		var id = req.params._id;
	Crud.getCrudById(id, function (err, crud) {
		if (err) {
			throw err;
		}
		res.json(crud);
	});
});

//To add a new  to the database
router.post('/CreateCrud', function (req, res) {
	var crud = req.body;
	Crud.addCrud(crud, function (err, crud) {
		if (err) {
			throw err;
		}
		res.json(crud);
	});
});

//To update a  details by its id
router.put('/updateCrud/:_id', function (req, res) {
	var id = req.params._id;
	var crud = req.body;
	Crud.updateCrud(id, crud, {}, function (err, crud) {
		if (err) {
			throw err;
		}
		res.json(crud);
	});
});

//To delete a  using its id
router.delete('/deleteCrud/:_id', function (req, res) {
	var id = req.params._id;
	Crud.deleteCrud(id, function (err, crud) {
		if (err) {
			throw err;
		}
		res.json(crud);
	});
});

module.exports = router;



