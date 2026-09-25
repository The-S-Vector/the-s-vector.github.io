// ============================================================
// theme.js — makes the "Dark / Light" button in the header work.
// ------------------------------------------------------------
// This file is written as a small lesson, not just working code.
// If you don't know JavaScript yet, read every comment — each one
// explains a concept, not just what the line does.
//
// The big picture, in one sentence: the button flips an attribute
// on the page's root <html> tag between data-theme="light" and
// data-theme="dark", and style.css already knows how to color the
// page differently depending on that attribute (see style.css,
// section 1). This file's only job is: read the current state,
// flip it, remember it, done.
// ============================================================


// --- Concept: waiting for the page to be ready -------------
// A browser starts running <script> tags the instant it reaches
// them while still reading the HTML top-to-bottom. If our script
// tried to find the button before the browser had even read the
// line of HTML that creates the button, it would fail to find it.
//
// `document` is the browser's in-memory model of the whole page.
// `addEventListener` means "call this function later, when a
// certain thing happens" — here, the thing is the "DOMContentLoaded"
// event, which fires once the browser has finished reading all the
// HTML. The function we pass in (everything between `function () {`
// and the matching `});` at the very end of this file) only runs
// at that point, so it's now safe to look for the button.
document.addEventListener("DOMContentLoaded", function () {

  // --- Concept: variables ------------------------------------
  // `var button = ...` creates a named box called "button" and
  // puts something inside it, so we can refer to that thing later
  // just by writing its name instead of re-fetching it every time.
  //
  // `document.getElementById("theme-toggle")` searches the whole
  // page for one element whose HTML has `id="theme-toggle"` — that
  // id is what connects this script to a specific <button> tag in
  // each page's HTML. If no such element exists, this returns
  // `null` (JavaScript's way of saying "nothing here").
  var button = document.getElementById("theme-toggle");

  // --- Concept: guard clause ----------------------------------
  // `if (!button) return;` reads as: "if button is null (the `!`
  // flips true/false, so `!button` means 'button is missing'),
  // stop running this function right now." This just protects
  // against a typo'd id — in normal use every page has the button,
  // so this line never actually triggers.
  if (!button) return;

  // --- Concept: a function that returns a value ---------------
  // `function currentTheme() { ... }` defines a small, reusable
  // recipe named "currentTheme". Nothing runs yet — defining a
  // function is like writing a recipe card, not cooking the meal.
  // It only executes when we later write `currentTheme()` (with
  // parentheses) elsewhere in this file.
  function currentTheme() {

    // `document.documentElement` is the page's <html> tag itself.
    // `.getAttribute("data-theme")` reads whatever value that tag's
    // data-theme="..." attribute currently holds — "light", "dark",
    // or `null` if the attribute isn't set at all yet (e.g. a first
    //-time visitor whose browser hasn't chosen anything manually).
    var chosen = document.documentElement.getAttribute("data-theme");

    // If the visitor (or a previous visit) already picked a theme,
    // trust that and hand it back immediately. `return` exits the
    // function with this value as the answer.
    if (chosen === "light" || chosen === "dark") return chosen;

    // Otherwise, nobody has chosen manually yet, so fall back to
    // asking the OS/browser what it prefers. `window.matchMedia(...)`
    // checks a CSS media query from JavaScript — the exact same
    // `prefers-color-scheme: dark` query used in style.css.
    // `.matches` is `true` or `false`.
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // --- Concept: ternary shorthand for if/else -----------------
    // `condition ? a : b` means "if condition is true, use a,
    // otherwise use b" — it's a compact one-line if/else that
    // produces a value instead of running separate statements.
    return prefersDark ? "dark" : "light";
  }

  // A small helper so the button's own text always matches reality
  // (shows the theme you'd switch TO, not the one you're currently in —
  // that's the usual convention for a toggle button's label).
  function updateButtonLabel() {
    button.textContent = currentTheme() === "dark" ? "☀ Light" : "☾ Dark";
  }

  // Set the correct label immediately when the page loads, before
  // anyone has clicked anything.
  updateButtonLabel();

  // --- Concept: event listener on a click -------------------
  // Same pattern as DOMContentLoaded above, but this time the event
  // we're waiting for is a mouse click (or tap) on `button`. The
  // function we hand over here runs every time — and only when —
  // that click happens. Nothing here runs on a timer or in a loop.
  button.addEventListener("click", function () {

    // Figure out what we're switching AWAY from, then pick the
    // opposite as the new theme.
    var next = currentTheme() === "dark" ? "light" : "dark";

    // --- Concept: mutating the page -----------------------------
    // `setAttribute("data-theme", next)` writes data-theme="dark"
    // (or "light") onto the <html> tag right now. The moment this
    // runs, style.css's `:root[data-theme="dark"]` rule (or the
    // light one) starts applying — that's the entire mechanism
    // that repaints the page. This file never touches colors itself.
    document.documentElement.setAttribute("data-theme", next);

    // --- Concept: localStorage -----------------------------------
    // `localStorage` is a tiny key-value storage box the browser
    // keeps per-website, that survives closing the tab and coming
    // back later. `.setItem("theme", next)` saves our choice under
    // the key "theme" so the inline script in <head> (see any page's
    // <head>, a few lines before this file is loaded) can read it
    // back on the very next page load, before the page even paints —
    // that's what stops the "flash of the wrong theme" on navigation.
    localStorage.setItem("theme", next);

    // Refresh the button text to match the new state.
    updateButtonLabel();
  });

});
