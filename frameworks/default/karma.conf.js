module.exports = function(config) {
  config.set({
    frameworks: ['jasmine-ajax','jasmine-jquery','jasmine'],
    preprocessors: {
        'src/scripts/**/*.js': ['coverage']
    },
    reporters: ['spec','progress','coverage'],
    coverageReporter: {
      type : 'html',
      dir : 'coverage/',
    },
    files: [
    'http://1.www.s81c.com/common/v18/js/www.js',
    'http://www.ibm.com/common/stats/ida_stats.js',
    'http://1.www.s81c.com/common/v18/js/forms.js',
    'http://cdn.optimizely.com/js/4855523797.js',
    './src/**/*.js'
    ],
    browsers: ['PhantomJS'],
  })
}