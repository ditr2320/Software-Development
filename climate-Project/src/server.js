//docker-compose run web npm install

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var server = require('http').Server(app);
var port = 3000;

var latest_temperature = 0;
var latest_humidity = 0;
var latest_date = "";

//Create Database Connection
var pgp = require('pg-promise')();

// database

var dev_dbConfig = {
	host: 'db',
	port: 5432,
	database: process.env.POSTGRES_DB,
	user:  process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD
};


/** If we're running in production mode (on heroku), the we use DATABASE_URL
 * to connect to Heroku Postgres.
 */
 var isProduction = process.env.NODE_ENV === 'production';
 var dbConfig = isProduction ? process.env.DATABASE_URL : dev_dbConfig;

 // Heroku Postgres patch for v10
 // fixes: https://github.com/vitaly-t/pg-promise/issues/711
 if (isProduction) {
   pgp.pg.defaults.ssl = {rejectUnauthorized: false};
 }

var db = pgp(dbConfig);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory

// add get and post requests here
//home page


app.get('/', function(req, res) {
	res.render('pages/home',{
		my_title:"Home Page",
		items: ''
	});
});

app.get('/home', function(req, res) {
	res.render('pages/home',{
		my_title:"Home Page",
		items: ''
	});
});

app.get('/home_login', function(req, res) {
	res.render('pages/home_login',{
		my_title:"Login Page",
		items: '',
		error: false
	});
});

app.get('/home_user', function(req, res) {
	res.render('pages/home_user',{
		my_title:"Home Page",
		items: '',
		error: false
	});
});


app.get('/home_register', function(req, res) {
	res.render('pages/home_register',{
		my_title:"Register Page",
		items: '',
		error: false
	});
});

app.post('/home_register', function(req, res) {
	var firstinput = req.body.inputFirst;
	var lastinput = req.body.inputLast;
	var userinput = req.body.inputUname;
	var pwdinput = req.body.confirmPassword;
	var insert_statement = `INSERT INTO users(user_name,password,firstName,lastName) VALUES('${userinput}', '${pwdinput}', '${firstinput}', '${lastinput}');`;

	db.task('get-everything', task => {
        return task.batch([
          task.any(insert_statement)
        ]);
    })
    .then(info => {
    	res.render('pages/home_login',{
				my_title: "",
				items: '',
				error: false
			})
    })
    .catch(err => {
            console.log('error', err);
            res.render('pages/home_register', {
							my_title: "",
							items: '',
		    				error: true
            })
    });
});

// app.post('/home_login', function(req, res) {
// 	var userinput = req.body.loginuser;
// 	var pwdinput = req.body.loginpassword;
// 	var checkUsers = `SELECT * from users where user_name = '${userinput}' AND password = '${pwdinput}';`;
// 	db.task('get-everything', task => {
//         return task.batch([
//           task.any(checkUsers)
//         ]);
//     })
//     .then(info => {
//     	res.render('pages/home',{
// 				my_title: "",
// 				items: ''
// 			})
//     })
//     .catch(err => {
//             console.log('error', err);
//             res.render('pages/home_login', {
// 							my_title: "",
// 							items: ''
//             })
//     });
// });

app.post('/home_login', function(req, res) {
	var userinput = req.body.loginuser;
	var pwdinput = req.body.loginpassword;
	var checkUsers = `SELECT * from users where user_name = '${userinput}' AND password = '${pwdinput}';`;
	db.task('get-everything', task => {
        return task.batch([
          task.any(checkUsers)
        ]);
    })
    .then(info => {
			console.log(info[0])
			console.log(checkUsers)
			if(info[0].length > 0){
    	res.render('pages/home_user',{
				my_title: "",
				items: '',
				error: false
			})}
			else{
				res.render('pages/home_login',{
					my_title: "",
					items: '',
					error: true
				})
			}
    })
    .catch(err => {
            console.log('error', err);
            res.render('pages/home_login', {
							my_title: "",
							items: '',
							error: true
            })
    });
});

app.get('/monthly', function(req, res) {
	var climate = "select date(collectiondate) as date, avg(temperature) as temperature from climate_real group by date(collectiondate) order by 1 desc limit 30;";
	var humidity = "select date(collectiondate) as date, avg(humidity) as humidity from climate_real group by date(collectiondate) order by 1 desc limit 30;";
	var high = "select date(collectiondate) as date, max(temperature) as temperature from climate_real group by date(collectiondate) order by 1 desc limit 30;";
	var low = "select date(collectiondate) as date, min(temperature) as temperature from climate_real group by date(collectiondate) order by 1 desc limit 30;";
	var users = "SELECT * FROM users;";
	var avgMonthly = "SELECT * FROM avgMonthly;";
	db.task('get-everything', task => {
        return task.batch([
            task.any(climate),
			task.any(humidity),
			task.any(high),
			task.any(low),
            task.any(users),
			task.any(avgMonthly)
        ]);
    })
    .then(info => {
    	res.render('pages/monthly',{
				my_title: "Monthly Page",
				climate: info[0],
				humidity: info[1],
				high:info[2],
				low:info[3],
				users: info[4],
				avgMonthly: info[5]
			})
    })
    .catch(err => {
            console.log('error', err);
            res.render('pages/monthly', {
                my_title: 'Monthly Page',
								climate: '',
								humidity:'',
								high:'',
								low:'',
								users: '',
								avgMonthly: ''
            })
    });
});


app.get('/weekly', function(req, res) {
	var climate = "select date(collectiondate) as date, avg(temperature) as temperature from climate_real group by date(collectiondate) order by 1 desc limit 7;";
	var humidity = "select date(collectiondate) as date, avg(humidity) as humidity from climate_real group by date(collectiondate) order by 1 desc limit 7;";
	var high = "select date(collectiondate) as date, max(temperature) as temperature from climate_real group by date(collectiondate) order by 1 desc limit 7;";
	var low = "select date(collectiondate) as date, min(temperature) as temperature from climate_real group by date(collectiondate) order by 1 desc limit 7;";
	var users = "SELECT * FROM users;";
	var avgWeekly = "SELECT * FROM avgWeekly;";
	var avgMonthly = "SELECT * FROM avgMonthly;";
  db.task('get-everything', task => {
        return task.batch([
            task.any(climate),
            task.any(users),
						task.any(humidity),
						task.any(high),
						task.any(low),
						task.any(avgWeekly),
						task.any(avgMonthly)
        ]);
    })
    .then(info => {
		console.log(info[4])
    	res.render('pages/weekly',{
				my_title: "Weekly Page",
				climate: info[0],
				users: info[1],
				humidity: info[2],
				high: info[3],
				low: info[4],
				avgWeekly: info[5],
				avgMonthly: info[6]
			})
    })
    .catch(err => {
            console.log('error', err);
            res.render('pages/weekly', {
                my_title: 'Weekly Page',
								climate: '',
								users: '',
								humidity:'',
								avgWeekly: '',
								avgMonthly: ''
            })
    });
});

app.get('/current_reccomendations', function(req, res) {
	var latest_data = "SELECT * FROM climate_real WHERE collectiondate = (SELECT MAX(collectiondate) FROM climate_real);";

	db.task('get-everything', task => {
        return task.batch([
            task.any(latest_data),
        ]);
    })
    .then(info => {
		// console.log(info[0][0].id);
    	res.render('pages/current_reccomendations',{
				my_title: "Current Recommendations",
				temperature: Math.round(info[0][0].temperature * 100) / 100,
				humidity:  Math.round(info[0][0].humidity * 100) / 100,
				date: info[0][0].collectiondate
			})
    })
    .catch(err => {
            console.log('error', err);
            res.render('pages/current_reccomendations', {
                my_title: 'Current Recommendations',
				temperature: '',
				humidity: '',
				date:''
            })
    });
});

app.post('/data', function(req, res) {
    latest_temperature = req.body.Temperature;
    latest_humidity = req.body.Humidity;
	latest_date = req.body.Date;
    res.send("Data Received");
	console.log(req.body);

	var insertClimate = "INSERT INTO climate_real(temperature,humidity,collectiondate) VALUES(" + latest_temperature + ", " + latest_humidity + ", '" + latest_date + "');";

	db.task('send_data', task => {
        return task.batch([
            task.any(insertClimate),
        ]);
    })
	.catch(err => {
		console.log('error', err);
	});

});

//app.listen(3000);
var server = app.listen(process.env.PORT || 3000, () => {
	console.log(`Express running → PORT ${server.address().port}`);
});

// module.exports = server;
// app.listen(3000);//the port can be one of your choice
console.log("Server is running at 3000!");
