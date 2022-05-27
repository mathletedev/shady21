"use strict";
var _a;
let board = document.querySelector("#board");
const SIZE = 21;
const COLORS = {
    black: "#282c34",
    white: "#dcdfe4",
    red: "#e06c75",
    blue: "#61afef"
};
let state = new Array(SIZE).fill(0);
let turn = Math.random() < 0.5 ? 1 : -1;
for (let i = 0; i < SIZE; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.addEventListener("mouseenter", () => hover(i, true));
    tile.addEventListener("mouseleave", () => hover(i, false));
    tile.addEventListener("click", () => select(i, enabled ? 1 : turn));
    board.appendChild(tile);
}
let enabled = (_a = prompt("Enable AI moves? (y/n)")) === null || _a === void 0 ? void 0 : _a.toLowerCase().startsWith("y");
const select = (i, p) => {
    if (i === SIZE - 1)
        i = SIZE - 2;
    if (turn !== p || !valid(i))
        return;
    state[i] = p;
    state[i + 1] = p;
    update();
    if (full())
        alert(`${enabled
            ? turn === 1
                ? "Player"
                : "Computer"
            : `${turn === 1 ? "Blue" : "Red"} player`} won!`);
    turn *= -1;
    if (enabled && turn === -1)
        ai();
};
const valid = (i) => state[i] === 0 && state[i + 1] === 0;
const full = () => {
    for (let i = 0; i < SIZE - 1; i++)
        if (valid(i))
            return false;
    return true;
};
const hover = (i, o) => {
    if (i === SIZE - 1)
        i = SIZE - 2;
    if (!valid(i))
        return;
    const c = COLORS[o ? (enabled || turn === 1 ? "blue" : "red") : "black"];
    set(i, c);
    set(i + 1, c);
};
const set = (i, c) => (board.children[i].style.backgroundColor = c);
const update = () => {
    for (let i = 0; i < board.children.length; i++)
        set(i, COLORS[state[i] === 0 ? "black" : state[i] === 1 ? "blue" : "red"]);
};
const ai = () => {
    let best = -Infinity;
    let move = 0;
    for (let i = 0; i < SIZE - 1; i++) {
        if (valid(i)) {
            state[i] = -1;
            state[i + 1] = -1;
            let score = minimax(1);
            if (score > best) {
                best = score;
                move = i;
            }
            state[i] = 0;
            state[i + 1] = 0;
        }
    }
    select(move, -1);
};
const minimax = (t) => {
    if (full())
        return t;
    let best = Infinity * t;
    for (let i = 0; i < SIZE - 1; i++) {
        if (valid(i)) {
            state[i] = t;
            state[i + 1] = t;
            best =
                t === -1 ? Math.max(best, minimax(1)) : Math.min(best, minimax(-1));
            state[i] = 0;
            state[i + 1] = 0;
        }
    }
    return best;
};
if (enabled && turn === -1)
    select(0, -1);
