// ============================================================
// filter.js — powers the "All / Astro / Landscape / ..." buttons
// on the photo showcase page. Same spirit as ../theme.js: nothing
// runs until you click a button, no loops, no timers.
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

  // --- Concept: querySelectorAll -----------------------------
  // `document.querySelectorAll(".filter-btn")` finds EVERY element
  // on the page matching that CSS selector and hands back a list
  // of them (a NodeList — you can loop over it like an array).
  var buttons = document.querySelectorAll(".filter-btn");
  var photoCards = document.querySelectorAll(".photo-card");

  // Nothing to do if this page has no filter bar / no photos yet.
  if (buttons.length === 0 || photoCards.length === 0) return;

  // --- Concept: looping with forEach --------------------------
  // `.forEach(function (item) { ... })` runs the function once for
  // every item in the list. Here we attach one click listener to
  // each button — but the listener function itself only runs later,
  // when that specific button is actually clicked.
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {

      // --- Concept: reading a data-* attribute -----------------
      // Every filter button's HTML has something like
      // data-filter="astro". `.dataset.filter` reads that value
      // back as a plain JS string ("astro"). This is the standard
      // way to attach small bits of information to HTML elements
      // for JS to read later, without inventing custom attributes.
      var chosenFilter = button.dataset.filter;

      // Update which button LOOKS active — remove .active from
      // all of them first, then add it back only to the one clicked.
      buttons.forEach(function (b) { b.classList.remove("active"); });
      button.classList.add("active");

      // Show/hide each photo depending on whether it carries the
      // chosen tag. Every .photo-card has data-tags="astro,night"
      // (comma-separated) — .split(",") turns that string into an
      // array like ["astro", "night"] so we can check membership
      // with .includes(...).
      photoCards.forEach(function (card) {
        var tags = card.dataset.tags.split(",");
        var matches = chosenFilter === "all" || tags.includes(chosenFilter);

        // --- Concept: the `hidden` attribute ---------------------
        // Every HTML element has a built-in `.hidden` property.
        // Setting it to `true` is the same as adding the `hidden`
        // attribute in the HTML — the browser stops rendering the
        // element entirely (equivalent to `display:none`), no CSS
        // class needed. Setting it to `false` shows it again.
        card.hidden = !matches;
      });
    });
  });

});
