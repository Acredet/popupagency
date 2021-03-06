const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, validate } = require("../models/user");
// @desc  Get a user
// @route GET /api/users/me
// @access Private
exports.getUser = async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password");
  res.status(200).json({
    success: true,
    ResultsNumber: user.length,
    data: user,
  });
};

exports.getOneById = async (req, res, nex) => {
  const user = await User.findById(req.params.id).select("-password");
  res.status(200).json({
    success: true,
    ResultsNumber: user.length,
    data: user,
  });
};

exports.addFilters = async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password");
  try {
    user.savedFilters.push(req.body.filters);
    await user.save();
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(400).json(error);
  }
};

// @desc  Get all users
// @route GET /api/users
// @access Private
exports.getAllUsers = async (req, res, next) => {
  try {
    await User.find().then((users) =>
      res.status(200).json({
        success: true,
        ResultsNumber: User.length,
        data: users,
      })
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc  Create a User
// @route POST /api/users
// @access Public
exports.addUser = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).json(error);
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send("User already registered.");
    }

    console.log(req.file);

    user = new User({
      avatar: req.file ? req.file.fileanme : "",
      password: req.body.password,
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    });

    console.log(user);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user
      .save()
      .then(() => {
        const token = user.generateAuthToken();
        res.header("x-auth-token", token).send({
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        });
      })
      .catch((err) => res.status(400).json({ err }));
  } catch (err) {
    return res.status(400).json({ err });
  }
};
// @desc  Create a User
// @route POST /api/users
// @access Public
exports.authenticate = async (req, res) => {
  const { email, password } = req.body;
  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  await User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ msg: "User Does not exist" });
    }
    // Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      jwt.sign(
        { id: user._id },
        process.env.jwtPrivateKey,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({
            token,
            user: {
              id: user._id,
              admin: user.isAdmin,
              role: user.role,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
};

// @desc  Delete a User
// @route Delete /api/User/id
// @access Private
exports.deleteUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) =>
      user.remove().then(() => res.status(200).json({ success: true }))
    )
    .catch((err) => res.status(404).json(err.message));
};

// @desc  update a User
// @route update /api/User/id
// @access Private
exports.updateUser = (req, res) => {
  if (req.file && req.file.filename) {
    req.body.avatar = req.file.filename;
  }

  User.updateOne({ _id: req.params.id }, { $set: req.body })
    .then((user) => res.json({ success: true }))
    .catch((err) => res.status(404).json(err.message));
};

/**
 * @description Returns Users Filterd By Role
 * @route GET /api/user/:role
 * @private
 */
exports.getUsersByRole = async (req, res) => {
  await User.find({ role: req.params.role })
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(400).json(err));
};

exports.changePassword = async (req, res) => {
  const { password } = req.body;

  await User.findOne({ _id: req.params.id })

    .then((user) => {
      bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          return;
        }
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) {
            return;
          }
          User.findOneAndUpdate({ _id: req.params.id }, { password: hash })
            .then(() => res.status(202).json("Password changed accepted"))
            .catch((err) => res.status(500).json(err));
        });
      });
    })
    .catch(() => {
      res.status(404).json("Invalid user");
    });
};
