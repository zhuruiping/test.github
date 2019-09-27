var gulp =require("gulp");
var load= require("gulp-load-plugins")();
var browser=require("browser-sync").create()

gulp.task("js",function(done){
    gulp.src("./src/js/*.js").pipe(load.babel({
        presets:["@babel/env"]
    }))
    .pipe(load.uglify()).pipe(gulp.dest("./dist/js"))
    done();
})

gulp.task("css",function(done){
    gulp.src("./src/css/*.css").pipe(load.minifyCss()).pipe(gulp.dest("./dist/css"))
    done()
})

gulp.task("html",function(done){
    gulp.src("./src/*html").pipe(load.minifyHtml()).pipe(gulp.dest("./dist"))
    done()
})
gulp.task("minify",gulp.series(gulp.parallel("js","css","html"),function(done){
    browser.reload()
    done();

}))

gulp.task("server",function(){
    browser.init({
        server:"./dist",
        prot:"8080"
    })
    gulp.watch("./src",gulp.series("minify"))
})