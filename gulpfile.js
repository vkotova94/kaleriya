const {
  series,
  parallel,
  src,
  dest,
  watch
} = require('gulp');
const clean = require('gulp-clean');
const include = require('gulp-file-include');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const browsersync = require('browser-sync');
const fs = require("fs");

const path = {
  distr: {
    html: 'distr/',
    js: 'distr/js/',
    css: 'distr/css/',
    img: 'distr/img/',
    fonts: 'distr/fonts/'
  },
  src: {
    html: 'src/**/[^_]*.html',
    style: 'src/main.scss',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  watch: {
    html: 'src/**/*.html',
    style: 'src/**/*.scss',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  clean: './distr'
};

const serverConfig = {
  server: {
    baseDir: "./distr"
  },
  tunnel: false,
  host: 'localhost',
  port: 9000,
  logPrefix: "IT-academy",
  notify: false
};


const cleanDist = (cb) => {
  if(fs.existsSync('./distr')) {
    return src(path.clean)
      .pipe(clean());
  }
  cb();
};

const httpBuild = () => src(path.src.html)
  .pipe(include({
    prefix: '@@',
    basepath: '@file'
  }))
  .pipe(dest(path.distr.html))
  .pipe(browsersync.stream());

const stylesBuild = () => src(path.src.style)
  .pipe(sourcemaps.init())
  .pipe(plumber())
  .pipe(sass())
  .pipe(plumber.stop())
  .pipe(sourcemaps.write('./maps/'))
  .pipe(dest(path.distr.css))
  .pipe(browsersync.stream());

const fontsBuild = () => src(path.src.fonts).pipe(dest(path.distr.fonts)).pipe(browsersync.stream());

const imgsBuild = () => src(path.src.img).pipe(dest(path.distr.img)).pipe(browsersync.stream());

const server = () => {
  browsersync.init(serverConfig);
  
  watch(path.watch.html, httpBuild);
  watch(path.watch.style, stylesBuild);
  watch(path.src.img, imgsBuild);
  watch(path.src.fonts, fontsBuild);
  
};

const build = series(cleanDist, parallel(httpBuild, stylesBuild, fontsBuild, imgsBuild));
exports.start = series(build, server);
exports.clean = series(cleanDist);
exports.build = series(build);
