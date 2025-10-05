document.addEventListener("DOMContentLoaded", function() {
  const url = "https://raw.githubusercontent.com/TaKeZo360/gamesizes/refs/heads/main/jsonData/androidGames.json";
  const hero = document.getElementById('hero');
  
  // Fetch only JSON (text data)
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then(data => {
      for (let i = 0; i < data.length; i += 2) {
        const item1 = data[i];
        const item2 = data[i + 1];
        hero.appendChild(
          createGameSection({
            id1: i,
            posterSrc1: item1.poster,
            logoSrc1: item1.logo,
            gameName1: item1.name,
            id2: i + 1,
            posterSrc2: item2 ? item2.poster : '',
            logoSrc2: item2 ? item2.logo : '',
            gameName2: item2 ? item2.name : ''
          })
        );
      }
    })
    .catch(error => console.error("Fetching error:", error));
  
  // Device nav animation (unchanged)
  const leftNavSec = document.getElementById('left-sec');
  let timeoutID;
  
  leftNavSec.addEventListener('click', (e) => {
    let el = e.target.closest(".device");
    if (!el) return;
    clearTimeout(timeoutID);
    
    let left = el.offsetLeft;
    let width = el.offsetWidth;
    timeoutID = setTimeout(() => {
      console.log(el.id);
    }, 1000);
    
    leftNavSec.style.setProperty("--after-left", left + "px");
    leftNavSec.style.setProperty("--after-width", width + "px");
  });
  
  // Search toggle
  const gameSbtn = document.getElementById("gameS-btn");
  const searchSec = document.getElementById('search-section');
  const body = document.querySelector('body');
  
  gameSbtn.addEventListener("click", () => {
    searchSec.classList.toggle("active");
    body.classList.toggle("active");
  });
  
  // Create section boxes
  function createGameSection({ id1, posterSrc1, logoSrc1, gameName1, id2, posterSrc2, logoSrc2, gameName2 }) {
    const section = document.createElement("section");
    section.className = "container";
    
    function createBox(id, posterSrc, logoSrc, gameName) {
      const box = document.createElement("div");
      box.className = "box";
      box.dataset.id = id;
      
      const poster = document.createElement("img");
      poster.src = `images/${posterSrc}` || "placeholder-16-9.png";
      poster.alt = "Poster";
      poster.loading = "lazy";
      poster.className = "poster";
      poster.onerror = () => { poster.src = "placeholder-16-9.png"; };
      
      const overlay = document.createElement("div");
      overlay.className = "poster-overlay";
      
      const gameInfo = document.createElement("div");
      gameInfo.className = "gameInfo";
      
      const logo = document.createElement("img");
      logo.src = `images/${logoSrc}` || "placeholder-1-1.png";
      logo.alt = "Logo";
      logo.loading = "lazy";
      logo.className = "logo";
      logo.onerror = () => { logo.src = "placeholder-1-1.png"; };
      
      const name = document.createElement("p");
      name.className = "gameName";
      name.textContent = gameName;
      
      gameInfo.append(logo, name);
      box.append(poster, overlay, gameInfo);
      return box;
    }
    
    const box1 = createBox(id1, posterSrc1, logoSrc1, gameName1);
    section.appendChild(box1);
    
    if (posterSrc2 && logoSrc2 && gameName2) {
      const box2 = createBox(id2, posterSrc2, logoSrc2, gameName2);
      section.appendChild(box2);
    }
    
    return section;
  }
});