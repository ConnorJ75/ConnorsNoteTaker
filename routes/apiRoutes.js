const util = require('util');
const fs = require('fs');
const path = require('path');


const readFile = util.promisify(fs.readFile);
const db = require('../db/db.json');


let id = db.length + 1;

module.exports = function (app) {
	app.post('/api/notes', function (req, res) {
		console.log(req.body);

		req.body.id = id++;
		console.log(req.body);

		db.push(req.body);
		fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(db), function (err) {
			if (err) throw err;
			res.json(db);
		});
	});

	app.get('/api/notes', function (req, res) {
		console.log("notes");
		readFile(path.join(__dirname, '../db/db.json'), "utf8").then((data) => {
			
			const parsedData = JSON.parse(data);
			res.json(parsedData);
			console.log(parsedData);
		})
	});

	app.delete('/api/notes/:id', function (req, res) {
		var id = parseInt(req.params.id);

		for (var i = 0; i < db.length; i++) {
			if (db[i].id === id) {
				db.splice(i, 1);
			}
		}
		console.log(db);

		fs.writeFile('./db/db.json', JSON.stringify(db), function (err) {
			if (err) throw error;
			res.json(db);
		});
	});
};