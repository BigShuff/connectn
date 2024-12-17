const express = require('express');
const path= require('path');
const bcrypt = require('bcrypt');
const hostname = "127.0.0.1";
const port = 3002;
const regInfo = require('./js/configdb');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))

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
   const formattedDate = new Date();
   const registrationDate = formattedDate.toLocaleString('en-GB');
   const aReg = new regInfo({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      date: registrationDate
    })
    let existingUser = await regInfo.findOne({username: aReg.username})
    if (existingUser) {
      res.send('User already exists. Choose a different user name');
    } 
    existingUser = await regInfo.findOne({email: aReg.email})
    if (existingUser)  {
      res.send('Please check your email address');
    } else {
      //hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(aReg.password, saltRounds);
      aReg.password = hashedPassword;
      aReg.save()
    .then(result => {
      res.redirect('/')
    })
    .catch(err => {
      console.log(err);
    })
    }
  });

  

  app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });
  