const modes = {};
function makeMode(name, init, deinit, update) {
    modes[name] = {
        name, init, deinit, update
    };
}

function selectMode(game, newMode) {
    if (game.mode) {
        modes[game.mode.name].deinit(game);
    }
    modes[newMode].init(game);
    game.mode = getMode(newMode);
}

function getMode(name) {
    return modes[name];
}

Object.assign(module.exports, {
    getMode,
    selectMode,
    makeMode
});

require('./playMode');
require('./editorMode');

