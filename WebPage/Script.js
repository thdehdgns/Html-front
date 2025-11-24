function Main2page() {
    location.href = "Main2.html";
}
function Main1page() {
    location.href = "index.html";
}
function Loginpage() {
    location.href = "Login.html";
}

const imageArray = [
    './image/ori.jpg',
    './image/silksong.png',
    './image/minecraft.png'

];
let currentIndex = 0;

const headImg = document.getElementById('headimg');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const imageBox = document.querySelector('.image-box');

function setImage() {
    if (!headImg) return;
    headImg.style.opacity = 0;
    setTimeout(() => {
        headImg.src = imageArray[currentIndex];
    }, 100);
}

function moveIndex(direction) {
    if (!headImg) return;
    if (direction === 'next') {
        currentIndex = (currentIndex + 1) % imageArray.length;
    } else if (direction === 'prev') {
        currentIndex = (currentIndex - 1 + imageArray.length) % imageArray.length;
    }
    setImage();
}

if (nextBtn && prevBtn && headImg) {
    nextBtn.addEventListener('click', () => moveIndex('next'));
    prevBtn.addEventListener('click', () => moveIndex('prev'));
    setImage();
}

if (headImg) {
    headImg.addEventListener('load', () => {
        headImg.style.opacity = 1;
    });
}

// Drag / swipe support
let isDragging = false;
let startX = 0;

function getClientX(e) {
    if (e.touches && e.touches.length) return e.touches[0].clientX;
    return e.clientX;
}

function onDragStart(e) {
    if (!imageBox) return;
    isDragging = true;
    startX = getClientX(e);
    imageBox.classList.add('dragging');
}

function onDragMove(e) {
    if (!isDragging) return;
    const currentX = getClientX(e);
    const delta = currentX - startX;
    if (Math.abs(delta) > 60) {
        isDragging = false;
        if (imageBox) imageBox.classList.remove('dragging');
        moveIndex(delta < 0 ? 'next' : 'prev');
    }
}

function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    if (imageBox) imageBox.classList.remove('dragging');
}

if (imageBox) {
    imageBox.addEventListener('mousedown', onDragStart);
    imageBox.addEventListener('mousemove', onDragMove);
    imageBox.addEventListener('mouseup', onDragEnd);
    imageBox.addEventListener('mouseleave', onDragEnd);

    imageBox.addEventListener('touchstart', onDragStart, { passive: true });
    imageBox.addEventListener('touchmove', onDragMove, { passive: true });
    imageBox.addEventListener('touchend', onDragEnd);
}

