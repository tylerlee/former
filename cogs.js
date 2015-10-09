module.exports = {
  in: {
    js: {
      transformers: [
        'directives',
        {name: 'babel', only: 'src/**/*', options: {modules: 'amd', stage: 0}},
        {
          name: 'babel',
          only: 'examples/**/*',
          options: {modules: 'umd', stage: 0}
        },
        {
          name: 'concat-amd',
          except: 'examples/**/*',
          options: {base: 'src'}
        }
      ]
    },
    scss: {out: 'css', transformers: ['directives', 'sass']}
  },
  builds: {
    'src/former.js': 'dist',
    'styles/former.scss': 'dist',
    'examples/src/index.js': 'examples/dist',
    'examples/styles/index.scss': 'examples/dist'
  }
};
