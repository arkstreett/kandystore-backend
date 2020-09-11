const express = require("express");
const bodyParser = require("body-parser");
const CORS = require("cors");

const server = express();

server.use(bodyParser.json());
server.use(CORS());

const user = [
  {
    id: 0,
    name: "mynamestartswitham",
    password: "imabitch",
  },
];

server.get("/api/user", (req, res) => {
  res.send(user);
});

// Middleware
function checkLogin(req, res, next) {
  if (req.body.username && req.body.password) {
    next();
  } else {
    res.status(400).json({ message: "Please enter a username and password." });
  }
}

//Login Valid User
server.post("/login", checkLogin, (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then((user) => {
      console.log(user);
      if (user && bcrypt.compareSync(password, user.password)) {
        // req.session.loggedin = true;

        const token = genToken(user);
        console.log("test");
        res.status(200).json({
          message: `Welcome ${user.username}`,
          token: token,
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// PORT LISTENING

const port = 5000;

server.listen(port, () => {
  console.log(`The Kandy Store is ready to go!`);
});
