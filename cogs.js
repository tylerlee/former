module.exports = {
  in: {
    es6: {
      out: 'js',
      transformers: [
        'directives',
        {name: 'babel', except: 'examples/index.es6', options: {modules: 'amd'}},
        {name: 'babel', only: 'examples/index.es6', options: {modules: 'ignore'}}
      ]
    },

    js: {
      transformers: [
        'directives', {
          name: 'concat-amd',
          options: {
            base: 'scripts',
            extensions: ['es6']
          }
        }
      ]
    },

    scss: {
      out: 'css',
      transformers: ['directives', 'sass']
    }
  },

  builds: {
    'scripts/former.es6': 'dist',
    'styles/former.scss': 'dist',
    'examples/index.es6': 'examples'
  }
}
