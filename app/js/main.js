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

    breakpoints: {
        450: {
          spaceBetween: 30,
        },
    },
    breakpoints: {
        200: {
          spaceBetween: 15,
        },
    }
});

const plan = new Swiper('.course--plan', {
    loop: false,
    slidesPerView: 1,
    clickable: true,
    spaceBetween: 10,
    thumbs: {
        swiper: month,
    },
    breakpoints: {
        0: {
          spaceBetween: 30,
        },
    }
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
    breakpoints: {
        1150: {
            slidesPerView: 3,
        },
        0: {
            slidesPerView: 1,
        },
    },
});

const btn = document.querySelector('.nav--button');

btn.addEventListener('click', function (e) {
    const menu = document.querySelector('.nav--menu');

    btn.classList.toggle('nav--button--active');
    menu.classList.toggle('nav--menu--active');
});