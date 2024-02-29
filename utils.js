require("dotenv").config()

const authenticateKey = (req, res, next) => {
  let api_key = req.header("x-api-key")

  if(api_key == process.env.API_KEY) {
    console.log("Good API call");
    next();
  } else {
    res.status(403).send({ error: { code: 403, message: "API KEY REQUIRED." } });
  }

};
module.exports = { authenticateKey };