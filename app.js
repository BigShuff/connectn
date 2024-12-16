const express = require('express');
const path= require('path');
const bcrypt = require('bcrypt');
const hostname = "127.0.0.1";
const port = 3002;
const collection = require('./js/configdb.js');
const regInfo = require('./js/configdb.js');



// express app
const app = express();
//convert data into json format
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// register view engine
app.set('view engine', 'ejs');

//this tells the app to use public for all static files I.e images and css etc
app.use(express.static('public'));


// listen for requests
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });

  app.get('/', (req, res) => {
    // const blogs = [
    //   {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //   {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //   {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    // ];
  
  //note the dynamic title variable for each page
    //res.render('index', { title: 'Home', blogs });
    res.render('index', { title: 'Home' });
  });

  app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
  });

  app.get('/saleWantedAds', (req, res) => {
    res.render('saleWantedAds', {title: 'Sale & Wanted'})
  })

  app.get('/login', (req, res) => {
    res.render('login', {title: 'Login'})
  })

  app.get('/signup', (req, res) => {
    res.render('signup', {title: 'Sign Up'})
  })

  app.post('/signup', async (req, res) => {
    const data = {
      name: req.body.username,
      password: req.body.password,
    }
    //check if user already exists
    const existingUser = await regInfo.findOne({name: data.name});
    if (existingUser){
      res.send('Username already exists please choose another name')
    } else {
      //hash the password using bcrypt
      const saltRounds = 10; //number of salt rounds for bcrypt
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);
      data.password = hashedPassword; //replace the password with the original password

      const userdata = await regInfo.insertMany(data);
      console.log(userdata);
    }
  })

  //login user
  app.post('/login', async(req, res) => {
    try{
      const check = await regInfo.findOne({name: req.body.username});
      if (!check){
        res.send('User name cannot be found!')
      }
      //compare the hashed password in the database with the plain text
      const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
      if (isPasswordMatch){
        res.render('home');
      } else {
        req.send('Wrong password');
      }
    } catch {
      res.send('Wrong details');
    }
  });

  app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });
  