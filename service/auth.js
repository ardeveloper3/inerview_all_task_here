const jwt = require("jsonwebtoken");
const secret = "user id signed";

function setUser(user) {
  const payload = {
    ...user,
  };

  return jwt.sign(payload, secret);
}
