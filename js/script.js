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
let radioButtons = parentSlider.querySelectorAll("input[type='radio']");
let counter = 0;
let timerId;
let pausedId;;
//radioButtons[0].attr('checked', true);

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


function paused() {
    this.removeEventListener('click', paused);
    clearInterval(timerId);
    clearTimeout(pausedId);
    return pausedId = setTimeout(function() {
        clearInterval(timerId);
        timerId = setInterval(next, 1000);
        this.addEventListener('click', paused);
    }, 5000);
}

const setPosition = () => sliderBody.style.transform = `translateX(${position}px)`;

const checkPosition = () => {


    console.log(counter);
    //console.log(radioButtons[counter].id);
    //console.log(radioButtons[counter]);
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
}


function addSettings() {
    timerId = setInterval(next, 1000);
    btnNext.addEventListener('click', next);
    btnNext.addEventListener('click', paused);
    btnPrev.addEventListener('click', paused);
    btnPrev.addEventListener('click', prev);
}

window.addEventListener('load', function() {
    addSettings();
    //addRadio();
});

window.addEventListener('focus', function() {
    clearTimeout(pausedId);
    clearInterval(timerId);
    addSettings();
});



window.addEventListener('blur', function() {
    clearTimeout(pausedId);
    clearInterval(timerId);
});

checkPosition();

(function addRadio() {
    let radioBlock = document.createElement('div');
    parentSlider.appendChild(radioBlock);

    for (let i = 0; i < itemsCount; i++) {
        let radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.name = 'slider-buttons';
        radioButton.id = i;
        radioButton.value = i;
        radioBlock.appendChild(radioButton);
        //console.log(i);
        //console.log(radioButton.id);
    }
    radioBlock.className = 'btns-radio';
})();