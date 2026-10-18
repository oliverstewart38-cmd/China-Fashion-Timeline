// index.js
// Builds the era timeline from the data below, swaps the photo panel as the
// visitor scrolls, and draws the clickable hotspots on each photo.

// Each era is an object. buildEras() loops over this array, so a new era only needs a new object instead of new HTML.
const eras = [
  {
    name: "Han",
    image: "assets/images/han.jpg",
    alt: "Black-and-white photo of a weathered earthenware figure of a standing court lady in a long robe, her wide sleeves folded in front.",
    credit:
      "Standing court lady, Western Han dynasty, 2nd century BCE. Earthenware with traces of pigments. The Metropolitan Museum of Art, Rogers Fund, 1920 (20.39.1). Public Domain.",
    dates: "206 BCE to 220 CE",
    background: "#1c1a1a",
    accent: "#e0483e",
    textColor: "#f2ece4",
    signature: "Shenyi",
    description:
      "Han court dress is usually described as a long robe called the shenyi, with wide sleeves and a collar that crosses over the chest, as on the figure shown here. Black and red are often linked with the court. Silk was central to Han trade: the empire sent silk and gold west through Central Asia and received wine, spices and woolen fabrics in return.",
    context:
      "China was reunited under the Han, and Confucian ideas of correct conduct became the basis of official life.",
    // x and y are percentages of the photo's width and height.
    hotspots: [
      {
        x: 48,
        y: 23,
        label: "Crossed collar",
        text: "The collar crosses diagonally over the chest, a style usually associated with the shenyi.",
      },
      {
        x: 49,
        y: 52,
        label: "Wide sleeves",
        text: "The sleeves are wide and long. This figure holds them folded in front of her body.",
      },
      {
        x: 50,
        y: 91,
        label: "Flared hem",
        text: "The long robe widens towards the bottom and covers the feet.",
      },
    ],
  },
  {
    name: "Tang",
    image: "assets/images/tang.jpg",
    alt: "Painted earthenware figure of a Tang court lady with looped hair, a short fitted jacket with long sleeves, and a long skirt with flared panels at the hem.",
    credit:
      "Standing court lady, Tang dynasty, late 7th century. Earthenware with slip, pigment and gilt. The Metropolitan Museum of Art, Gift of Stanley Herzman, in memory of Adele Herzman, 1991 (1991.253.8). Public Domain.",
    dates: "618 to 907",
    background: "#f3e3b3",
    accent: "#8a4a0f",
    textColor: "#2b1d0e",
    signature: "Ruqun",
    description:
      "Women's dress is usually described as the ruqun, a short jacket worn with a long skirt tied high on the body. Tomb paintings and figurines show how trade gave the Tang elite a taste for striking, sumptuous fashions. In the mid-eighth century, close-fitting sleeves and leopard-skin hats, imitating Central Asians and Persians, were in style, and high boots and short tunics were worn by both men and women.",
    context:
      "Busy Silk Road trade brought foreign fabrics, patterns and fashions to the capital.",
    hotspots: [
      {
        x: 49,
        y: 14,
        label: "Looped hairstyle",
        text: "The hair is piled into large loops on top of the head.",
      },
      {
        x: 49,
        y: 41,
        label: "High waist",
        text: "The skirt is tied high, just under the chest, the line usually associated with the ruqun.",
      },
      {
        x: 37,
        y: 63,
        label: "Long sleeves",
        text: "The wide sleeves hang long past the hands.",
      },
    ],
  },
  {
    name: "Ming",
    image: "assets/images/ming.jpg",
    alt: "Black-and-white photo of a glazed porcelain figure of a lady with a high topknot, a draped robe with wide sleeves and a beaded chest ornament.",
    credit:
      "Figure of an immortal lady, Ming dynasty, 16th century. Porcelain with colored glaze (Jingdezhen ware). The Metropolitan Museum of Art, Bequest of Benjamin Altman, 1913 (14.40.218). Public Domain.",
    dates: "1368 to 1644",
    background: "#7a1f1f",
    accent: "#e8b64c",
    textColor: "#fbf1e1",
    signature: "Aoqun",
    description:
      "Ming women's dress is usually described as a jacket and pleated skirt known as the aoqun, with the mamianqun skirt a popular style. Embroidered rank badges showed an official's position, and the Met's Ming essay includes a 15th-century silk badge with a lion. A court Bureau of Design set uniform standards of decoration for imperial textiles, ceramics, metalwork and lacquer.",
    context:
      "The Ming re-established a Chinese ruling house after Mongol Yuan rule, and its court set the style.",
    hotspots: [
      {
        x: 48,
        y: 11,
        label: "Topknot",
        text: "The hair is gathered into a tall bun on top of the head, held by a band with a small flower ornament.",
      },
      {
        x: 46,
        y: 38,
        label: "Beaded collar piece",
        text: "A decorated piece with strings of beads sits over the chest.",
      },
      {
        x: 44,
        y: 55,
        label: "Waist sash",
        text: "A sash is tied in a bow at the waist, with the ends hanging down the skirt.",
      },
    ],
  },
  {
    name: "Qing",
    image: "assets/images/qing.jpg",
    alt: "Porcelain figure of a bearded man in a lilac robe patterned with clouds and birds, with gilded cuffs, a dark cap and a grey sash.",
    credit:
      "Figure of a Man, Qing dynasty, late 18th century. Porcelain painted in overglaze polychrome enamels (Jingdezhen ware). The Metropolitan Museum of Art, Purchase by subscription, 1879 (79.2.69). Public Domain.",
    dates: "1644 to 1912",
    background: "#1f3a5f",
    accent: "#c9a7e0",
    textColor: "#f4f1ea",
    signature: "Changpao",
    description:
      "The Manchu changpao was a full-length robe, worn with a jacket or vest. Its sleeves ended in horse-hoof cuffs, a design that recalls the Manchu horse-riding past. A strict dress code, enforced until 1911, marked rank: yellow was the imperial colour, officials wore blue, and splits in the robe were reserved for nobility. Hairstyle was part of the system too, with the queue the best-known example.",
    context:
      "Manchu rulers made their own dress the official style of the court, using it to build a distinct Manchu identity.",
    hotspots: [
      {
        x: 48,
        y: 18,
        label: "Dark cap",
        text: "He wears a dark, rounded cap with a small gold decoration at the front.",
      },
      {
        x: 49,
        y: 49,
        label: "Clouds and birds",
        text: "The lilac robe is painted all over with a pattern of clouds and birds.",
      },
      {
        x: 58,
        y: 56,
        label: "Gilded cuffs",
        text: "The sleeves end in gilded cuffs that curve out around the hands.",
      },
    ],
  },
];

let currentIndex = 0;

  

// Watches the cards inside #eras. A card counts as visible when 60% of it is in the viewport.
// When a card becomes visible, onCardVisible() is called.
const observer = new IntersectionObserver(onCardVisible, {
  root: document.getElementById("eras"),
  threshold: 0.6,
});
// Runs when a card enters or leaves view. Only reacts when a card arrives, converts the stored
// text index to a number and calls showEra() with that index.
function onCardVisible(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const index = Number(entry.target.dataset.index);
      showEra(index);
    }
  });
}

// Creates one card per era and adds it to the sideways scrolling container.
// Each card gets its array position in data-index so the observer can tell which era it is.
function buildEras() {
  const container = document.getElementById("eras");

  eras.forEach((era, i) => {
    const section = document.createElement("section");
    section.dataset.index = i;
    const heading = document.createElement("h2");
    const dates = document.createElement("p");
    const signature = document.createElement("p");
    const description = document.createElement("p");
    const context = document.createElement("p");
    heading.textContent = era.name;
    section.appendChild(heading);
    dates.textContent = era.dates;
    section.appendChild(dates);
    signature.textContent = "Signature garment: " + era.signature;
    signature.className = "era-signature"; // styled in the CSS
    section.appendChild(signature);
    description.textContent = era.description;
    section.appendChild(description);
    context.textContent = era.context;
    section.appendChild(context);
    observer.observe(section);
    container.appendChild(section);
  });
}
const eraImage = document.getElementById("era-image");
const eraCredit = document.getElementById("stage-credit");




// Draws the clickable dots for an era on top of the photo. Clicking a dot highlights it
// and shows its note in a small box next to it.
function showHotspots(era) {
  const note = document.getElementById("hotspot-note");
  const frame = document.getElementById("era-image-container");
  note.textContent = ""; // clear the previous era's note
  frame.querySelectorAll(".hotspot").forEach((dot) => dot.remove());
era.hotspots.forEach((spot) => {
  const dot = document.createElement("button");
  dot.classList.add("hotspot");
  dot.style.left = spot.x + "%";
  dot.style.top = spot.y + "%";
  dot.setAttribute("aria-label", spot.label);
  frame.appendChild(dot);
  dot.addEventListener("click", () => {
    // Clicking the dot that is already open closes it again.
    const wasOpen = dot.classList.contains("active");

    if (wasOpen) {
      note.textContent = "";
    } else {
      note.textContent = spot.label + ": " + spot.text;
      note.style.left = spot.x + "%";
      note.style.top = spot.y + "%";
      // Dots in the right half open the box to their left so it stays on the photo.
      note.classList.toggle("flip", spot.x > 55);
    }

    // Only the clicked dot stays highlighted, and none if it was just closed.
    frame.querySelectorAll(".hotspot").forEach((d) => {
      d.classList.toggle("active", d === dot && !wasOpen);
    });

});
  });
}

// Updates the photo panel (image, caption and credit) to match the era at the given index.
// Called by onCardVisible() when a card enters view.
function showEra(index) {
  const era = eras[index];
  currentIndex = index;
  eraImage.src = era.image;
  eraImage.alt = era.alt;
  showHotspots(era);
  eraCredit.textContent = era.credit;
  document.body.style.setProperty("--bg", era.background);
  document.body.style.setProperty("--accent", era.accent);
document.body.style.setProperty("--text", era.textColor);
document.querySelectorAll("#eras section").forEach((card, i) => {card.classList.toggle("active", i === index);});
document.querySelectorAll("#era-dots button").forEach((dot, i) => {dot.classList.toggle("active", i === index);});


}

document.getElementById("next-era").addEventListener("click", () => {
  goToEra(currentIndex + 1);
});
document.getElementById("prev-era").addEventListener("click", () => {
  goToEra(currentIndex - 1);
});


function goToEra(index) {
  if (index >= 0 && index < eras.length) {
    const timeline = document.getElementById("timeline");
    const scrollable = timeline.offsetHeight - window.innerHeight;
    const progress = index / (eras.length - 1);
    window.scrollTo({
      top: timeline.offsetTop + progress * scrollable,
      behavior: "smooth",
    });
  }
}

function buildDots() {
  eras.forEach((era, i) => {
    const dot = document.createElement("button");
    dot.classList.add("dot");
    dot.setAttribute("aria-label", era.name);
    dot.addEventListener("click", () => goToEra(i));
    document.getElementById("era-dots").appendChild(dot);
  });
}

function updateStrip() {
  const timeline = document.getElementById("timeline");
  const rect = timeline.getBoundingClientRect();
const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
  const strip= document.getElementById("eras");
strip.scrollLeft = progress * (strip.scrollWidth - strip.clientWidth);
document.getElementById("era-nav").classList.toggle("visible", isPinned());
}


function isPinned() {
  const timeline = document.getElementById("timeline");
  const rect = timeline.getBoundingClientRect();
  return rect.top <= 0 && rect.bottom >= window.innerHeight;
rect.top <= 0 && rect.bottom >= window.innerHeight

}

// Left and right arrow keys move between eras, but only while the timeline is on screen.
document.addEventListener("keydown", (event) => {
  if (!isPinned()) return;

  if (event.key === "ArrowRight") {
    goToEra(currentIndex + 1);
  } else if (event.key === "ArrowLeft") {
    goToEra(currentIndex - 1);
  }
});



// Moves the strip sideways whenever the page scrolls.
window.addEventListener("scroll", updateStrip);

buildEras();
buildDots();
showEra(0);
updateStrip();
