var mongoose = require('mongoose');


var crudSchema = mongoose.Schema({
	name: {
		type: String
	},
	price: {
		type: String
	},
	description: {
		type: String
	},
	created_date: {
		type: Date,
		default: Date.now
	},
	add_by_user: {
		type: String
	},
	
});

//this object can be accessed outside
var Crud = module.exports = mongoose.model('Crud', crudSchema);

//Function to get bookSchema
module.exports.getCruds = function (callback, limit) {
	Crud.find(callback).limit(limit);
}

//Function to get book by ID
module.exports.getCrudById = function (id, callback) {
	Crud.findById(id, callback);
}

//Function to add a book
module.exports.addCrud = function (crud, callback) {
	Crud.create(crud, callback);
}

//Function to update Book
module.exports.updateCrud = function (id, crud, options, callback) {
	var query = {
		_id: id
	};
	var update = {
		name: crud.name,
		price: crud.price,
		description: crud.description,
		add_by_user: crud.add_by_user,
		update_date: {
		type: Date,
		default: Date.now
	},
	}
	Crud.findOneAndUpdate(query, update, options, callback);
}

//Function to delete a Book
module.exports.deleteCrud = function (id, callback) {
	var query = {
		_id: id
	};
	Crud.remove(query, callback);
}