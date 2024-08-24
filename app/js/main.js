const sliderTop = new Swiper('.swiper', {
    loop: false,
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    mousewheel: {
        sensitivity: 1,
        eventsTarget: '.swiper',
    },
    speed: 1000,
});

const month = new Swiper('.month', {
    clickable: true,
    slidesPerView: 3,
    spaceBetween: 100,
});

const plan = new Swiper('.course--plan', {
    loop: false,
    slidesPerView: 1,
    clickable: true,
    spaceBetween: 10,
    thumbs: {
        swiper: month,
    },
});

const report = new Swiper('.report--slider', {
    loop: false,
    slidesPerView: 3,
    clickable: true,
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
    },
    mousewheel: {
        sensitivity: 1,
        eventsTarget: '.report--slider',
    },
    spaceBetween: 20,
});