// TODO: add comments

const calendars = document.querySelectorAll(".list-rst__calendar");
for(let i = 0; i < calendars.length; i++){
  let e = calendars[i];
  e.parentNode.removeChild(e);
}

const subtitles = document.querySelectorAll(".list-sidebar__sub-title");
for(let i = 0; i < subtitles.length; i++){
  const e = subtitles[i];
  const text = e.textContent;
  if(text.includes("Tポイント") || text.includes("予約")){
    e.style.display = 'none';
    e.nextElementSibling.style.display = 'none';
  }
}
