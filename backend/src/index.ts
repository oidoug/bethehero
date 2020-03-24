import express from "express";

const app = express();
const port = 3333;

app.get("/", (req, res) => {
  res.json({
    meme: 'cool',
    something: 'something',
  });
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
