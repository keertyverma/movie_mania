import express from "express";

const app = express();
const PORT = app.get("PORT") || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
