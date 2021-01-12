# Usage

```js
const content = new Downloader({
  url: "https:youtube.com/...",
  settings: {
    format: "mp4" | "mp3",
    qulaity: "high" | "min",
  },
});

await content.initialize();

let file = await content.downloadAsync((progress) => {
  callback(progress);
});

console.log(file.uri);
```
