const { getMode, selectMode } = require('./mode');

const canvas = document.getElementById('screen'),
      ctx = canvas.getContext('2d'),
      game = {
          canvas,
          ctx,
          mode: getMode('play'),
      };

let time = new Date();


function init(game) {
    game.mode.init(game);
}

init(game);

function loop() {
    const dTime = new Date() - time;
    game.mode.update(game, dTime);
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

window.addEventListener('keydown', function (e) {
    switch (e.key) {
    case 'p':
        selectMode(game, 'play');
        break;
    case 'e':
        selectMode(game, 'editor');
        break;
    }
});
