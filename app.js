const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Handle form submission
app.post("/redact", (req, res) => {
  const text = req.body.text;
  const wordsToRedact = req.body.words.split(" ");

  const redactedText = redactText(text, wordsToRedact);

  res.send(redactedText);
});

// Function to redact specified words from text
function redactText(text, wordsToRedact) {
  const words = text.split(" ");
  const redactedWords = words.map((word) => {
    if (wordsToRedact.includes(word.toLowerCase())) {
      return "*".repeat(word.length);
    }
    return word;
  });
  return redactedWords.join(" ");
}

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
