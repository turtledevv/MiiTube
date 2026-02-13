import { videos } from '/assets/data/videos.js';
import { users } from '/assets/data/users.js';

function getEmbedLink(videoID, videoPlatform) {
  switch (videoPlatform) {
    case "yt":
      return `https://www.youtube.com/embed/${videoID}`;
    case "od":
      return `https://odysee.com/$/embed/${videoID}`;
    case "vm":
      return `https://player.vimeo.com/video/${videoID}`;
    default:
      console.error(`fatal: unknown video platform "${videoPlatform}"`);
      return `data:text/html;charset=utf-8,<h1 style='color:red;'>Error</h1><p>unknown video platform "${videoPlatform}"</p>`;
  }
}

function setVideo(url, title, authorName, profilePic) {
  const iframe = document.getElementById('video-embed');
  const titleText = document.getElementById('title');
  const authorText = document.getElementById('author');
  const profileImg = document.getElementById('pfp');

  if (!iframe) {
    console.error("fatal: Cannot find #video-embed!");
    return;
  }

  if (!titleText || !authorText) {
    console.warn("fatal: Cannot find #title and/or #author elements");
  }

  if (!profileImg) {
    console.warn("fatal: Cannot find #pfp element!");
  }

  iframe.src = url;
  profileImg.src = profilePic;
  titleText.textContent = title;
  authorText.textContent = `by ${authorName}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const videoIDParam = params.get("id");

  console.log(`fetching video w/ id ${videoIDParam}`);
  const videoIndex = parseInt(videoIDParam, 10) - 1;
  const video = videos[videoIndex];

  if (!video) {
    console.error("Video not found!");
    return;
  }

  if (video.type === "video") {
    const embedLink = getEmbedLink(video.id, video.platform);
    const videoTitle = video.title;

    // Look up the author by username now instead of name
    const authorData = users.find(u => u.username === video.author);
    const authorName = authorData ? authorData.name : video.author;
    const authorPFP = authorData ? authorData.profilePic : `/assets/img/users/${video.author}.jpg`;

    setVideo(embedLink, videoTitle, authorName, authorPFP);
  } else {
    console.log("type is playlist, redirecting to YouTube");
    window.location.assign(`https://www.youtube.com/playlist?list=${video.id}`);
  }
});