(function () {
  "use strict";

  // Mark JS availability so reveal styles only apply when JS runs.
  document.documentElement.classList.add("js");

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    for (var i = 0; i < revealEls.length; i++) {
      revealEls[i].classList.add("in");
    }
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  for (var j = 0; j < revealEls.length; j++) {
    observer.observe(revealEls[j]);
  }

  // Safety net: if anything is still hidden after 3 seconds, show it.
  window.setTimeout(function () {
    var remaining = document.querySelectorAll(".reveal:not(.in)");
    for (var k = 0; k < remaining.length; k++) {
      remaining[k].classList.add("in");
    }
  }, 3000);
})();
