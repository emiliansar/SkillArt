const {src, dest, watch, parallel, series} = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
const newer = require('gulp-newer');
const svgSprite = require('gulp-svg-sprite');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');
const include = require('gulp-include');

function pages() {
    return src('app/pages/*.html')
        .pipe(include({
            includePaths: 'app/components'
        }))
        .pipe(dest('app'))
        .pipe(browserSync.stream())
}


function fonts() {
    return src('app/fonts/src/*.*')
        .pipe(fonter({
            formats: ['woff', 'ttf']
        }))
        .pipe(src('app/fonts/src/*.ttf'))
        .pipe(ttf2woff2())
        .pipe(dest('app/fonts'))
}


function images() {
    return src(['app/images/src/*.*', '!app/images/src/*.svg'])
            .pipe(newer('app/images'))
            .pipe(webp())

            .pipe(src(['app/images/src/*.*', '!app/images/src/*.svg']))
            .pipe(newer('app/images'))
            
            .pipe(dest('app/images'))

        // .pipe(newer('app/images'))
        // .pipe(avif({quality: 50}))
        
        // .pipe(src(['app/images/src/*.*', '!app/images/src/*.svg']))
        // .pipe(newer('app/images'))
        // .pipe(webp())

        // .pipe(src(['app/images/src/*.*', '!app/images/src/*.svg']))
        // .pipe(newer('app/images'))
        // .pipe(imagemin())

        // .pipe(dest('app/images'))
}


function sprite() {
    return src('app/images/src/*.svg')
        .pipe(dest('app/images'))

        .pipe(src('app/images/src/*.svg'))
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg',
                    example: true
                }
            }
        }))
        .pipe(dest('app/images'))
}


function styles() {
    return src('app/scss/style.scss')
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'] }))
        .pipe(concat('style.min.css'))
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}


function scripts() {
    return src([
        'node_modules/swiper/swiper-bundle.js',
        'app/js/main.js'
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

function watching() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
    watch(['app/scss/style.scss'], styles)
    watch(['app/js/main.js'], scripts)
    watch(['app/components/*', 'app/pages/*'], pages)
    watch(['app/*.html']).on('change', browserSync.reload)
}

function cleanDist() {
    return src('dist')
        .pipe(clean())
}

function building() {
    return src([
        'app/css/style.min.css',
        'app/js/main.min.js',
        'app/images/*.*',
        'app/images/favicon/*.*',
        'app/fonts/*.*',
        'app/favicon*',
        'app/*.html',
        '!app/images/stack/sprite.stack.html'
    ], {base : 'app'})
        .pipe(dest('dist'))
}


exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.sprite = sprite;
exports.fonts = fonts;
exports.pages = pages;
exports.cleanDist = cleanDist;
exports.building = building;
exports.watching = watching;

exports.build = series(cleanDist, building);
exports.default = parallel(styles, scripts, watching);