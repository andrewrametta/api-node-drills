const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).send("Hello Express!");
});

app.get("/users", (req, res) => {
  let users = ["Andrew", "Peter", "Alex", "Jesse", "Phin"];
  res.status(200).send({ users });
});

app.get("/test-request", (req, res) => {
  res.send({
    url: req.url,
    method: req.method,
    params: req.params,
    query: req.query,
  });
});

app.get("/greeting", (req, res) => {
  let requiredfields = ["name", "age"];
  requiredfields.forEach((field) => {
    if (!req.query[field]) {
      res.status(400).send(`${field} is a required quert param`);
    }
  });

  let { name, age } = req.query;

  res.send(`Welcome ${name}, you are ${age} years old`);
});

app.get("/sum", (req, res) => {
  let requiredfields = ["a", "b"];
  requiredfields.forEach((field) => {
    if (!req.query[field]) {
      res.status(400).send(`${field} is a required quert param`);
    }
  });

  let { a, b } = req.query;
  const numberA = parseInt(a);
  const numberB = parseInt(b);

  res.send(`The sum of ${a} and ${b} is ${numberA + numberB}`);
});

app.get("/cipher", (res, req) => {
  let requiredfields = ["text", "shift"];
  requiredfields.forEach((field) => {
    if (!req.query[field]) {
      res.status(400).send(`${field} is a required quert param`);
    }
  });

  let { text, shift } = req.query;
  const shiftNum = parseInt(shift);
  text = text.toUpperCase();
  let encryptedMessage = "";
  let start = 65;
  let max = 65 + 25;

  for (let i = 0; i < text.length; i++) {
    if (text[i].charCodeAt(0) < start || text[i].charCodeAt(0) > max) {
      encryptedMessage += text[i];
    } else {
      let newPosition = text[i].charCodeAt(0) + shiftNum;
      if (newPosition > max) {
        newPosition = (newPosition % max) + start - 1;
      }
      encryptedMessage += String.fromCharCode(newPosition);
    }
  }

  res.send(encryptedMessage);
});

app.listen(8000, () => {
  console.log("App is running at http://localhost:8000");
});
