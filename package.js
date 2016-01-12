Package.describe({
  name: 'zeroasterisk:flow-dynamics-animation',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Simple transitions/animations for FlowRouter using DynamicsJS',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/zeroasterisk/meteor-flow-dynamics-animation',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.imply('zeroasterisk:dynamicsjs@0.0.1');
  api.addFiles('flow-dynamics-animation.js');
  api.export('FlowDynamicsAnimation');
  api.export('FlowDA');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('random');
  api.use('kadira:flow-router');
  api.use('zeroasterisk:flow-dynamics-animation');
  api.addFiles('flow-dynamics-animation-tests.js', 'client');
});
