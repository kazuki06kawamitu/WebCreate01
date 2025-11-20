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