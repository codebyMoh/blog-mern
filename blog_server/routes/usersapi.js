const bcrypt = require("bcryptjs");
const express = require("express");
const path = require("path");
const multer = require("multer");
const router = express.Router();

const User = require("../models/user");
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Date.now() + ".png");
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100000 },
});

router.post("/uploadimage", upload.single("profile_pic"), (req, res) => {
  res.json({ msg: "file Uploaded successfully" });
});

// http://localhost:7777/api/user/adduser

router.post("/adduser", async (req, res) => {
  try {
    const newUser = new User({
      user_name: req.body.user_name,
      user_email: req.body.user_email,
      user_DOB: bcrypt.hashsync(req.body.user_DOB, 12),
      gender: req.body.gender,
    });

    const saveUser = await newUser.save();
    res.json(saveUser);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// http://localhost:7777/api/user/viewuser
router.get("/viewuser", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

// http://localhost:7777/api/user/singleuser/5651449413332

router.get("/singleuser/:userid", async (req, res) => {
  const uid = req.params.userid;
  try {
    const users = await User.findById(uid);
    res.json(users);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

// http://localhost:7777/api/user/updateuser/5651449413332

router.put("/updateuser/:userid", async (req, res) => {
  const uid = req.params.userid;
  try {
    const users = await User.findByIdAndUpdate(uid, { $set: req.body }, { new: true });
    res.json(users);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

// http://localhost:7777/api/user/deleteuser/5651449413332

router.delete("/deleteuser/:userid", async (req, res) => {
  const uid = req.params.userid;
  try {
    const users = await User.findByIdAndDelete(uid);
    res.status(200).json({ msg: "User is deleted successfully", sts: "1" });
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});
module.exports = router;
