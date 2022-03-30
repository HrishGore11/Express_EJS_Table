const express = require("express");
const app = express();
const port = process.env.PORT || 5015;
const User = require("./Models/User");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.get("/home", (req, res) => {
  User.find().then((data) => {
    res.render("temp", { data: data, heading: "Users :" });
  });
});

app.post("/api/create", (req, res) => {
  const body = req.body;

  const user = new User({
    name: body.name,
    active: body.active,
    mobile: body.mobile,
    age: body.age,
    place: body.place,
  });

  user.save().then((data) => {
    res.redirect("/home");
  });
});
//KCXm5qjxW1a7yY2S
//////////////////////////////////////////////
app.get("/edit/:_id", (req, res) => {
  const id = req.params._id;

  User.findById(id, (err, data) => {
    if (err) {
      res.redirect("/");
    } else {
      if (data == null) {
        res.redirect("/");
      } else {
        res.render("edit", { title: "edit_user", data: data });
      }
    }
  });
});
/////////////////////////////////////////////
app.get("/Add", (req, res) => {
  res.render("Add");
});
/////////////////////////////////////////////

app.post("/api/update/:_id", (req, res) => {
  const id = req.params._id;
  const body = req.body;

  User.updateOne(
    { _id: id },
    {
      $set: {
        name: body.name,
        mobile: body.mobile,
        age: body.age,
        place: body.place,
        active: body.active,
      },
    }
  )
    .then(() => {
      console.log(req.body);

      res.redirect("/home");
    })
    .catch((err) => {
      res.json({ message: "Error", data: err });
    });
});
/////////////////////////////////////////////
app.get("/delete/:_id", (req, res) => {
  const id = req.params._id;

  User.deleteOne({ _id: id })
    .then(() => {
      res.redirect("/home");
    })
    .catch((err) => {
      res.json({ message: "Error", data: err });
    });
});
/////////////////////////////////////////////

const mongoose = require("mongoose");
// const bodyParser = require("body-parser")
mongoose
  .connect(
    "mongodb+srv://Hrishi:KCXm5qjxW1a7yY2S@cluster0.1nqxb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then((data) => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("server connection sucessfully");
});
