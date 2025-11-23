function Main2page(obj){
    location.href="Main2.html";
    
}
function Main1page(obj){
    location.href="Main1.html";
    
}
function Loginpage(obj){
    location.href="Login.html";
    
}

const imageArray = [
    './image/ori.jpg', 
    './image/silksong.png'  
];
let currentIndex = 0;

const headImg = document.getElementById('headimg');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');


function updateImageDisplay() {
    headImg.src = imageArray[currentIndex];
    console.log(`현재 이미지 인덱스: ${currentIndex}`);
}


function moveIndex(direction) {
    if (direction === 'next') {
        currentIndex++;
        if (currentIndex >= imageArray.length) { 
            currentIndex = 0;
        }
    } else if (direction === 'prev') {
        currentIndex--;
        if (currentIndex < 0) { 
            currentIndex = imageArray.length - 1;
        }
    }
    
    updateImageDisplay();
}



nextBtn.addEventListener('click', () => {
    moveIndex('next');
});

prevBtn.addEventListener('click', () => {
    moveIndex('prev');
});



updateImageDisplay();