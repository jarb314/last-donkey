require("dotenv").config();
const path = require("path");
const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 4000;
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, "../client/build")));

// connect to mongoDb
const db = require("./app/models");
const Role = db.role;
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      // new Role({
      //   name: "moderator"
      // }).save((err) => {
      //   if (err) {
      //     console.log("error", err);
      //   }
      //   console.log("added 'moderator' to roles collection");
      // });
      new Role({
        name: "admin"
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}

require("./app/routes/member.routes")(app);
require("./app/routes/purchase.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
