'use strict';

// middleware
var 
isAuthenticated   = require('../middleware/auth').isAuthenticated,
isUnauthenticated = require('../middleware/auth').isUnauthenticated,
setRender         = require('middleware-responder').setRender,
setRedirect       = require('middleware-responder').setRedirect,
stripeEvents      = require('../middleware/stripe-events'),
secrets           = require('../config/secrets');

// controllers
var registrations = require('../controllers/registrations-controller'),
// @TODO split controller action's to a different place.
users             = require('../controllers/users-controller');
// dashboard         = require('../controllers/dashboard-controller')


module.exports    = function (app, passport) {

  // registrations
  // app.get('/signup',
  //   setRedirect({auth: '/dashboard'}),
  //   isUnauthenticated,
  //   setRender('signup'),
  //   registrations.getSignup
  // );

  // app.post('/signup',
  //   setRedirect({auth: '/dashboard', success: '/dashboard', failure: '/signup2'}),
  //   isUnauthenticated,
  //   registrations.postSignup
  // );



  app.routes('/signup2')
     .all(setRedirect({auth: '/dashboard', success: '/signup2-1', failure: '/signup2'}))
     .all(isUnauthenticated)
     .get(setRender('signup2'), registrations.getSignup2)
     .post(registrations.postSignup2);


  // app.get('/signup2',
  //   setRedirect({auth: '/dashboard'}),
  //   isUnauthenticated,
  //   setRender('signup2'),
  //   registrations.getSignup2
  // );


  // app.post('/signup2',
  //   setRedirect({auth: '/dashboard', success: '/signup2-1', failure: '/signup2'}),
  //   // setRedirect({auth: '/dashboard', success: '/dashboard', failure: '/signup2'}),
  //   isUnauthenticated,
  //   registrations.postSignup2
  // );



  app.routes('signupshort')
     .all(setRedirect({auth: '/dashboard', success: '/dashboard', failure: '/signup2'}))
     .all(isUnauthenticated)
     .get(setRender('signup2-1'), registrations.getSignup2)
     .post(registrations.postSignupFirstTime);

//user registration before purchase
  // app.post('/signupshort',
  //   setRedirect({auth: '/dashboard', success: '/dashboard', failure: '/signup2'}),
  //   isUnauthenticated,
  //   registrations.postSignupFirstTime
  // );


  // app.get('/signup2-1',
  //   setRedirect({auth: '/dashboard'}),
  //   isUnauthenticated,
  //   setRender('signup2-1'),
  //   registrations.getSignup2
  // );

  app.routes('/whois')
     .all(setRedirect({ auth: '/', success: '/profile', failure: '/profile' }))
     .all(isAuthenticated)
     .get(setRender('singup/whois-settings'), registrations.getWhoisForm)
     .post(registrations.postWhois);
     // .post(users.postWhois);

  //display whois form 
  //@TODO change URL name
  // app.get('/whois',
  //   setRender('dashboard/whois-settings'),
  //   setRedirect({auth: '/'}),
  //   isAuthenticated,
  //   dashboard.getWhoisForm
  // );

//@TODO replace redirect rules
  // app.post('/whois-settings',
  //   setRedirect({ auth: '/', success: '/profile', failure: '/profile' }),
  //   isAuthenticated,
  //   users.postWhois
  // );



};