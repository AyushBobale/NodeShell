import express from "express";

const app = express();
const PORT = process.argv[2] || 5000;
const TIME = process.argv[3] * 1000 || 60 * 1000;

app.get("/", (req, res) => {
  console.log(`Incoming request at ${new Date()} from ${req.ip}`);
  res.send(`<h1>App running ${process.argv[4]}</h1>`);
});

app.listen(PORT, () => {
  console.log(
    `Server no ${process.argv[4] || "default"} running at port ${PORT}`
  );
  console.log(`Visit link : http://localhost:${PORT}`);
  http: console.log(`Server will stop in ${TIME / 1000} seconds`);
  setTimeout(() => {
    console.log(`Stopping server`);
    process.exit(1);
  }, TIME);
});
