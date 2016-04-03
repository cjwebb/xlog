module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    elm: {
      compile: {
        files: [
          {
            expand: true,
            cwd: 'frontend/',      // Src matches are relative to this path.
            src: ['**/*.elm'], // Actual pattern(s) to match.
            dest: 'build/',   // Destination path prefix.
            ext: '.js',   // Dest filepaths will have this extension.
            extDot: 'first'   // Extensions in filenames begin after the first dot
          },
        ],
      }
    },
  });
  grunt.loadNpmTasks('grunt-elm');
};
