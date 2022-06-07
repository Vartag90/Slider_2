'use strict';

let parent = document.querySelectorAll('.swiper');

for (const slide of parent) {
    let slides = slide.querySelectorAll('.swiper-slide');
    let i = 0;
    setInterval(function skip() {
        slides[i].classList.remove('active');
        if (i < slides.length - 1) {
            i++;
        } else {
            i = 0;
        }
        slides[i].classList.add('active');
    }, 3000)
}