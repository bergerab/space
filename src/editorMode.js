const { renderBackground, renderDot, renderConnector, renderConnectors } = require('./render'),
      Vec2 = require('./vec2'),
      { makeMode } = require('./mode');

let mousePos = null,
    mouseDragPos = new Vec2(), // position where the drag initiated
    dragging = false;

function snapToNearestConnector(game, v) {
    for (const connector of game.connectors) {
        if (Vec2.distance(connector.p1, v) < 20) {
            v = connector.p1;
        }
        if (Vec2.distance(connector.p2, v) < 20) {
            v = connector.p2;
        }
    }
    return v;
}

function makeEditorMouseDown(game) {
    return function (e) {
        if (mousePos !== null) { // make sure we have had a mouseMove event first
            dragging = true;
            mouseDragPos = new Vec2(e.x, e.y);

        }
    };
}

function makeEditorMouseUp(game) {
    return function (e) {
        if (dragging) {
            if (Vec2.distance(mouseDragPos, mousePos) > 10) {
                makeConnector(game, mouseDragPos.clone(), mousePos.clone());
            }
            
            dragging = false;
            mouseDragPos = new Vec2();
        }
    };
}

function makeEditorClick(game) {
    return function (e) {

    };
}

function makeEditorMouseMove(game) {
    return function (e) {
        if (mousePos === null) {
            mousePos = new Vec2();
        }
        mousePos.x = e.x;
        mousePos.y = e.y;

        if (e.shiftKey) {
            mousePos = mousePos.roundTo(20);
            mouseDragPos = mouseDragPos.roundTo(20);
            mouseDragPos = snapToNearestConnector(game, mouseDragPos).clone();
            mousePos = snapToNearestConnector(game, mousePos).clone();
        }
    };
}

function makeConnector(game, p1, p2) {
    game.connectors.push({
        p1, p2
    });
}

makeMode('editor', function (game) {
    game.editorClick = makeEditorClick(game);
    game.connectors = [];
    game.mouseDown = makeEditorMouseDown(game);
    game.mouseUp = makeEditorMouseUp(game);
    game.mouseMove = makeEditorMouseMove(game);
    
    window.addEventListener('click', game.editorClick);
    window.addEventListener('mousemove', game.mouseMove);
    window.addEventListener('mousedown', game.mouseDown);
    window.addEventListener('mouseup', game.mouseUp);
}, function (game) {
    window.removeEventListener('click', game.editorClick);
    window.removeEventListener('mousemove', game.mouseMove);
    window.removeEventListener('mousedown', game.mouseDown);
    window.removeEventListener('mouseup', game.mouseUp);
    game.map = game.connectors;
    delete game.connectors;
}, function (game, dTime) {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    renderBackground(game.ctx, game.canvas.width, game.canvas.height);

    if (mousePos !== null) {
        if (dragging) {
            renderConnector(game.ctx, mouseDragPos, mousePos, { r: 5 });
        } else {
            renderDot(game.ctx, mousePos, { r: 5, color: 'cyan' });
        }
    }

    renderConnectors(game.ctx, game.connectors);
});
