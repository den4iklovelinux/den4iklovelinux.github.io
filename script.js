function bindTransitions() {
    const links = document.querySelectorAll('a');
    const transitionScreen = document.getElementById("transition-screen");

    if (!transitionScreen) return;

    links.forEach(link => {
        link.onclick = function(event) {
            const targetUrl = this.getAttribute('href');
            
            event.preventDefault(); 
            
            transitionScreen.classList.add("startTransition");
            
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 1000);
        }
    });
}


document.addEventListener('DOMContentLoaded', bindTransitions);

window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        const transitionScreen = document.getElementById("transition-screen");
        if (transitionScreen) {
            transitionScreen.classList.remove("startTransition");
        }
    }
});

const API_URL = 'https://ring.tetopie.lol/sites'; 

let animationFrameId = null;
let currentRotation = 0;
let isHovered = false;
const isMobile = window.matchMedia('(max-width: 767px)').matches;

// факинг тригонометрия пригодилась!!!
function initWebring(linksData) {
  const menuContainer = document.getElementById('circle-menu');
  menuContainer.innerHTML = ''; 

  const totalItems = linksData.length;
  
  const radius = 80; 
  const centerX = menuContainer.offsetWidth / 2;
  const centerY = menuContainer.offsetHeight / 2;

  const elements = linksData.map((item) => {
    const link = document.createElement('a');
    link.href = item.url;
    link.target = "_blank";
    link.title = item.name;
    link.classList.add('menu-link');

    const icon = document.createElement('img');
    icon.src = "https://ring.tetopie.lol/media/" + item.favicon;
    icon.alt = item.name;
    icon.classList.add('menu-icon');
    
    icon.onerror = () => {
      icon.remove();
      link.textContent = item.name ? item.name.charAt(0) : '?';
      link.style.fontWeight = 'bold';
      link.style.color = '#3498db';
    };

    link.appendChild(icon);
    menuContainer.appendChild(link);
    
    return link;
  });

  function updatePositions() {
    if (!isHovered) {
      currentRotation += 0.005; 
    }

    elements.forEach((link, index) => {
      const angle = (index * 2 * Math.PI) / totalItems + currentRotation - (Math.PI / 2);
      
      x = centerX + radius * 3.5 * Math.cos(angle);
      if (isMobile){
        x = centerX + radius * 1.5 * Math.cos(angle);
        }
      const y = centerY + radius * Math.sin(angle);

      link.style.left = `${x}px`;
      link.style.top = `${y}px`;
    });

    animationFrameId = requestAnimationFrame(updatePositions);
  }

  menuContainer.addEventListener('mouseenter', () => isHovered = true);
  menuContainer.addEventListener('mouseleave', () => isHovered = false);

  updatePositions();
}

async function loadWebring() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Err: ${response.status}`);
    const data = await response.json();
    
    initWebring(data);
  } catch (error) {
    console.error(error);
    document.getElementById('circle-menu').textContent = 'Webring building failed';
  }
}

document.addEventListener('DOMContentLoaded', loadWebring);