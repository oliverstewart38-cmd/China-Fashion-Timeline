# Chinese Dress Through Time

## About the site

The website is an interactive timeline exploring how Chinese clothing changed across four dynasties: Han, Tang, Ming and Qing. The focus is on how politics, trade and conquest shaped what people wore in each period.

After the landing page, the timeline section pins in place. As you scroll down, the era cards slide sideways, and the photo, colours and credit change to match each era. Each photo has a few dots you can click to read about a detail of the clothing, like the crossed collar on the Han figure or the cuffs on the Qing robe. You can also move between eras with the arrow buttons, the dots under the cards, or the left and right arrow keys. The page finishes with a short section on Tang China's links with Japan, a note on what came after the Qing, and the sources.

I chose to use a timeline as it made sense for exploring fashion through time. Scrolling through the eras in order while pinning the photo and sliding the text meant you could keep looking at the clothing while reading about it.

## How it's built

- `index.html` has the page structure: the opening screen, the empty timeline containers, the Japan and closing sections, and the sources.
- `index.css` has all the styling and layout, including the sticky timeline, the era colours (as CSS variables) and the hotspot dots and notes.
- `index.js` has the data for all four eras and the code that builds the cards and dots, moves the strip on scroll, swaps the photo and colours, and draws the hotspots.
- `assets/images/` has the four museum photos.

## The JavaScript

### The eras data and buildEras()

All four eras are stored in an array of objects. I used `buildEras()` to loop over it with `forEach` and create a card for each era with `createElement`, `textContent` and `appendChild`. I chose to do it this way because it keeps all the information organised in one place, so eras could be added or removed without having to update significant parts of the code. It also means less repetition in the HTML, since the card structure is only written once.

One downside is that the content is stored in the JS file, so if the JavaScript didn't run there would be no timeline at all. To fix this I could add a `<noscript>` fallback to allow the content to show if the JS breaks.

### Scrolling the timeline (updateStrip and goToEra)

```js
const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
strip.scrollLeft = progress * (strip.scrollWidth - strip.clientWidth);
```

`rect.top` is the top of `#timeline` compared to the top of the screen. As you scroll past it, it becomes negative, so `-rect.top` is how far you've scrolled into it. `rect.height - window.innerHeight` is the total distance that can be scrolled while the panel is pinned, which is 300vh (400vh minus one screen). Dividing one by the other gives the progress. `Math.min` and `Math.max` clamp the number so it can't go below 0 before the user reaches the timeline, or above 1 after they've passed it.

`strip.scrollWidth - strip.clientWidth` is the total distance the strip can scroll horizontally, so multiplying it by the progress moves it the same fraction of the way.

The idea is similar to how a library like GSAP ScrollTrigger works, but instead of the library doing it, I calculate the progress manually in `updateStrip()`. I used Claude to help work out the maths and check that it added up correctly.

```js
function goToEra(index) {
  if (index >= 0 && index < eras.length) {
    currentIndex = index;
    const timeline = document.getElementById("timeline");
    const scrollable = timeline.offsetHeight - window.innerHeight;
    const progress = index / (eras.length - 1);
    window.scrollTo({
      top: timeline.offsetTop + progress * scrollable,
      behavior: "smooth",
    });
  }
}
```

`goToEra()` does the same maths as `updateStrip()`, but in reverse. It changes an era number into a progress value with `index / (eras.length - 1)`, works out the page position that matches it, and scrolls there with `window.scrollTo`. As it only changes the page scroll, `updateStrip()` still does the sideways movement, so the buttons, dots and arrow keys all line up with normal scrolling. The `if` statement stops it going past the first or last era.

One weakness is that `updateStrip()` runs on every scroll event, which can fire many times a second, and it measures the timeline with `getBoundingClientRect()` each time, which could make scrolling less smooth on slower devices. The 400vh height is also hard coded in the CSS for four eras, so adding an era means remembering to change it. To fix these I could wrap `updateStrip()` in `requestAnimationFrame` so it only runs once per frame, and set the timeline's height from `eras.length` in the JavaScript.

### Working out which era is showing (IntersectionObserver)

`IntersectionObserver` watches the cards inside `#eras` and calls `showEra()` when 60% of a card is inside the visible strip. Rather than measuring every card's position on every scroll event, this lets the browser only report back when the visibility actually changes. It is also connected to what the user actually sees, so the photo and colours only change when the card is on screen.

One downside I found in testing is that if you double click the arrow quickly, it only moves one era instead of two. This is because `currentIndex` only updates when the observer fires, which happens during the scroll, so the second click is still using the old index and scrolls to the same era. To fix this, I added `currentIndex = index;` inside `goToEra()`, so the index updates as soon as a button is clicked instead of waiting for the observer. After this change, double clicking moves two eras as expected.

### Changing the colours (showEra and CSS variables)

`showEra()` sets `--bg`, `--accent` and `--text` on the body with `style.setProperty`. The CSS uses these through `var()`, and a `transition` on the body fades the background and text colours between eras, allowing the whole page to change to match the era being shown. This keeps the JavaScript deciding which era is active and the CSS deciding how it looks.

When I checked the colours, I found the prev/next buttons were hard to see on some eras, for example dark arrows on a brown button for Tang. They used the text colour on the accent colour, which was below the 3:1 contrast WCAG asks for on Tang, Ming and Qing. I changed the arrows to use the background colour instead, which fixed it.

### The hotspots (showHotspots)

```js
era.hotspots.forEach((spot) => {
  const dot = document.createElement("button");
  dot.classList.add("hotspot");
  dot.style.left = spot.x + "%";
  dot.style.top = spot.y + "%";
  dot.setAttribute("aria-label", spot.label);
  frame.appendChild(dot);
```

Each era has a `hotspots` array, where every hotspot has an `x` and `y` position as a percentage of the photo, a label and a note. `showHotspots()` first removes the previous era's dots, then loops over the new ones and creates a `<button>` for each of them, setting `style.left` and `style.top` from the percentages. Because the positions are percentages, the dots stay on the right part of the clothing when the photo resizes.

```js
const wasOpen = dot.classList.contains("active");

if (wasOpen) {
  note.textContent = "";
} else {
  note.textContent = spot.label + ": " + spot.text;
  note.style.left = spot.x + "%";
  note.style.top = spot.y + "%";
  note.classList.toggle("flip", spot.x > 55);
}
```

When a dot is clicked, it checks whether the dot is open or not. If it is, the note is cleared, and if not, the note gets the hotspot's text and moves to the dot's position. `classList.toggle("flip", spot.x > 55)` makes notes for dots on the right side of the photo open to the left so they don't run off. The CSS hides the note when it's empty with `#hotspot-note:empty`, so clearing the text is enough to close it.

The dots are `<button>` elements with an `aria-label`, allowing them to be used with a keyboard. If the site was going to be made usable on mobile, the dots would be too small according to WCAG 2.2, which suggests at least 24px. The flip also only works for left and right, so if a dot is close to the top or bottom, the note may go off the photo.

### Buttons, dots and arrow keys

The prev/next buttons, the dots and the left and right arrow keys all call `goToEra()`, which has a bounds check so the user can't go past the first or last era. Having all three use one function means they behave consistently and there's less code to maintain.

`isPinned()` checks whether the timeline currently fills the screen:

```js
return rect.top <= 0 && rect.bottom >= window.innerHeight;
```

The nav bar and arrow keys will only show and work when this is true. This was added because the nav bar's position is fixed, so the buttons would float over the screen when the timeline wasn't in view, making it confusing. It also meant clicking or pressing an arrow key would scroll the user back into the timeline. One thing to note is that the `keydown` listener is currently on the whole site, so if another feature that used the same controls was added later, it would clash with them.

## The CSS

I used CSS Grid for the main two-column layouts. `#pin` sits the photo on the left and the era card on the right, and the closing part of the page uses the same heading-left, text-right split so it's consistent with the timeline. The card strip itself (`#eras`) uses Flexbox, with each card set to `flex: 0 0 100%` so it's the exact width of the strip. This is what allows `updateStrip()` to line each era up with the scroll exactly.

Text sizes use `clamp()` for the era headings so they scale with the screen but don't get too small or too big. The colours all come from the three CSS variables that `showEra()` sets, so the landing page matches the first era shown and the end of the page matches the last.

One of the more difficult parts of the CSS was the photo credit. As it was quite long, it kept stretching wider than the photo. To fix it, I made the figure `width: fit-content` and gave the caption `width: 0; min-width: 100%`. This way the caption doesn't count towards the figure's width but still stretches to fill it, so the credit wraps to the width of the photo.

## Problems I ran into

**Changing how the timeline scrolls.** My first version was a sideways strip you scrolled by hand, using `scroll-snap` and `scrollIntoView` to move between eras. When I changed it to a pinned section driven by the normal page scroll, the old navigation fought against the new scroll position, so the buttons and dots stopped lining up. I had to rewrite `goToEra()` to scroll the whole window instead of the strip. I also tried a version where one flick of the mouse wheel moved exactly one card, but I removed it because it took over the mouse wheel and I couldn't fully understand how all of it worked.

**The nav bar pushing the cards over.** The nav bar sits inside `#eras` in the HTML, so even when it was hidden it was taking up a space in the card strip. This pushed every card 2rem to the right and cut off the text. I fixed it by making the nav bar `position: fixed`, so it no longer takes up space in the strip.

**The hotspots spreading across the page.** At one point I gave the photo's figure a `min-content` width, which shrank the box around the photo to the width of a single word. Because the hotspots are positioned as percentages of that box, they spread out across the page instead of sitting on the photo. This is part of why I ended up using the `fit-content` and caption width approach described in the CSS section.

Often the cause of a bug or issue wasn't a line that looked broken, it was typically something around like it where it sat in the HTML or JavaScript.

## What I'd improve

To improve the website, I would make it more responsive and give it a mobile-friendly layout. At the moment the photo and the era cards stay side by side on small screens, which gets cramped, so on phones I would stack the photo above the text. A lot of the sizing also uses `vh` (the photo is `70vh` and the strip is `80vh`), so on short screens the photo, text and buttons can crowd together. On phones, `vh` can also change when the address bar shows or hides, which can make the pinned section jump. Switching to units like `dvh` and `svh would help solve this.


I would also make the hotspots more accessible with bigger dots and the Escape key to close a note. The dots are 16px, which is below the 24px WCAG 2.2 suggests for touch targets, so I would make the clickable area bigger without making the dots look heavier. I would also add `aria-expanded` so screen readers know when a note is open, and a `:focus-visible` style so keyboard users can see which dot they're on.

I could also put the era content in the HTML so the site still has content if the JS doesn't run. Right now `buildEras()` creates all the cards, so without JavaScript the timeline is empty. Having the text in the HTML and using JavaScript to add the scrolling and hotspots on top is how professional sites usually handle this, and it would also help with search engines.

## Use of AI

I used Claude (AI) at several stages of the project. The main use was setting up the project at the start: it created the files in an organised structure, with basic HTML content about the topic, a CSS file with a CSS reset, a blank JS file, the readme and the assets folder for the images. I later adjusted some of that content so it matched the clothing shown in the photos.

As mentioned above, I also used it to help with the maths for the scrolling behaviour, and to research the different ways people build things like scroll effects and hotspots. It also wrote some parts directly, which I reviewed and edited when needed. This included the hotspot positions and notes, the content of each era's object, the formatting of the references, and the formatting of the readme.

I also used it for troubleshooting when something didn't behave as intended. This was usually catching a typo in the code, such as a wrong number or a misplaced bracket.

## Sources

Bissoux, B. (2021, April 21). Japanese fashion through the eras: From Heian to Heisei. *Tokyo Weekender*. https://www.tokyoweekender.com/art_and_culture/japanese-fashion-eras-heian-heisei/

Clydesdale, H. C. (2009, April 1). *Internationalism in the Tang dynasty (618–907)*. Heilbrunn Timeline of Art History, The Metropolitan Museum of Art. https://www.metmuseum.org/essays/internationalism-in-the-tang-dynasty-618-906

Cornell University Library. (n.d.-a). *Eastern and Western intersection of influence*. In *Chinese traditional dress* [Online exhibit]. https://exhibits.library.cornell.edu/chinese-traditional-dress/feature/eastern-and-western-intersection-of-influence

Cornell University Library. (n.d.-b). *Manchu style*. In *Chinese traditional dress* [Online exhibit]. https://exhibits.library.cornell.edu/chinese-traditional-dress/feature/manchu-style

Department of Asian Art. (2000, October 1). *Han dynasty (206 B.C.–220 A.D.)*. Heilbrunn Timeline of Art History, The Metropolitan Museum of Art. https://www.metmuseum.org/essays/han-dynasty-206-b-c-220-a-d

Department of Asian Art. (2002, October 1). *Ming dynasty (1368–1644)*. Heilbrunn Timeline of Art History, The Metropolitan Museum of Art. https://www.metmuseum.org/essays/ming-dynasty-1368-1644

Quilliam, M. (2026, February 18). *Reigning it in: A brief look at horse hoof cuffs*. University of Alberta Museums. https://www.ualberta.ca/en/museums/news/2026/february/reigning-it-in.html

### Images

All four photos are from The Metropolitan Museum of Art's Open Access collection (public domain):

- *Standing court lady* (2nd century BCE). https://www.metmuseum.org/art/collection/search/49902
- *Standing court lady* (late 7th century). https://www.metmuseum.org/art/collection/search/42374
- *Figure of an immortal lady* (16th century). https://www.metmuseum.org/art/collection/search/48673
- *Figure of a man* (late 18th century). https://www.metmuseum.org/art/collection/search/48568

## Code that isn't mine

- CSS reset adapted from "A Modern CSS Reset" by Josh W. Comeau, https://www.joshwcomeau.com/css/custom-css-reset/ (credited at the top of index.css)
