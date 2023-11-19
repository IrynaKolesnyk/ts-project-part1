// @ts-ignore
import soundRain from "./sounds/rain.mp3";
// @ts-ignore
import soundSummer from "./sounds/summer.mp3";
// @ts-ignore
import soundWinter from "./sounds/winter.mp3";

import "./index.scss";

const rainItem = document.querySelector("#rain") as HTMLBodyElement;
const summerItem = document.querySelector("#summer") as HTMLBodyElement;
const winterItem = document.querySelector("#winter") as HTMLBodyElement;
const background = document.querySelector("#background") as HTMLBodyElement;
const volume = document.querySelector("#volume") as HTMLInputElement;

rainItem.addEventListener("click", onItemClick);
summerItem.addEventListener("click", onItemClick);
winterItem.addEventListener("click", onItemClick);
volume.addEventListener("click", onVolumeClick);

const audio = new Audio(soundWinter);
const songs = [soundSummer, soundRain, soundWinter];
const items = [summerItem, rainItem, winterItem];
let activeItem = "";

function itemIndex(itemName: string) {
  switch (itemName) {
    case "summer":
      return 0;
    case "rain":
      return 1;
    case "winter":
      return 2;
    }
    return 0;
}

function playPauseSong(name: string) {
  const itemIdx = itemIndex(name);
  const isPlay = items[itemIdx].classList.contains("play");

  if (activeItem === name && isPlay) {
    items[itemIdx].classList.remove("play");
    audio.pause();
    return;
  }

  for (let i = 0; i < items.length; i++) {
    if (i === itemIdx) {
      items[i].classList.add("play");
    } else {
      items[i].classList.remove("play");
    }
  }

  audio.play();
}

function onVolumeClick() {
  audio.volume = +volume.value;
}

function setSong(itemName: string) {
  if (activeItem === itemName) return;
  const indexSong = itemIndex(itemName);
  audio.setAttribute("src", songs[indexSong]);
}

function onItemClick(event: MouseEvent) {
    const { currentTarget } = event;
  const item = (currentTarget as HTMLButtonElement).id;

  !activeItem
    ? background.classList.add(item)
    : background.classList.replace(activeItem, item);

  setSong(item);
  playPauseSong(item);
  activeItem = item;
}
