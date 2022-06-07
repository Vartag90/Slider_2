'use strict';

const parentSlider = document.querySelector('.slider');
let position = 0;
const slidesToShow = 1;
const slidesToScroll = 1;
const sliderContainer = parentSlider.querySelector('.slider__container');
const sliderBody = parentSlider.querySelector('.slider__body');
const sliderItems = parentSlider.querySelectorAll('.slider__item');
const itemsCount = sliderItems.length;
const btnPrev = parentSlider.querySelector('.btn-next');
const btnNext = parentSlider.querySelector('.btn-prev');
const itemWidth = sliderContainer.clientWidth / slidesToShow;
const movePosition = itemWidth * slidesToScroll;

sliderItems.forEach(function(elem) {
    elem.style.minWidth = `${itemWidth}px`;
})

btnNext.addEventListener('click', function() {
    const itemLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
    position -= itemLeft >= slidesToScroll ? movePosition : itemLeft * itemWidth;
    setPosition();
    checkBtns();
})

btnPrev.addEventListener('click', function() {
    const itemLeft = Math.abs(position) / itemWidth;

    position += itemLeft >= slidesToScroll ? movePosition : itemLeft * itemWidth;

    setPosition();
    checkBtns();
})


const setPosition = () => sliderBody.style.transform = `translateX(${position}px)`;

const checkBtns = () => {
    btnPrev.disabled = position === 0;
    btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
}

checkBtns();