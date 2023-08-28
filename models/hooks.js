const handelValidateError = (error, data, next) => {
  error.status = 400;
  next();
};
const undateValidators = function (next) {
  this.options.runValidators = true;
  next();
};
module.exports = {
  handelValidateError,
  undateValidators,
};
