# YTB-MP3

This project is a simple YouTube to MP3 converter. It uses a Vue.js frontend to take a YouTube URL input from the user, and a Node.js backend to download the YouTube video and convert it to MP3 format.

## Technologies Used

- Frontend: Vue.js 3
- Backend: Node.js with Express.js
- Other libraries: ytdl-core, fluent-ffmpeg

## Project Structure

The project is divided into two main parts:

- [`client/`](command:_github.copilot.openRelativePath?%5B%22client%2F%22%5D "client/"): This is the frontend part of the application, built with Vue.js. The main file is [`App.vue`](command:_github.copilot.openRelativePath?%5B%22client%2Fsrc%2FApp.vue%22%5D "client\src\App.vue"), which contains the form for inputting the YouTube URL and the function to send the URL to the backend.

- [`server/`](command:_github.copilot.openRelativePath?%5B%22server%2F%22%5D "server/"): This is the backend part of the application, built with Node.js and Express.js. It contains the [`download.js`](command:_github.copilot.openRelativePath?%5B%22server%2Fdownload.js%22%5D "server\download.js") file, which handles the downloading and conversion of the YouTube video.

## Key Functions

### [`sendUrl`](command:_github.copilot.openSymbolInFile?%5B%22client%2Fsrc%2FApp.vue%22%2C%22sendUrl%22%5D "client/src/App.vue") function

This function is located in [`client/src/App.vue`](command:_github.copilot.openRelativePath?%5B%22client%2Fsrc%2FApp.vue%22%5D "client/src/App.vue"). It sends a POST request to the backend with the YouTube URL as the body. The response from the backend is then stored in the [`data`](command:_github.copilot.openSymbolInFile?%5B%22client%2Fsrc%2FApp.vue%22%2C%22data%22%5D "client/src/App.vue") variable.

```javascript
const sendUrl = async () => {
  const res = await fetch("http://localhost:4545/download", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: url.value,
    }),
  });
  const jsonData = await res.json();
  data.value = jsonData;
  console.log(data);
};
```

### `download` function

This function is located in [`server/download.js`](command:_github.copilot.openRelativePath?%5B%22server%2Fdownload.js%22%5D "server/download.js"). It uses the [`ytdl-core`](command:_github.copilot.openSymbolInFile?%5B%22server%2Fpackage.json%22%2C%22ytdl-core%22%5D "server/package.json") library to download the YouTube video and the [`fluent-ffmpeg`](command:_github.copilot.openSymbolInFile?%5B%22server%2Fpackage.json%22%2C%22fluent-ffmpeg%22%5D "server/package.json") library to convert the video to MP3 format. The MP3 file is then saved in the `public/musics` directory.

```javascript
const download = async (url, host) => {
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
/*...*/
```

## How to Run the Project

1. Clone the repository.
2. Navigate to the [`client`](command:_github.copilot.openRelativePath?%5B%22client%22%5D "client") directory and run `npm install` to install the frontend dependencies.
3. Run `npm run dev` to start the frontend development server.
4. Navigate to the [`server`](command:_github.copilot.openRelativePath?%5B%22server%22%5D "server") directory and run `npm install` to install the backend dependencies.
5. Run `node index.js` to start the backend server.

Now, you can navigate to `http://localhost:5173` in your browser to use the application.
