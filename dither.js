(function () {
  // 8x8 Bayer matrix values (0-63), normalized to 0-1
  var bayer8 = [
    [ 0, 32,  8, 40,  2, 34, 10, 42],
    [48, 16, 56, 24, 50, 18, 58, 26],
    [12, 44,  4, 36, 14, 46,  6, 38],
    [60, 28, 52, 20, 62, 30, 54, 22],
    [ 3, 35, 11, 43,  1, 33,  9, 41],
    [51, 19, 59, 27, 49, 17, 57, 25],
    [15, 47,  7, 39, 13, 45,  5, 37],
    [63, 31, 55, 23, 61, 29, 53, 21]
  ];
  var M = 8;
  for (var i = 0; i < M; i++)
    for (var j = 0; j < M; j++)
      bayer8[i][j] = bayer8[i][j] / 64;

  var PIXEL = 3; // size of each dither "pixel" block

  function drawDither(canvas) {
    var footer = canvas.parentElement;
    canvas.width = footer.offsetWidth;
    canvas.height = footer.offsetHeight;
    var ctx = canvas.getContext('2d');
    var w = canvas.width;
    var h = canvas.height;

    for (var y = 0; y < h; y += PIXEL) {
      for (var x = 0; x < w; x += PIXEL) {
        // t goes from 1 (white) at top to 0 (black) partway down
        var t = 1 - Math.min(y / (h * 0.6), 1);
        var bx = Math.floor(x / PIXEL) % M;
        var by = Math.floor(y / PIXEL) % M;
        ctx.fillStyle = t > bayer8[by][bx] ? '#ffffff' : '#000000';
        ctx.fillRect(x, y, PIXEL, PIXEL);
      }
    }
  }

  window.addEventListener('load', function () {
    var footer = document.querySelector('footer');
    if (!footer) return;
    var canvas = document.createElement('canvas');
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    footer.appendChild(canvas);
    drawDither(canvas);
    window.addEventListener('resize', function () { drawDither(canvas); });
  });
})();
