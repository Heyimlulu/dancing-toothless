(function titleScroller(text) {
  document.title = text;
  setTimeout(function () {
    titleScroller(text.substring(1) + text.substring(0, 1));
  }, 300);
})(" Toothless - How to Train Your Dragon 🐲 ");
