const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const download = require("./download");
app.use(express.static("public"));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Remplacez par l'origine de votre application Vue
    credentials: true,
  })
);

app.use("/musics", express.static(path.join(__dirname, "musics")));

app.post("/download", async (req, res) => {
  const url = req.body.url;
  if (typeof url !== "string") {
    res.status(400).send({ error: "Invalid url" });
    return;
  }
  try {
    const fileUrl = await download(url, req.headers.host);
    res.send({ url: fileUrl });
    console.log(fileUrl);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to download video" });
  }
});

app.listen(4545, () => {
  console.log("Server listening on port 4545");
});
