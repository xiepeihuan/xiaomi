var {series, src, dest, watch} = require("gulp");

var minifyCss = require("gulp-cssmin");
var minifyHtml = require("gulp-htmlmin");
var uglify = require("gulp-uglify");
var autoprefixer = require("gulp-autoprefixer");
var babel = require("gulp-babel");
var sass = require("gulp-sass");
var webserver = require("gulp-webserver");
var clean = require("gulp-clean");

function doCss() {
    return src("./origin/sass/**/*.scss")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(dest("./publish/css"));
}

function doJS() {
    return src("./origin/js/**/*.js")
    .pipe(babel({
        presets: ["es2015"]
    }))
    .pipe(uglify())
    .pipe(dest("./publish/js"));
}


function doHTML() {
    return src("./origin/**/*.html")
    .pipe(minifyHtml({
        collapseWhitespace: true
    }))
    .pipe(dest("./publish/"))
}
function doinfont(){
    return src("./origin/font_28ghwlauy58/*.*")
    .pipe(dest("./publish/font_28ghwlauy58/"))
}

function doResource() {
    return src("./origin/resource/**/*.*")
    .pipe(dest("./publish/resource/"))
}
function doJson(){
    return src("./origin/data/*.json")
    .pipe(dest("./publish/data/"))
}

function doClean() {
    return src("./publish/", {read: false, allowEmpty: true})
    .pipe(clean())
}

function webServer() {
        // 定位资源 
        return src("./publish")
        .pipe(webserver({
            host: "localhost",
            port: 3001,
            livereload: true,
            open: "./index.html",
            proxies: [
                {
                    source:"/php/login.php",
                    target:"http://localhost:80/dibazhou/php/login.php"
                },
                {
                    source:"/php/register.php",
                    target:"http://localhost:80/dibazhou/php/register.php"
                }
            ]
        }))
}
function refresh() {
    return watch("./origin", series(doClean, [doCss, doHTML, doJS, doResource]))
}

module.exports.webserver = webserver;
module.exports.doResource = doResource;
module.exports.a = series(doClean, [doCss, doHTML, doJS, doinfont, doJson,doResource], webServer);
module.exports.aa = series(webserver, refresh);