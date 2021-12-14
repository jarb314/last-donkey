require("dotenv").config();

exports.headers = {
  // Authorization:
  //   "Basic cXVlc29qYS5uYXR1cmVAZ21haWwuY29tOjU5ZTMwOTdhZmU0OTYyNWUyOWYx",
  Authorization: process.env.AUTHORIZATION,
};
