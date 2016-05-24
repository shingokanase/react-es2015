// ライブラリの読み込み
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const plumber = require('gulp-plumber');
const runSequence = require('run-sequence');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const env = process.env.NODE_ENV;

// webpackの実行
gulp.task('webpack', () => {
  gulp.src(['./src/*'])
  .pipe(plumber())
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest('./dist'));
});

// eslint実行
gulp.task('lint', () => {
  gulp.src(['./src/*'])
  .pipe(eslint({useEslintrc: true}))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
})

// デフォルトタスク
gulp.task('default', () => {
  // if (env === 'production') {
  //   runSequence('webpack');
  // } else {
  //   runSequence('webpack');
  // }
  runSequence('lint', 'webpack');
});