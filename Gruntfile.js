module.exports = function(grunt) {
  
  // 辅助函数：补前置零
  function pad(num, n) {
    var len = num.toString().length;
    while (len < n) {
      num = '0' + num;
      len++;
    }
    return num;
  }

  // 获取当前时间的格式化的字符串
  var dateNowString = function() {
    var d = new Date();
    return d.getFullYear() + '-' + pad(d.getMonth()+1, 2) + '-' + pad(d.getDate(), 2) + ' ' + pad(d.getHours(), 2) + ':' + pad(d.getMinutes(), 2) + ':' + pad(d.getSeconds(), 2);
  };

  grunt.initConfig({
    banner: '/*! jquery.plugin.coffee | @author wuzijie | <%= grunt.template.today("yyyy-mm-dd") %> */',
    coffee: {
      options: {
        banner: '<%= banner %>'
      },
      plugin: {
        files: {
          'js/jquery.easytaable.coffee.js': ['coffee/jquery.easytable.coffee']
        }
      }
    },
    watch: {
      options: {
        dateFormat: function(time) {
          grunt.log.writeln('Watch finished: ' + time + 'ms | Time: ' + dateNowString());
          grunt.log.writeln('Waiting for more changes...');
        }
      },
      coffee: {
        files: ['coffee/*.coffee'],
        tasks: ['coffee']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('compile', ['coffee:plugin', 'watch:coffee']);

};