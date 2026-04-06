(function () {
  var asterisk = document.getElementById('asterisk');
  var h1 = document.querySelector('h1');
  var pos, minX, maxX, dir = 1;

  function init() {
    var h1Rect = h1.getBoundingClientRect();
    minX = h1Rect.right + 8;
    maxX = window.innerWidth - 20;
    if (pos === undefined) pos = minX;
    pos = Math.min(Math.max(pos, minX), maxX);
    asterisk.style.left = pos + 'px';
  }

  window.addEventListener('load', function () {
    init();
    window.addEventListener('resize', init);
    setInterval(function () {
      pos += dir * 12;
      if (pos >= maxX) { pos = maxX; dir = -1; }
      if (pos <= minX) { pos = minX; dir = 1; }
      asterisk.style.left = pos + 'px';
    }, 200);
  });
})();
