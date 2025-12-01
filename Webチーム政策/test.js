'use strict';

// スライド画像リスト
const images = [
  '../img/IMG_3643.png',
  '../img/IMG_3878.png'
];

// 表示対象のimg要素を取得
const img = document.getElementById('main');

// 現在の画像インデックス
let current = 0;

// フェード切り替え関数
function showImage(index) {
  img.style.opacity = 0;

  setTimeout(() => {
    img.src = images[index];
    img.style.opacity = 1;
  }, 500); // フェードアウト後に画像切り替え
}

// 初期スタイル設定
img.style.transition = 'opacity 0.5s ease-in-out';
img.style.opacity = 1;

// ページ読み込み時に開始
document.addEventListener('DOMContentLoaded', () => {
  showImage(current);

  setInterval(() => {
    current = (current + 1) % images.length;
    showImage(current);
  }, 3500); // 3秒ごとに切り替え
});

document.addEventListener('DOMContentLoaded', () => {
  const bgVideo = document.getElementById('bg-video');
  if (bgVideo) {
    bgVideo.play().catch(err => {
      console.log("動画の自動再生がブロックされました:", err);
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('intro');
  const site = document.querySelector('.site-content');
  const video = intro.querySelector('video');

  // 動画が終わったら切り替え
  video.addEventListener('ended', () => {
    intro.style.opacity = '0';
    setTimeout(() => {
      intro.style.display = 'none';
      site.style.display = 'block';
    }, 1000); // フェードアウト後に表示
  });

  // もし動画がない場合は3秒後に切り替え
  setTimeout(() => {
    intro.style.opacity = '0';
    setTimeout(() => {
      intro.style.display = 'none';
      site.style.display = 'block';
    }, 1000);
  }, 3000);
});

document.addEventListener('DOMContentLoaded', () => {

  const logos = [
    { src: "../img/logo_01.png", alt: "OTV" },
    { src: "../img/logo_02.png", alt: "CSC" },
    { src: "../img/logo_03.png", alt: "kbc" },
    { src: "../img/logo_04.png", alt: "KANEHIDE GROUP" },
  ];

  const strip = document.getElementById('sponsor-strip');
  if (!strip) return;

  strip.classList.add("logo-slider");

  const track = document.createElement('div');
  track.className = "logo-track";
  strip.appendChild(track);
document.addEventListener('DOMContentLoaded', () => {

  const logos = [
    { src: "../img/logo_01.png", alt: "OTV" },
    { src: "../img/logo_02.png", alt: "CSC" },
    { src: "../img/logo_03.png", alt: "kbc" },
    { src: "../img/logo_04.png", alt: "KANEHIDE GROUP" },
  ];

  const strip = document.getElementById('sponsor-strip');
  if (!strip) {
    console.warn('ロゴ表示先の要素（#sponsor-strip）が見つかりません');
    return;
  }

  /* -------------------------------
     ロゴ生成（元コードそのまま）
  --------------------------------*/
  logos.forEach(item => {
    const wrap = document.createElement('div');
    wrap.className = 'sponsor-logo';

    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.alt;
    img.loading = 'lazy';
    img.decoding = 'async';

    wrap.appendChild(img);
    strip.appendChild(wrap);
  });

  /* -------------------------------
     無限ループ化（追加）
  --------------------------------*/

  // DOMが揃ってから複製
  requestAnimationFrame(() => {

    strip.innerHTML += strip.innerHTML;

    const firstSetWidth = strip.scrollWidth / 2;

    let x = 0;
    let lastTime = null;
    const speed = 50; // px / 秒

    function slide(time) {
      if (!lastTime) lastTime = time;

      const delta = (time - lastTime) / 1000;
      lastTime = time;

      x += speed * delta;

      if (x >= firstSetWidth) x -= firstSetWidth;

      strip.style.transform =
        `translate3d(${-Math.round(x)}px,0,0)`;

      requestAnimationFrame(slide);
    }

    requestAnimationFrame(slide);

  });

});

  // --- ロゴ 1 周ぶん生成 ---
  function addSet() {
    logos.forEach(item => {

      const wrap = document.createElement('div');
      wrap.className = 'sponsor-logo';

      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.alt;
      img.loading = 'lazy';
      img.decoding = 'async';

      wrap.appendChild(img);
      track.appendChild(wrap);

    });
  }

  // 最低2周分は用意
  addSet();
  addSet();

  // --- すべての画像ロード後に幅を計算 ---
  function onReady(callback) {
    const imgs = track.querySelectorAll('img');
    let loaded = 0;

    imgs.forEach(img => {
      if (img.complete) {
        loaded++;
      } else {
        img.onload = () => {
          loaded++;
          if (loaded === imgs.length) callback();
        };
      }
    });

    if (loaded === imgs.length) callback();
  }

  onReady(() => {

    // 1周分の実幅を測定
    let firstSetWidth = 0;
    for (let i = 0; i < logos.length; i++) {
      firstSetWidth += track.children[i].getBoundingClientRect().width;
    }

    // 画面＋1周ぶんに満たない場合は自動増殖
    while (track.scrollWidth < strip.clientWidth + firstSetWidth) {
      addSet();
    }

    startSlide(firstSetWidth);
  });

  function startSlide(firstSetWidth) {

    let x = 0;
    const speed = 0.6;

    track.style.willChange = "transform";

    function slide() {

      x += speed;

      if (x >= firstSetWidth) {
        x -= firstSetWidth;
      }

      track.style.transform = `translate3d(${-Math.floor(x)}px, 0, 0)`;


      requestAnimationFrame(slide);
    }

    slide();
  }

});
