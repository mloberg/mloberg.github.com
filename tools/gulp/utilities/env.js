var gulpIf = require('gulp-if');

function getEnv () {
  return process.env.JEKYLL_ENV || "development";
}

function isEnv (environment) {
  return getEnv() === environment;
}

function ifEnv (environment, onSuccess) {
  return gulpIf(isEnv(environment), onSuccess);
}

function env (environment, onSuccess) {
  if (onSuccess) {
    return ifEnv(environment, onSuccess);
  }

  if (environment) {
    return isEnv(environment);
  }

  return getEnv();
};

module.exports = env;
module.exports.production = module.exports.prod = function (onSuccess) {
  return env('production', onSuccess);
};
module.exports.development = module.exports.dev = function (onSuccess) {
  return env('development', onSuccess);
};
