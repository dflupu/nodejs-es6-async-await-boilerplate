module.exports = function(grunt) {
    grunt.initConfig({
        env: {
            dev: {
                NODE_PATH: '.'
            }
        },
        tape: {
            options: {},
            files: ['build/tests/*.js']
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015'],
                plugins: [
                    'transform-async-to-generator',
                    'transform-runtime'
                ]
            },
            dist: {
                files: [{
                    'expand': true,
                    'src': ['src/*.js', 'tests/*.js'],
                    'dest': 'build/'
                }]
            }
        },
        replace: {
            dist: {
                src: ['build/**/*.js'],
                overwrite: true,
                replacements: [{
                    from: /^'use strict';\n/,
                    to: ('\'use strict\';\n' +
                         'require(\'source-map-support\').install();\n')
                }]
            }
        },
        watch: {
            scripts: {
                files: ['src/*.js', 'tests/*.js'],
                tasks: ['build', 'tape'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-tape');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test', ['env:dev', 'tape']);
    grunt.registerTask('build', ['env:dev', 'babel', 'replace']);
};
