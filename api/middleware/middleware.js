const User = require("../users/users-model");

function logger(req, res, next) {
  console.log(
    `[Request Method: ${req.method};
     Request URL: ${req.originalUrl};
     Timestamp: ${Date().toLocaleString()}]`
  );
  next();
}

async function validateUserId(req, res, next) {
  try {
    const user = await User.getById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "user not found" });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "user not found" });
  }
}

function validateUser(req, res, next) {
  const { name } = req.body;
  if (!name || !name.trim()) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    req.name = name.trim();
    next();
  }
}

function validatePost(req, res, next) {
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
