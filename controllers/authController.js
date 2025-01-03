const User = require('../models/userModel')

//handle errors
const handleErrors = err => {
  console.log(err.message, err.code)
  let error = { username: '', email: '', password: '' }

  //validation errors
  if (err.message.includes('user validation failed')) {
    console.log(err)
  }
}

module.exports.signup_get = (req, res) => {
  res.render('signup', { title: 'Signup' })
}

module.exports.login_get = (req, res) => {
  res.render('login', { title: 'Login' })
}

module.exports.signup_post = async (req, res) => {
  const newDateAndTime = new Date().toLocaleString()
  console.log(newDateAndTime)
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    dateAndTime: newDateAndTime
  })
  try {
    user.save()
    res.status(201).json(user)
    res.redirect('/')
    console.log('All ok')
  } catch (err) {
    const error = handleErrors(err)
    res.redirect('./404')
  }
}

module.exports.login_post = (req, res) => {
  console.log('login info received')
}
