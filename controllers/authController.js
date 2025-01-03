module.exports.signup_get = (req, res) => {
    res.render('signup', { title: 'Signup'});
}

module.exports.login_get = (req, res) => {
    res.render('login', { title: 'Login'});
}

module.exports.signup_post = (req, res) => {
    console.log('signup info received')
}

module.exports.login_post = (req, res) => {
    console.log('login info received');
}