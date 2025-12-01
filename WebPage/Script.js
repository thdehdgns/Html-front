/*
실행 순서 개요
1) 페이지 이동 함수(Main2/Main1/Login/Cart, 로그인 팝업)
2) 헤더 슬라이드(이미지 배열, 인덱스 이동, 클릭/드래그/스와이프)
3) 게임 목록 정의 + 스토리지 저장 + 갤러리 클릭 시 선택 저장
4) 추천 슬라이더(4개 중 2개 표시)
5) Gamepage 정보 채우기 + 장바구니 저장 후 쇼핑버킷 이동
6) 쇼핑버킷 렌더링(목록/합계/삭제/비우기/구매 완료)
*/

// -------- 1) 페이지 이동 --------
function Main2page() {
    location.href = "Main2.html";
}

function Main1page() {
    location.href = "index.html";
}

function Loginpage() {
    location.href = "Login.html";
}


function openPopup() {
    window.open("login.html", "Login", "width=500,height=600,left=100,top=100,resizable=yes");
}
function openPopupcart() {
    window.open("shoppingbasket.html", "cart", "width=1000,height=1400,left=100,top=100,resizable=yes");
}

// -------- 2) 헤더 슬라이드 --------
const imageArray = ["./image/ori.jpg", "./image/silksong.png", "./image/minecraft.png"];
let currentIndex = 0;

const headImg = document.getElementById("headimg");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const imageBox = document.querySelector(".image-box");

function setImage() {
    if (!headImg) return;
    headImg.style.opacity = 0;
    setTimeout(() => {
        headImg.src = imageArray[currentIndex];
    }, 100);
}

function moveIndex(direction) {
    if (!headImg) return;
    if (direction === "next") {
        currentIndex = (currentIndex + 1) % imageArray.length;
    } else if (direction === "prev") {
        currentIndex = (currentIndex - 1 + imageArray.length) % imageArray.length;
    }
    setImage();
}

if (nextBtn && prevBtn && headImg) {
    nextBtn.addEventListener("click", () => moveIndex("next"));
    prevBtn.addEventListener("click", () => moveIndex("prev"));
    setImage();
}

if (headImg) {
    headImg.addEventListener("load", () => {
        headImg.style.opacity = 1;
    });
}


// -------- 3) 게임 목록 --------
const gameList = [
    { name: "Ori and the Blind Forest", 
        image: "image/ori.jpg",
        price: "23000", 
        genre: "Platform / Adventure", 
        releaseDate: "2015-03-11", 
        description: "Emotional platform adventure in a dying forest." 
    },
    { name: "Hollow Knight: Silksong", 
        image: "image/silksong.png", 
        price: "28000", 
        genre: "Metroidvania / Action", 
        releaseDate: "TBD", 
        description: "Fast combat and delicate exploration." 
    },
    { name: "Minecraft", 
        image: "image/minecraft.png",
        price: "35000", 
        genre: "Sandbox / Creative",
        releaseDate: "2011-11-18",
        description: "Build and explore infinite worlds." 
        },
    { name: "Little Nightmares", 
        image: "image/little.webp", 
        price: "24000", 
        genre: "Horror / Puzzle Platformer", 
        releaseDate: "2017-04-28", 
        description: "Atmospheric escape from a dark world." 
    },
    { name: "Stardew Valley", 
        image: "image/STARDEWVALLEY.jpg", 
        price: "16000", 
        genre: "Farming / Sim", 
        releaseDate: "2016-02-26", 
        description: "Relaxing farm life and town stories." 
    },
    { name: "Fall Guys", 
        image: "image/FallGuys.webp", 
        price: "22000", 
        genre: "Party / Multiplayer", 
        releaseDate: "2020-08-04", 
        description: "Party action through fun mini games." 
    },
    { name: "Terraria", 
        image: "image/Terraria.webp", 
        price: "12000", 
        genre: "Exploration / Crafting", 
        releaseDate: "2011-05-16", 
        description: "2D sandbox with mining, crafting, combat." 
    },
    { name: "Monster Hunter Wilds", 
        image: "image/monster.jpg", 
        price: "72000", 
        genre: "Hunting Action", 
        releaseDate: "TBD", 
        description: "Hunt gigantic monsters in living ecosystems." 
    }
];

function saveGamesToStorage() {
    try {
        localStorage.setItem("main2Games", JSON.stringify(gameList));
    } catch (err) {
        console.error("게임 목록 저장 실패:", err);
    }
}
saveGamesToStorage();

// 갤러리 클릭 시 선택한 게임 저장
const galleryLinks = document.querySelectorAll(".gallery-link");
if (galleryLinks && galleryLinks.length) {
    galleryLinks.forEach((link) => {
        link.addEventListener("click", () => {
            const idx = parseInt(link.dataset.gameIndex, 10);
            if (!Number.isNaN(idx) && gameList[idx]) {
                localStorage.setItem("selectedGame", JSON.stringify(gameList[idx]));
            }
        });
    });
}

// -------- 4) 추천 슬라이더 (4개 중 2개) --------
const featuredGames = gameList.slice(0, 4);
let recIndex = 0;
const recSlots = document.querySelectorAll(".rec-slot");
const recPrev = document.getElementById("recPrev");
const recNext = document.getElementById("recNext");

function renderRec() {
    if (!recSlots.length) return;
    for (let i = 0; i < recSlots.length; i++) {
        const game = featuredGames[(recIndex + i) % featuredGames.length];
        const img = recSlots[i].querySelector("img");
        const nameEl = recSlots[i].querySelector(".rec-name");
        const priceEl = recSlots[i].querySelector(".rec-price");
        if (img) {
            img.src = game.image;
            img.alt = game.name;
        }
        if (nameEl) nameEl.textContent = game.name;
        if (priceEl) priceEl.textContent = game.price;
    }
}

if (recPrev && recNext && recSlots.length) {
    recPrev.addEventListener("click", () => {
        recIndex = (recIndex - 1 + featuredGames.length) % featuredGames.length;
        renderRec();
    });
    recNext.addEventListener("click", () => {
        recIndex = (recIndex + 1) % featuredGames.length;
        renderRec();
    });
    renderRec();
}

// -------- 5) Gamepage 정보 채우기 + 장바구니 저장 --------
function parsePrice(priceStr) {
    const num = parseInt((priceStr || "").replace(/[^0-9]/g, ""), 10);
    return Number.isNaN(num) ? 0 : num;
}

function addToCart(game) {
    try {
        const raw = localStorage.getItem("cartItems");
        const cart = raw ? JSON.parse(raw) : [];
        cart.push({
            name: game.name,
            price: game.price,
            image: game.image || ""
        });
        localStorage.setItem("cartItems", JSON.stringify(cart));
        return cart;
    } catch (err) {
        console.error("Failed to save cart", err);
        return [];
    }
}

function hydrateGamePage() {
    const titleEl = document.getElementById("gameTitle");
    const imgEl = document.getElementById("gameImage");
    const genreEl = document.getElementById("gameGenre");
    const priceEl = document.getElementById("gamePrice");
    const releaseEl = document.getElementById("gameRelease");
    const descEl = document.getElementById("gameDesc");
    const purchaseBtn = document.getElementById("purchaseBtn");

    if (!titleEl || !imgEl || !genreEl || !priceEl || !releaseEl || !descEl) return;

    const selectedRaw = localStorage.getItem("selectedGame");
    if (!selectedRaw) return;

    try {
        const game = JSON.parse(selectedRaw);
        titleEl.textContent = game.name || "Game Title";
        imgEl.src = game.image || "";
        imgEl.alt = game.name || "Game Image";
        genreEl.textContent = game.genre || "-";
        priceEl.textContent = game.price ? `₩${Number(game.price).toLocaleString("ko-KR")}` : "-";
        releaseEl.textContent = game.releaseDate || "-";
        descEl.textContent = game.description || "No description.";

        if (purchaseBtn) {
            purchaseBtn.onclick = () => {
                addToCart(game);
                window.location.href = "shoppingbasket.html";
            };
        }
    } catch (err) {
        console.error("Failed to load game info", err);
    }
}

if (window.location.pathname.toLowerCase().includes("gamepage")) {
    hydrateGamePage();
}

// -------- 6) 쇼핑버킷 렌더링 --------
function initBasketPage() {
    const listEl = document.getElementById("cartList");
    const totalEl = document.getElementById("cartTotal");
    const clearBtn = document.getElementById("clearCartBtn");
    const finalBtn = document.getElementById("finalPurchaseBtn");

    if (!listEl || !totalEl || !clearBtn || !finalBtn) return;

    function renderCart() {
        listEl.innerHTML = "";
        const raw = localStorage.getItem("cartItems");
        const cart = raw ? JSON.parse(raw) : [];

        if (!cart.length) {
            listEl.innerHTML = '<li class="sb-empty">담긴 게임이 없습니다.</li>';
            totalEl.textContent = "₩0";
            return;
        }

        const total = cart.reduce((sum, item) => sum + parsePrice(item.price), 0);
        totalEl.textContent = `₩${total.toLocaleString("ko-KR")}`;

        cart.forEach((item, idx) => {
            const li = document.createElement("li");
            li.className = "sb-item";
            li.innerHTML = `
                <div class="sb-item-info">
                    <div class="sb-name">${item.name || "이름 없음"}</div>
                    <div class="sb-meta">${item.price ? "₩" + Number(item.price).toLocaleString("ko-KR") : "-"}</div>
                </div>
                <button class="sb-remove" data-idx="${idx}">제거</button>
            `;
            listEl.appendChild(li);
        });

        listEl.querySelectorAll(".sb-remove").forEach((btn) => {
            btn.onclick = () => {
                const idx = parseInt(btn.dataset.idx, 10);
                cart.splice(idx, 1);
                localStorage.setItem("cartItems", JSON.stringify(cart));
                renderCart();
            };
        });
    }

    clearBtn.onclick = () => {
        localStorage.removeItem("cartItems");
        renderCart();
    };

    finalBtn.onclick = () => {
        alert("구매가 완료되었습니다. 감사합니다!");
        localStorage.removeItem("cartItems");
        renderCart();
    };

    renderCart();
}

if (window.location.pathname.toLowerCase().includes("shoppingbasket")) {
    initBasketPage();
}
