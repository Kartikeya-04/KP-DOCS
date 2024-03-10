//middleware for verification

const verify = async (req, res, next) => {
  var token = req.header('authorization');
  if (typeof token !== undefined) {
    const token2 = token.split(' ');
    const bearer = token2[1];
    req.token = bearer;

    next();
  } else {
    res.send('error in verifying');
  }
};

module.exports = verify;
