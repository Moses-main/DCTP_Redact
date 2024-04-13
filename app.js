const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files from the public directory
// app.use(express.static("views")); // Serve static files from the public directory
app.set("view engine", "ejs");

// Serve the HTML form
app.get("/", (req, res) => {
  // res.sendFile(__dirname + "/public/index.ejs");
  res.render("index");
});

// app.get("/result", (req, res) => {
//   res.render("result");
// });

// Handle form submission
app.post("/redact", (req, res) => {
  const text = req.body.text;
  const wordsToRedact = req.body.words.split(" ");
  const replacement = req.body.replacement || "*"; // Default replacement character to '*'

  const { redactedText, stats } = redactText(text, wordsToRedact, replacement);

  res.render("result", { redactedText, stats });
});

// Function to redact specified words from text and calculate stats
function redactText(text, wordsToRedact, replacement) {
  const words = text.split(/\s+/); // Split text by any whitespace character
  let redactedText = "";
  let wordsScanned = 0;
  let matchedWords = 0;
  let charactersScrambled = 0;

  words.forEach((word) => {
    wordsScanned++;
    if (wordsToRedact.includes(word.toLowerCase())) {
      matchedWords++;
      redactedText += replacement.repeat(word.length) + " ";
      charactersScrambled += word.length;
    } else {
      redactedText += word + " ";
    }
  });

  const stats = {
    wordsScanned,
    matchedWords,
    charactersScrambled,
    timeTaken: 0, // Placeholder for time taken, you can implement this based on your server's processing time
  };

  return { redactedText, stats };
}

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
