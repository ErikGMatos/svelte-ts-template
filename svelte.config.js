const sveltePreprocess = require('svelte-preprocess');
const production = process.env.NODE_ENV === 'production';
console.log(
  `*************************** SVELTE CONFIG === ${
    production ? 'PRODUCTION' : 'DEVELOPMENT'
  } *****************************`
);

const preprocessOptions = {
  sourceMap: true,
  scss: true,
  postcss: true,
  typescript: true,
};

module.exports = {
  preprocess: sveltePreprocess(preprocessOptions),
  preprocessOptions,
};
