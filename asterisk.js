(function () {
  var asteriskRight = document.getElementById('asterisk-right');
  var asteriskLeft  = document.getElementById('asterisk-left');
  var logo = document.querySelector('.nav-logo');
  var row  = document.querySelector('.nav-name-row');

  var posR, posL;
  var minR, maxR, minL, maxL;
  var dirR = 1, dirL = -1;

  function init() {
    var logoRect = logo.getBoundingClientRect();
    var rowRect  = row.getBoundingClientRect();

    minR = logoRect.right - rowRect.left + 8;
    maxR = rowRect.width - 24;
    minL = 8;
    maxL = logoRect.left - rowRect.left - 24;

    if (posR === undefined) posR = minR;
    if (posL === undefined) posL = maxL;

    posR = Math.min(Math.max(posR, minR), maxR);
    posL = Math.min(Math.max(posL, minL), maxL);

    asteriskRight.style.left = posR + 'px';
    asteriskLeft.style.left  = posL + 'px';
  }

  window.addEventListener('load', function () {
    init();
    asteriskRight.style.visibility = 'visible';
    asteriskLeft.style.visibility  = 'visible';
    window.addEventListener('resize', init);
    setInterval(function () {
      posR += dirR * 12;
      if (posR >= maxR) { posR = maxR; dirR = -1; }
      if (posR <= minR) { posR = minR; dirR =  1; }
      asteriskRight.style.left = posR + 'px';

      posL += dirL * 12;
      if (posL >= maxL) { posL = maxL; dirL = -1; }
      if (posL <= minL) { posL = minL; dirL =  1; }
      asteriskLeft.style.left = posL + 'px';
    }, 200);
  });
})();
