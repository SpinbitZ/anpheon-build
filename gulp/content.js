module.exports = function (gulp, plugins, __) {
    gulp.task('content', function () {
        return gulp.src([__.src, __.src_not_js])
            .pipe(plugins.metalsmith({
                // set Metalsmith's root directory, for example for locating templates, defaults to CWD
                root: __.build,
                // files to exclude from the build
                ignore: [],
                // read frontmatter, defaults to true
                frontmatter: true,
                // Metalsmith plugins to use
                use: [
                    plugins.metadata({
                        site: 'meta.json',
                        settings: 'settings.json'
                    }),
                    plugins.date({key: 'dateBuilt'}),
                    plugins.markdown(),
                    plugins.collections({
                        pages: {
                            pattern: './content/pages/*.md',
                            sortBy: 'date',
                            reverse: 'True'
                        }
                        , articles: {
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
                    plugins.permalinks({
                        pattern: ':collections:title'
                    }),
                    plugins.feed({collection: 'articles'}),
                    plugins.layouts({
                        engine: 'jade',
                        moment: plugins.moment
                    }),
                    plugins.beautify()
                ]
                //,
                // Initial Metalsmith metadata:
                //metadata: {
                //    site_title: 'Sample static site'
                //}
            }))
            .pipe(gulp.dest(__.pub));
    });
    return null;
};

