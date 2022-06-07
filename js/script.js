'use strict';

const parentSlider = document.querySelector('.slider');
let position = 0;
const slidesToShow = 1;
const slidesToScroll = 1;
const sliderContainer = parentSlider.querySelector('.slider__container');
const sliderBody = parentSlider.querySelector('.slider__body');
const sliderItems = parentSlider.querySelectorAll('.slider__item');
const itemsCount = sliderItems.length;
const btnPrev = parentSlider.querySelector('.btn-prev');
const btnNext = parentSlider.querySelector('.btn-next');
const itemWidth = sliderContainer.clientWidth / slidesToShow;
const movePosition = itemWidth * slidesToScroll;
let counter = 0;
let timerId;

sliderItems.forEach(function(elem) {
    elem.style.minWidth = `${itemWidth}px`;
})



function next() {
    const itemLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
    position -= itemLeft >= slidesToScroll ? movePosition : itemLeft * itemWidth;
    counter += slidesToScroll;
    setPosition();
    checkPosition();
}

function prev() {
    const itemLeft = Math.abs(position) / itemWidth;
    position += itemLeft >= slidesToScroll ? movePosition : itemLeft * itemWidth;
    counter -= slidesToScroll;
    if (counter < 0) {
        counter = 0;
    }
    setPosition();
    checkPosition();
}


function slide() {
    timerId = setInterval(next, 1000);
}

window.addEventListener('load', slide);

btnNext.addEventListener('click', next);
btnNext.addEventListener('click', function() {
    clearInterval(timerId);
    setTimeout(slide, 5000);
});


btnPrev.addEventListener('click', prev);
//btnPrev.addEventListener('click', paused);






const setPosition = () => sliderBody.style.transform = `translateX(${position}px)`;

const checkPosition = () => {
    console.log(counter);
    if (counter < slidesToShow) {
        if (counter >= itemsCount - slidesToShow + 1) {
            sliderBody.style.transform = `translateX(0px)`;
            position = 0;
            counter = 0;
            //imediatle move to first slide
            sliderBody.style.transition = 0 + `s`;

        } else {
            //slow slide change
            sliderBody.style.transition = 0.2 + `s`;
        }
    } else {
        if (counter >= itemsCount) {
            sliderBody.style.transform = `translateX(0px)`;
            position = 0;
            counter = 0;
            //imediatle move to first slide
            sliderBody.style.transition = 0 + `s`;

        } else {
            //slow slide change
            sliderBody.style.transition = 0.2 + `s`;
        }
    }

    //btnPrev.disabled = position === 0;
    //btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
}




checkPosition();