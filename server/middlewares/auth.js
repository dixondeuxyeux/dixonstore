const admin = require('../firebase');
const User = require('../models/user');

exports.authCheck = async (req, res, next) => {
  console.log(req.headers.authoken); // token
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    //console.log('FIREBASE USER IN AUTHCHECK', firebaseUser);
    req.user = firebaseUser;
    next();
  } catch (err) {
    res.status(401).json({
      err: 'Invalid or expired token',
    });
  }
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;
  console.log('USER IN ADMIN CHECK ===> ', req.user);
  const adminUser = await User.findOne({ email }).exec();
  console.log('ADMIN USER FOUND ===> ', adminUser);
  if (adminUser.role !== 'admin') {
    res.status(403).json({
      err: 'Admin resource only. Access denied.',
    });
  } else {
    next();
  }
};
