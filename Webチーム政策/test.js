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
  }, 3000); // 3秒ごとに切り替え
});

