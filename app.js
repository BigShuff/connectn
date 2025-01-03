const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const hostname = '127.0.0.1';
const port = 3002;
const Registration = require('./models/userModel');
const FsAndW = require('./models/fsAndWModel');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

//this tells the app to use public for all static files I.e images and css etc
app.use(express.static('public'));

// listen for requests
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})

//connect Database
// const dbConnectStr = 'mongodb://localhost:27017/connectn';
// mongoose.connect(dbConnectStr, {useNewUrlParser: true, useUnifiedTopology: true})
// .then((result) => {app.listen(3002);
//   console.log('Database connected successfully');
// })
// .catch((err) => console.log(`There has been an error opening the database... ${err}`));
const connect = mongoose.connect('mongodb://localhost:27017/connectn');
connect
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch(err => {
    console.log(`Database can not be connected ${err}`);
  })

//Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
})

// app.get('/saleWantedAds', (req, res) => {
//   res.render('saleWantedAds', { title: 'For Sale & Wanted' });
// })

// app.get('/login', (req, res) => {
//   res.render('login', { title: 'Login', warning:'' });
// })

// app.get('/signup', (req, res) => {
//   res.render('signup', { title: 'Sign Up', warning:'' });
// })

// app.post('/signup', async (req, res) => {
//   //local date code
//   const formattedDate = new Date()
//   const registrationDate = formattedDate.toLocaleString('en-GB');
//   //a new object based on Registration model
//   const aReg = new Registration({
//     username: req.body.username,
//     email: req.body.email,
//     password: req.body.password,
//     date: registrationDate
//   })
//   //Find any duplications of username or email based on database and raw text in aReg
//   let existingUser = await Registration.findOne({ username: aReg.username });
//   let existingEmail = await Registration.findOne({ email: aReg.email });
//   if (existingUser) {
//     res.render('signup', { title: 'Sign Up', warning:'User already exists choose a different user name' });
//   } //existingUser = await Registration.findOne({ email: aReg.email })
//   else if (existingEmail) {
//     res.render('signup', { title: 'Sign Up', warning:'Email address already in use'});
//     //res.send('Please check your email address')
//   } else {
//     //hash the password
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(aReg.password, saltRounds);
//     aReg.password = hashedPassword;
//     aReg
//     //save the record to db
//       .save()
//       .then(result => {
//         res.redirect('/');
//       })
//       .catch(err => {
//         console.log(err);
//       })
//   }
// });

// app.get('/fsAndW', (req, res) => {
//   res.render('fsAndW', { title: 'For Sale & Wanted', username: ''});
// })

// app.get('/fsAndW/createFsAndW', (req, res) => {
//   res.render('createFsAndW', { title: 'Create An Ad'});
// })

// app.post('/fsAndW', (req, res) => {
//   //local date code
//   const formattedDate = new Date()
//   const registrationDate = formattedDate.toLocaleString('en-GB');
//   //a new object based on Registration model
  
//   const aFsAndW = new FsAndW({
//     fsOrW: req.body.fsOrW,{ title: 'Login'}
//     heading: req.body.heading,
//     subHeading: req.body.subHeading,
//     body: req.body.body,
//     imagePath: req.body,
//     localArea: req.body.localArea,
//     email: req.body.email,
//     price: req.body.price,
//     offerStatus: req.body.offerStatus,
//     transportation: req.body.transportation,
//     durationDays: req.body.durationDays,
//     okTAndC: req.body.okTAndC,
//     adCost: req.body.adCost, 
//     date: registrationDate
// })
// })


// app.post('/login', async (req, res) => {
//   try {
//     const check = await Registration.findOne({ email: req.body.email });
//     if (!check) {
//       res.render('login', { title: 'Login', warning:'Email address not found'});
//       }
//     //compare password plain text with hashed copy in database
//     const isPasswordMatch = await bcrypt.compare(
//       req.body.password,
//       check.password
//     )
//     if (isPasswordMatch) {
//       res.render('fsAndW', {title: 'Create An Add', username: check.username});
//     } else {
//       res.render('login', { title: 'Login', warning:'Wrong password details'});
//      }
//   } catch {
//     res.render('login', { title: 'Login', warning:'Details not found'});
//     }
// })

// req.on("close", function() {
//   // request closed unexpectedly
// });

// req.on("end", function() {
//   // request ended normally
// });
app.use(authRoutes);

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
})
