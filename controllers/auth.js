const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
    console.log(req.session.isLoggedIn);
    res.render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      isAuthenticated: false,
    });
  };
  
  exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
      path: '/signup',
      pageTitle: 'SignUp',
      isAuthenticated: false,
    });
  }

  exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    
    User.findOne({ email: email }).then(userDoc => {
      if (userDoc) {
        return res.redirect('/signup');
      }
      return bcrypt.hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
          });
          return user.save();
        })
        .then((result) => {
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
        });
    }).catch(err => {
      console.log(err);
    });
  };
  
  exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then((user) => {
        if (!user) {
            return res.redirect('/login');
        }

        bcrypt.compare(password, user.password).then(doMatch => {
            if (doMatch) {
                req.session.isLoggedIn = true;
                req.session.user = user;
                req.session.save(err => {
                    if (err) {
                        console.log(err);
                    }
                    console.log('User logged in successfully');
                    return res.redirect('/');
                });
            } else {
                console.log('Password does not match');
                res.redirect('/login');
            }
        }).catch(err => {
            console.log(err);
            res.redirect('/login');
        });
    }).catch(err => {
        console.log(err);
        res.redirect('/login');
    });
};


  exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
      console.log(err);
      res.redirect('/');
    })
  };