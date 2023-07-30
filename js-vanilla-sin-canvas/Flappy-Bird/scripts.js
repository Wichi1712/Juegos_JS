const player = document.getElementById("player")

const pipeContainer = document.getElementById("pipeContainer")
const upperPipe = document.getElementById("upperPipe")
const bottonPipe = document.getElementById("bottonPipe");

let speed = 4;

pipeContainer.addEventListener("animationiteration", () => {
    setRandomHoleSize();

});

document.addEventListener("DOMContentLoaded", () => {
    player.style.left = "33%";
    player.style.setProperty('top', 'calc(50% - 50px)');
});

function setRandomHoleSize() {
    const availableHeight = innerHeight - 300;

    const bottonHeight = Math.floor(Math.random() * (availableHeight + 1))

    bottonPipe.style.height = `${bottonHeight}px`;

    const upperHeight = availableHeight - bottonHeight;
    upperPipe.style.height = `${upperHeight}px`;
}

function step() {
    if (speed < 4) {
        speed += 0.1;
    }
    const newPlayerTop = player.offsetTop + speed;
    player.style.top = `${newPlayerTop}px`
    if (isLost()) {
        pipeContainer.style.animationPlayState = 'paused';
    }
    else {
        requestAnimationFrame(step);
    }
}

document.addEventListener("click", function () {
    speed = -4;
})

requestAnimationFrame(step);

function isLost() {

    const isTouchLeft = player.offsetLeft >= pipeContainer.offsetLeft - player.clientWidth;

    const offsetRightPipe = (pipeContainer.offsetLeft + 2 * player.clientWidth);

    const behind = offsetRightPipe < player.offsetLeft;

    const isColumnLine = isTouchLeft && !behind;

    if (!isColumnLine) return false;

    const touchingTop = player.offsetTop <= upperPipe.offsetHeight;

    const touchingBotton = player.offsetTop <= bottonPipe.offsetHeight;

    return (touchingTop || touchingBotton);
}