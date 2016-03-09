module.exports = function (gulp, opt) {
    gulp.task('content', function () {
        return gulp.src([opt.__.content_src, opt.__.content_src_minus])
            .pipe(opt.metalsmith({
                // set Metalsmith's root directory, for example for locating templates, defaults to CWD
                root: opt.__.build,
                // files to exclude from the build
                ignore: [],
                // read frontmatter, defaults to true
                frontmatter: true,
                // Metalsmith plugins to use
                use: [
                    opt.metadata({
                        site: 'meta.json',
                        settings: 'settings.json'
                    }),
                    opt.date({key: 'dateBuilt'}),
                    opt.markdown(),
                    opt.collections({
                        articles: {
                            pattern: './content/articles/*.md',
                            sortBy: 'date',
                            reverse: 'True'
                        }
                        , news: {
                            pattern: './content/news/*.md',
                            sortBy: 'date',
                            reverse: 'True'
                        }
                        , books: {
                            pattern: './content/books/*.md',
                            sortBy: 'date',
                            reverse: 'True'
                        }
                    }),
                    opt.permalinks({
                        pattern: ':collections:title'
                    }),
                    opt.feed({collection: 'articles'}),
                    opt.layouts({
                        engine: 'jade',
                        moment: opt.moment
                    }),
                    opt.beautify()
                ],
                // Initial Metalsmith metadata:
                metadata: {
                    site_title: 'Sample static site'
                }
            }))
            .pipe(gulp.dest(opt.__.pub));
    });
    return null;
};