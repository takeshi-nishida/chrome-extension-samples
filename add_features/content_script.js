addFeaturesAttempt();

function addFeaturesAttempt(){
  if(!addButtonToAppBar()){ // If failed to add button
    setTimeout(addFeaturesAttempt, 500); // Try again 500ms later
  }
}

function addButtonToAppBar(){
  // Get one of the app bar button to clone
  const b = document.querySelector("div[data-testid='AppTabBar_More_Menu']");
  if(!b) return false;
  const mainmenu = b.parentNode;

  const cloneButton = b.cloneNode(true);
  mainmenu.appendChild(cloneButton);

  const span = cloneButton.querySelector("span");
  if(span) span.textContent = "";

  const url = chrome.runtime.getURL("trophy.svg");
  const e = cloneButton.querySelector("svg");
  replaceElementWithFile(e, url, (e) => console.log("replaced button icon"));

  cloneButton.onclick = buttonClicked;
  return true;
}

let n = 0;

function buttonClicked(){
  n++;
  if(n % 2 == 0) showIcons();
  else showRanking();
}

// Prepare the space to show things on top of the timeline
function getTargetArea(){
  const timeline = document.querySelector("section").querySelector("div").querySelector("div");
  let target = document.querySelector("#target");
  if(!target){
    target = document.createElement("div");
    target.id = "target";
    timeline.insertBefore(target, timeline.childNodes[0]);
  }
  target.innerHTML = "";
  return target;
}

function showIcons(){
  // Get avatar icons in the new Twitter UI
  const tweets = document.querySelectorAll("div[data-testid='tweet']");
  const icons = Array.from(tweets).map(t => t.querySelector("a"));

  // Copy the icons to the target area
  const target = getTargetArea();
  for(let i = 0; i < icons.length; i++){
    target.appendChild(icons[i].cloneNode(true));
  }
}

function showRanking(){
  let tweets = document.querySelectorAll("div[data-testid='tweet']");
  let count = {};

  for(let i = 0; i < tweets.length; i++){
    const name = tweets[i].querySelector("a").getAttribute("href").substring(1);
    if(!count[name]) count[name] = 0;
    count[name]++;
  }

  let sortedNames = Object.keys(count).sort(function(a, b){ return count[b] - count[a] }).slice(0, 10);

  const target = getTargetArea();
  let ol = document.createElement("ol");
  target.appendChild(ol);

  for(let i = 0; i < sortedNames.length; i++){
    let name = sortedNames[i];
    let li = document.createElement("li");
    li.textContent = name + ": " + count[name];
    ol.appendChild(li);
  }
}

function replaceElementWithFile(element, url, callback){
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
      // TODO: copying classes from the original element didn't work
      // const cs = element.classList;
      element.outerHTML = xhr.responseText;
      // for(let i = 0; i < cs.length; i++){
      //   element.classList.add(cs.item(i));
      // }
      callback(element);
    }
  }
  xhr.open('GET', url, true);
  xhr.send();
}
