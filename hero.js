/* Hero: plays the "empty lot -> open for business" video once, syncs captions to it,
   then reveals the headline. Falls back to a still image if video can't autoplay. */
(function () {
  var hero = document.getElementById("top");
  var v = document.getElementById("heroVideo");
  if (!hero || !v) return;
  var capEl = document.getElementById("heroCapText");
  var prog = document.getElementById("heroProg");

  // [start second, caption]. The colour reveal in the video happens at about 7.1s.
  var CAPS = [
    [0,   "Every brand starts as an empty lot."],
    [2.1, "We lay the foundation."],
    [3.9, "Raise the structure."],
    [5.7, "Put the roof on it."]
  ];
  var REVEAL = 7.1;
  var done = false, current = -1;

  function finish(staticImage) {
    if (done) return; done = true;
    if (staticImage) hero.classList.add("is-static");
    hero.classList.add("is-done");
  }

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) { v.pause(); finish(true); return; }

  function setCap(i) {
    if (i === current) return; current = i;
    capEl.classList.add("out");
    setTimeout(function () { capEl.textContent = CAPS[i][1]; capEl.classList.remove("out"); }, 250);
  }

  function tick() {
    if (done) return;
    var t = v.currentTime || 0;
    var idx = 0;
    for (var i = 0; i < CAPS.length; i++) if (t >= CAPS[i][0]) idx = i;
    setCap(idx);
    if (v.duration && prog) prog.style.width = Math.min(100, (t / v.duration) * 100) + "%";
    if (t >= REVEAL) { finish(false); return; }
    requestAnimationFrame(tick);
  }

  v.addEventListener("playing", function () { requestAnimationFrame(tick); });
  v.addEventListener("ended", function () { finish(false); });
  v.addEventListener("error", function () { finish(true); });

  // If autoplay is blocked (e.g. iPhone Low Power Mode) or the video stalls, show the finished state.
  var p = v.play();
  if (p && p.catch) p.catch(function () { finish(true); });
  setTimeout(function () { if (!done && (v.currentTime || 0) < 0.3) finish(true); }, 4500);
})();
