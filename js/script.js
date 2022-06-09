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
const itemWidth = sliderContainer.offsetWidth / slidesToShow;
const movePosition = itemWidth * slidesToScroll;
const radioBlock = parentSlider.querySelector("form");
let counter = 0;
const timeForAChange = 1500;
let timerId;


sliderItems.forEach(function(elem) {
    elem.style.minWidth = `${itemWidth}px`;
});

//add radio buttons
function addRadio() {
    for (let i = 0; i < itemsCount / slidesToScroll; i++) {
        let radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.name = 'slider-buttons';
        radioButton.id = i;
        radioButton.value = i;
        radioBlock.appendChild(radioButton);
    }
};


function next() {
    const itemLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
    position -= itemLeft >= slidesToScroll ? movePosition : itemLeft * itemWidth;
    counter += slidesToScroll;
    if (radioBlock.children[counter / slidesToScroll]) {
        radioBlock.children[counter / slidesToScroll].checked = true;

    }
    setPosition();
    checkPosition();
}

function prev() {
    const itemLeft = Math.abs(position) / itemWidth;
    position += itemLeft >= slidesToScroll ? movePosition : itemLeft * itemWidth;
    counter -= slidesToScroll;
    if (radioBlock.children[counter / slidesToScroll]) {
        radioBlock.children[counter / slidesToScroll].checked = true;
    }
    if (counter < 0) {
        counter = 0;
    }
    setPosition();
    checkPosition();
}


// function paused() {
//     this.removeEventListener('click', paused);
//     clearInterval(timerId);
//     clearTimeout(pausedId);
//     return pausedId = setTimeout(function() {
//         clearInterval(timerId);
//         timerId = setInterval(next, 1000);
//         this.addEventListener('click', paused);
//     }, 5000);
// }

const setPosition = () => sliderBody.style.transform = `translateX(${position}px)`;

const checkPosition = () => {
    if (counter < slidesToShow) {
        if (counter >= itemsCount - slidesToShow + 1) {
            sliderBody.style.transform = `translateX(0px)`;
            position = 0;
            counter = 0;
            radioBlock.children[0].checked = true;
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
            radioBlock.children[0].checked = true;
            //imediatle move to first slide
            sliderBody.style.transition = 0 + `s`;

        } else {
            //slow slide change
            sliderBody.style.transition = 0.2 + `s`;
        }
    }
}


function addSettings() {
    timerId = setInterval(next, timeForAChange);
    btnNext.addEventListener('click', next);
    // btnNext.addEventListener('click', paused);
    // btnPrev.addEventListener('click', paused);
    btnPrev.addEventListener('click', prev);
}

window.addEventListener('load', function() {
    addSettings();
    addRadio();
    radioBlock.children[0].checked = true;
});

window.addEventListener('focus', function() {
    //clearTimeout(pausedId);
    clearInterval(timerId);
    addSettings();
});



window.addEventListener('blur', function() {
    //clearTimeout(pausedId);
    clearInterval(timerId);
});

checkPosition();