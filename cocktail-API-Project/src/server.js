/***********************
  Load Components!

  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
  Pg-Promise   - A database tool to help use connect to our PostgreSQL database
***********************/
var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var pgp = require('pg-promise')();
// const axios = require('axios');
// const qs = require('query-string');


const dev_dbConfig = {
	host: 'db',
	port: 5432,
	database: process.env.POSTGRES_DB,
	user:  process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD
};

const isProduction = process.env.NODE_ENV === 'production';
const dbConfig = isProduction ? process.env.DATABASE_URL : dev_dbConfig;

if (isProduction) {
  pgp.pg.defaults.ssl = {rejectUnauthorized: false};
}

const db = pgp(dbConfig);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/'));


// home page
app.get('/home', function(req, res) {
	res.render('pages/home',{
		my_title:"Home Page"
	});
});

// app.get('/review', function(req, res) {
// 	res.render('pages/review',{
// 		my_title:"Home Page"
// 	});
// });

app.get('/review', function(req, res) {
	var query = 'select * from reviews;';
	db.any(query)
        .then(function (rows) {
            res.render('pages/review',{
				my_title: "Review Page",
				data: rows,
        filter: ''
			})

        })
        .catch(function (err) {
            console.log('error', err);
            res.render('pages/review', {
                my_title: 'Review Page',
                data: ''
            })
        })
});

app.post('/review', function(req, res) {
	var review = req.body.reviewText;
  var drink = req.body.drinkInput;
	var insert_statement = "INSERT INTO reviews(cocktail_title,review,review_date) VALUES ('"+drink+"','"+review+"',CURRENT_TIMESTAMP);";
  var table = "select distinct * from reviews;";
  console.log(insert_statement);
	db.task('get-everything', task => {
        return task.batch([
            task.any(insert_statement),
            task.any(table)
        ]);
    })
    .then(info => {
      console.log(info[0])
    	res.render('pages/review',{
				my_title: "Review Page",
				data: info[1],
        filter: ''
			})
    })
    .catch(err => {
            console.log('error', err);
            res.render('pages/home', {
                my_title: 'Review Page',
                data: '',
                filter: ''
            })
    });
});


app.post('/review/filter', function(req, res) {
  var drinkFilter = req.body.drinkFilter;
  var table = "select distinct * from reviews;";
  var tableFiltered =  `select distinct * from reviews where cocktail_title = '${drinkFilter}';`;
	db.task('get-everything', task => {
        return task.batch([
          task.any(table),
          task.any(tableFiltered)
        ]);
    })
    .then(info => {
			if((drinkFilter.length > 0) && (info[1].length > 0)){
    	res.render('pages/review',{
        my_title: 'Review Page',
        data: '',
        filter: info[1]
			})}
			else{
				res.render('pages/review',{
          my_title: 'Review Page',
          data: info[0],
          filter: ''
				})
			}
    })
    .catch(err => {
            console.log('error', err);
            res.render('pages/review', {
              my_title: 'Review Page',
              data: '',
              filter: ''
            })
    });
});

//app.listen(3000);
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
