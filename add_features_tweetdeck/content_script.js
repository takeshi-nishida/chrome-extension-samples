addFeaturesAttempt();

// Retry addButtons() until it succeeds
function addFeaturesAttempt(){
  if(!addButtons()) setTimeout(addFeaturesAttempt, 500); // retry after 500 millisecconds
}

// Add Buttons to the sidebar (returns false if the sidebar is not ready yet)
function addButtons(){
  const nav = document.querySelector("nav.app-navigator"); // sidebar
  if(!nav) return false; // the sidebar was not ready yet

  let b;

  b = createSideBarButton("Fortune", "運");
  b.onclick = fortuneButtonClicked;
  nav.appendChild(b);

  b = createSideBarButton("Shrink", "大");
  b.onclick = shrinkButtonClicked;
  nav.appendChild(b);

  b = createSideBarButton("Avatars", "像");
  b.onclick = avatarsButtonClicked;
  nav.appendChild(b);

  b = createSideBarButton("Ranking", "位");
  b.onclick = rankingButtonClicked;
  nav.appendChild(b);

  return true;
}

function createSideBarButton(labelText, iconText){
  // 1. Clone the setting button in the sidebar
  const original = document.querySelector("a.js-header-action[data-title='Settings']");
  const b = original.cloneNode(true);

  // 2. Remove "data-title" and "data-action" attributes, to remove default button actions
  b.removeAttribute("data-title");
  b.removeAttribute("data-action");

  // 3. Change label and icon
  b.querySelector(".app-nav-link-text").textContent = labelText;
  const icon = b.querySelector("i");
  icon.classList.remove("icon-settings");
  icon.textContent = iconText;

  return b;
}

// Show random account (by programmatically clicking randomly selected avatar image)
function fortuneButtonClicked(){
  const bs = document.querySelectorAll(".account-link");
  const b = bs[Math.floor(Math.random() * bs.length)];
  b.click();
}

// Shrink the height of all tweets to show more tweets in display
function shrinkButtonClicked(){
  const icon = this.querySelector("i");
  const shrink = icon.textContent == "大";

  const tweets = document.querySelectorAll("article");
  for(let i = 0; i < tweets.length; i++){
    const tweet = tweets[i];
    if(shrink) tweet.classList.add("shrinked");
    else tweet.classList.remove("shrinked");
  }
  icon.textContent = shrink ? "密" : "大"
}

function avatarsButtonClicked(){
  const columns = document.querySelectorAll("section.column");
  for(let i = 0; i < columns.length; i++){
    showAvatars(columns[i]);
  }
}

function showAvatars(column){
  const target = getTargetArea(column);
  const avatars = column.querySelectorAll("img.avatar");
  for(let i = 0; i < avatars.length; i++){
    const clone = avatars[i].cloneNode(true);
    clone.classList.remove("pin-top-full-width");
    target.appendChild(clone);
  }
}

function rankingButtonClicked(){
  const columns = document.querySelectorAll("section.column");
  for(let i = 0; i < columns.length; i++){
    showRanking(columns[i]);
  }
}

function showRanking(column){
  const tweets = column.querySelectorAll("article.stream-item");
  const count = {};
  for(let i = 0; i < tweets.length; i++){
    const name = tweets[i].querySelector(".username").textContent;
    if(!count[name]) count[name] = 0;
    count[name]++;
  }

  const sortedNames = Object.keys(count).sort(function(a, b){ return count[b] - count[a] }).slice(0, 10);

  const target = getTargetArea(column);
  const ol = document.createElement("ol");
  target.appendChild(ol);

  for(let i = 0; i < sortedNames.length; i++){
    let name = sortedNames[i];
    let li = document.createElement("li");
    li.textContent = name + ": " + count[name];
    ol.appendChild(li);
  }
}

// Prepare the space to show things on top of each column
function getTargetArea(column){
  const content = column.querySelector(".column-content");
  let target = content.querySelector(".target");
  if(!target){
    target = document.createElement("div");
    target.classList.add("target");
    content.insertBefore(target, content.childNodes[0]); // insert as the first element
  }
  target.innerHTML = "";
  return target;
}
