const express = require("express");
const User = require("./users-model");
const Posts = require("../posts/posts-model");
const {
  logger,
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");

const router = express.Router();

router.get("/", logger, (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});

router.get("/:id", validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  res.json(req.user);
});

router.post("/", validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  console.log(req.name);
  User.insert({ name: req.name })
    .then((user) => res.status(201).json(user))
    .catch(next);
});

router.put("/:id", validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  User.update(req.params.id, { name: req.name })
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch(next);
});

router.delete("/:id", validateUserId, async (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  try {
    await User.remove(req.params.id);
    res.json(req.user);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
});

router.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    customMessage: "uh oh! something happened inside posts router",
    message: error.message,
  });
});

// do not forget to export the router
module.exports = router;
