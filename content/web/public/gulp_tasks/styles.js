const gulp = require("gulp");
const browserSync = require("browser-sync");
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const gutil = require("gulp-util");
const preprocess = require("gulp-preprocess");
const csso = require("gulp-csso");
const cleanCSS = require("gulp-clean-css");
const conf = require("../conf/gulp.conf");
const minifycss = require("gulp-minify-css");

gulp.task("styles", styles);

function styles() {
    return gulp
        .src(conf.path.src("app/**/*.scss"))
        .pipe(preprocess({ context: { URL_BUCKET: gutil.env.URL_BUCKET } }))
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: "expanded" }))
        .on("error", conf.errorHandler("Sass"))
        .pipe(postcss([]))
        .pipe(sourcemaps.write())
        .pipe(cleanCSS())
        .pipe(csso())
        .pipe(minifycss())
        .pipe(gulp.dest(conf.path.tmp()))
        .pipe(browserSync.stream());
}
