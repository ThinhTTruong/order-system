let userNames = ["winnifred", "lorene", "cyril", "vella", "erich", "pedro", "madaline", "leoma", "merrill",  "jacquie"];
let users = [];

userNames.forEach(name =>{
	let u = {};
	u.username = name;
	u.password = name;
	u.privacy = false;
	users.push(u);
});

const mongoose = require("mongoose");
const User = require('./models/userModel');


// Connect to database
mongoose.connect('mongodb://localhost/a4', {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', function(){
    db.dropDatabase((err,res)=> {
		if (err){
			console.log("Could not drop database.");
			throw err;
		}
		console.log("Database cleared successfully. Re-creating data...");
		User.init((err)=>{
			if (err) throw err;
			User.insertMany(users, (err) => {
				if (err) throw err;
				console.log("Database is initialized successfully!");
				db.close();
				process.exit(0);
			})
		})
	})
});
