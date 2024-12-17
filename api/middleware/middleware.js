function logger(req, res, next) {
  console.log(
    `[Request Method: ${req.method};
     Request URL: ${req.originalUrl};
     Timestamp: ${Date().toLocaleString()}]`
  );
  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  console.log("validateUserId function");
  next();
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  console.log("validateUser function");
  next();
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  console.log("validatePost function");
  next();
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};

// When we're creating our own custom middleware, should we always install and use Morgan? or is built-in middleware just as easy?
