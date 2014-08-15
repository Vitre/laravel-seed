/*global module:false*/
module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

        dirs: {
            src: {
                root: 'app/assets',
                stylesheets: 'app/assets/stylesheets',
                javascript: 'app/assets/javascript',
                images: 'app/assets/images'
            },
            dest: {
                root: 'public/assets',
                stylesheets: 'public/assets/stylesheets',
                javascript: 'public/assets/javascript',
                images: 'public/assets/images'
            },
            dest_generated: {
                root: 'public/assets/@',
                stylesheets: 'public/assets/@/stylesheets',
                javascript: 'public/assets/@/javascript'
            },
            vendor: 'vendor',
            public_vendor: 'public/vendor'
        },

        // TASKS
        compass: {
            dev: {
                options: {
                    sassDir: '<%= dirs.src.stylesheets %>',
                    cssDir: '<%= dirs.dest_generated.stylesheets %>',
                    outputStyle: 'expanded',
                    imagesDir: '<%= dirs.src.images %>',
                    httpGeneratedImagesPath: '<%= dirs.dest.images %>'
                }
            },
            dist: {
                options: {
                    sassDir: '<%= dirs.src.stylesheets %>',
                    cssDir: '<%= dirs.dest_generated.stylesheets %>',
                    environment: 'production',
                    outputStyle: 'compressed',
                    imagesDir: '<%= dirs.src.images %>',
                    httpGeneratedImagesPath: '<%= dirs.dest.images %>'
                }
            }
        },

        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                files: {
                    '<%= dirs.dest_generated.javascript %>/vendor.js': [
                        '<%= dirs.public_vendor %>/jquery/dist/jquery.js',
                        '<%= dirs.public_vendor %>/fastclick/lib/fastclick.js',
                        '<%= dirs.public_vendor %>/foundation/js/foundation/foundation.js'
                    ],
                    '<%= dirs.dest_generated.javascript %>/main.js': ['<%= dirs.src.javascript %>/main.js']
                }
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                files: {
                    '<%= dirs.dest_generated.javascript %>/vendor.js': ['<%= dirs.dest_generated.javascript %>/vendor.js'],
                    '<%= dirs.dest_generated.javascript %>/main.js': ['<%= dirs.dest_generated.javascript %>/main.js']
                }
            }
        },

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true,
                    $: true
                }
            },

            gruntfile: {
                src: 'Gruntfile.js'
            },

            lib_test: {
                src: ['app/assets/javascript/**/*.js', 'tests/**/*.js']
            }

        },

        qunit: {
            files: ['tests**/*.html']
        },

        watch: {

            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },

            lib_test: {
                files: '<%= jshint.lib_test.src %>',
                tasks: ['jshint:lib_test', 'qunit']
            },

            compass: {
                files: '<%= compass.dist.options.sassDir %>/**/*.scss',
                tasks: ['compass:dev']
            }

        }
    });

    // PLUGINS
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // TASKS
    grunt.registerTask('default', ['build', 'watch']);
    grunt.registerTask('build', ['jshint', /*'qunit', */'concat', 'uglify', 'compass']);

};
