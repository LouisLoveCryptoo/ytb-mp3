const ytdl = require("ytdl-core");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
const path = require("path");

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const download = async (url, host) => {
  try {
    const info = await ytdl.getInfo(url);
    const videoTitle = info.videoDetails.title
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase();
    let outputPath = path.join(
      __dirname,
      "public",
      "musics",
      `${videoTitle}.mp3`
    );

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    const stream = ytdl(url, { quality: "highestaudio" });

    const output = fs.createWriteStream(outputPath);

    return new Promise((resolve, reject) => {
      ffmpeg(stream)
        .audioBitrate(128)
        .save(outputPath)
        .on("end", () => {
          console.log(`Le fichier MP3 a été créé : ${outputPath}`);
          const fileUrl = `http://${host}/musics/${videoTitle}.mp3`;
          resolve(fileUrl);
        })
        .on("error", reject);
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = download;
