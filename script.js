/* =====================================================
   ⚙️ CẤU HÌNH — CHỈ CẦN SỬA PHẦN NÀY
   ===================================================== */
const CONFIG = {
    /* Màn hình khóa */
    password: "145",                                   /* mật khẩu (đổi tùy ý, số bao nhiêu chữ số cũng được) */
    lockImage: "img/20.png",                         /* ảnh bên trái màn hình khóa */
    lockHint: "Tổng ngày sinh F7",    /* dòng gợi ý */

    title: "Happy Birthday",
    // subtitle: "Ko phải ngại",

    /* 6 bài nhạc: src = đường dẫn file mp3, cover = ảnh bìa (có thể để trống) */
    songs: [
        { title: "hảo hảo ca", src: "music/Hoả ca.mp3", cover: "" },
        { title: "khúc hát mừng sinh nhật", src: "music/Khúc hát mừng sinh nhật.mp3", cover: "" },
        { title: "i love bcn", src: "music/I love you bùi công nam.mp3", cover: "" },
        { title: "lạc trôi", src: "music/Quá là trôi.mp3", cover: "" },
        { title: "Quả tâm", src: "music/Hoả tâm.mp3", cover: "" },
        { title: "Di chuyển", src: "music/Move on.mp3", cover: "" },
    ],

    /* Ảnh: thêm bao nhiêu cũng được. Hàng 1 chạy sang trái, hàng 2 chạy sang phải.
       Để mảng rỗng [] thì hiện khung ảnh mẫu. */
    photosRow1: ["img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg", "img/5.jpg", "img/13.jpg","img/14.jpg","img/15.jpg","img/16.jpg"],
    photosRow2: ["img/7.jpg", "img/8.jpg", "img/9.jpg", "img/10.jpg", "img/11.jpg", "img/17.jpg","img/18.jpg","img/19.jpg","img/21.jpg"],
    photoTop: "con cua cua con cua cua con cua cua con cua cua con cua cua con cua cua con cua cua con cua cua con cua",
    photoBottom: "..............................",

    /* Lời chúc: dán văn bản vào giữa hai dấu ` (xuống dòng = đoạn mới) */
    wishTitle: "Cậu bạn năm đó tôi từng xua đuổi",
    wishText: `Sinh nhật vui vẻ. Đã già hơn 1 tuổi rồi và cũng thêm 1 cái sinh
                nhật tụi mình tổ chức cho nhau.
                Mong F7 tụi mình sẽ có thêm nhiều ngày sinh nhật vầy để có thể đi chơi và vui cười cùng nhau.
                Chúc Lê Ngọc Thảo Tiên tuổi mới làm gì cũng thuận lợi, tuổi mới khỏe re, tiền vô như nước, deadline thì
                tự biến mất, còn người yêu thì sớm xuất hiện. Và cuối cùng chúc Tiên luôn là phiên bản vui vẻ nhất của
                mình`,
    wishSign: "—F7-Phú Yên",

    /* Quà: đường dẫn video (mp4). Để "" thì hiện khung chờ. */
    giftVideo: "music/Download (2).mp4",
    giftHint: "kkkkkkkkkkkkkkkk",
};
/* ===================================================== */

const $ = s => document.querySelector(s);
const fmt = t => isFinite(t) ? Math.floor(t / 60) + ":" + String(Math.floor(t % 60)).padStart(2, "0") : "0:00";

/* Home text */
$("#homeTitle").firstChild.textContent = CONFIG.title;
$("#homeSub").textContent = CONFIG.subtitle;

/* Floating hearts */
/* Hiệu ứng rơi: bánh kem, con cua, trái tim */
const ICONS = ["🎂", "🦀", "❤️"];   // thêm hoặc bớt icon tùy ý
const COUNT = 24;                     // số lượng icon rơi cùng lúc

for (let i = 0; i < COUNT; i++) {
    const h = document.createElement("i");
    h.textContent = ICONS[i % ICONS.length];          // chia đều 3 loại
    h.style.cssText = `
        left: ${Math.random() * 100}%;
        font-size: ${16 + Math.random() * 20}px;
        animation-duration: ${7 + Math.random() * 8}s;
        animation-delay: ${-Math.random() * 14}s;
        --dx: ${(Math.random() - 0.5) * 120}px;
        --rot: ${(Math.random() - 0.5) * 720}deg;
    `;
    $("#hearts").appendChild(h);
}

/* Modal open/close */
document.querySelectorAll("[data-open]").forEach(b => b.onclick = () => $("#" + b.dataset.open).classList.add("open"));
document.querySelectorAll(".overlay").forEach(o => {
    o.addEventListener("click", e => { if (e.target === o || e.target.classList.contains("close")) { o.classList.remove("open"); if (o.id === "gift") { const v = o.querySelector("video"); v && v.pause() } } });
});
document.addEventListener("keydown", e => { if (e.key === "Escape") document.querySelectorAll(".overlay.open .close").forEach(c => c.click()) });

/* ---------- Music ---------- */
const audio = new Audio(); let idx = -1;
const bg = u => u ? `url("${u}")` : "";
const list = $("#list");
CONFIG.songs.forEach((s, i) => {
    const d = document.createElement("div"); d.className = "track";
    d.innerHTML = `<div class="th" style="background-image:${bg(s.cover)}">${s.cover ? "" : "♪"}</div><div><b></b><small></small></div><span class="eq">♫</span>`;
    d.querySelector("b").textContent = s.title; d.querySelector("small").textContent = s.artist;
    d.onclick = () => load(i, true); list.appendChild(d);
});
function load(i, autoplay) {
    idx = (i + CONFIG.songs.length) % CONFIG.songs.length; const s = CONFIG.songs[idx];
    audio.src = s.src; $("#sName").textContent = s.title; $("#sArtist").textContent = s.artist;
    const c = $("#cover"); c.style.backgroundImage = bg(s.cover); c.textContent = s.cover ? "" : "🎶";
    [...list.children].forEach((e, k) => e.classList.toggle("active", k === idx));
    if (autoplay) audio.play().catch(() => { });
}
$("#play").onclick = () => { if (idx < 0) return load(0, true); audio.paused ? audio.play().catch(() => { }) : audio.pause() };
$("#next").onclick = () => load(idx < 0 ? 0 : idx + 1, true);
$("#prev").onclick = () => load(idx < 0 ? 0 : idx - 1, true);
audio.onplay = () => { $("#play").textContent = "⏸"; $("#cover").classList.add("spin") };
audio.onpause = () => { $("#play").textContent = "▶"; $("#cover").classList.remove("spin") };
audio.onended = () => load(idx + 1, true);
audio.onloadedmetadata = () => { $("#dur").textContent = fmt(audio.duration) };
audio.ontimeupdate = () => { $("#cur").textContent = fmt(audio.currentTime); if (audio.duration) $("#seek").value = audio.currentTime / audio.duration * 100 };
$("#seek").oninput = e => { if (audio.duration) audio.currentTime = e.target.value / 100 * audio.duration };

/* ---------- Photos (2 hàng ngược chiều) ---------- */
function fillRow(el, arr, fallbackCount) {
    const items = arr.length ? arr : Array.from({ length: fallbackCount }, () => "");
    const make = () => items.map(u => {
        const p = document.createElement("div"); p.className = "photo";
        if (u) { p.style.backgroundImage = `url("${u}")` } else { p.textContent = "🌷" } return p
    });
    el.append(...make(), ...make()); /* nhân đôi để vòng lặp liền mạch */
}
fillRow($("#row1"), CONFIG.photosRow1, 6);
fillRow($("#row2"), CONFIG.photosRow2, 6);
$("#pTop").textContent = CONFIG.photoTop; $("#pBottom").textContent = CONFIG.photoBottom;

/* ---------- Wish ---------- */
$("#wTitle").textContent = CONFIG.wishTitle; $("#wSign").textContent = CONFIG.wishSign;
CONFIG.wishText.split(/\n+/).filter(t => t.trim()).forEach(t => { const p = document.createElement("p"); p.textContent = t.trim(); $("#wBody").appendChild(p) });

/* ---------- Gift ---------- */
$("#giftHint").textContent = CONFIG.giftHint;
$("#giftBox").innerHTML = CONFIG.giftVideo
    ? `<video class="vid" src="${CONFIG.giftVideo}" poster="img/poster.jpg" controls playsinline></video>`
    : `<div class="vid-empty"><div><span>🎁</span>hmmm...</div></div>`;

/* ---------- Màn hình khóa ---------- */
(function () {
    const pw = String(CONFIG.password);
    let input = "";
    const lock = $("#lock"), dots = $("#dots"), keys = $("#keys"), card = $("#lockCard");
    if (CONFIG.lockImage) $("#lockImg").style.backgroundImage = `url("${CONFIG.lockImage}")`;
    $("#lockHint").textContent = CONFIG.lockHint;
    document.body.style.overflow = "hidden";

    for (let i = 0; i < pw.length; i++) dots.appendChild(document.createElement("i"));
    const draw = () => [...dots.children].forEach((d, i) => d.classList.toggle("on", i < input.length));

    function press(n) {
        if (input.length >= pw.length) return;
        input += n; draw();
        if (input.length === pw.length) {
            if (input === pw) {
                setTimeout(() => { lock.classList.add("hide"); document.body.style.overflow = ""; setTimeout(() => lock.remove(), 700) }, 250);
            } else {
                card.classList.add("shake");
                setTimeout(() => { card.classList.remove("shake"); input = ""; draw() }, 450);
            }
        }
    }
    const back = () => { input = input.slice(0, -1); draw() };

    [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "⌫"].forEach(k => {
        const b = document.createElement("button");
        b.className = "key" + (k === "" ? " ghost" : ""); b.textContent = k;
        if (k === "⌫") b.onclick = back; else if (k !== "") b.onclick = () => press(String(k));
        keys.appendChild(b);
    });

    /* gõ bằng bàn phím máy tính */
    document.addEventListener("keydown", e => {
        if (!document.body.contains(lock)) return;
        if (/^\d$/.test(e.key)) press(e.key);
        else if (e.key === "Backspace") back();
    });
})();