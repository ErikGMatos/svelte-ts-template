const production = process.env.NODE_ENV === 'production';
console.log(
  `*************************** POSTCSS === ${
    production ? 'PRODUCTION' : 'DEVELOPMENT'
  } *****************************`
);
module.exports = {
  plugins: [
    require('postcss-import'),
    ...(production
      ? [
          require('autoprefixer'),
          require('cssnano')({browsers: ['last 2 version, >1%']}),
        ]
      : []),
  ],
};
