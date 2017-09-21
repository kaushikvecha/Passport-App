var express=require('express');
var path=require('path');
var expressValidator=require('express-validator');
var flash=require('connect-flash');
var bodyParser=require('body-parser');
var localstrategy=require('passport-local').starategy;
var session=require('express-session');
var passport=require('passport');

var routes=require('./routes/index');
var users=require('./routes/users');

var app=express();
//view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
//set static folder
app.use(express.static(path.join(__dirname,'public')));
app.use('/css',express.static(__dirname+ '/node_modules/bootstrap/dist/css'));
//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(flash());
app.use(function(req,res,next){
	res.locals.messages=require('express-messages')(req,res);
	next();
});

app.use('/', routes);
app.use('/users', users);

app.listen(3100);
console.log('server started on port 3100');