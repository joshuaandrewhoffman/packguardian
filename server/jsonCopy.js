//TODO: this should be in util

const jsonCopy = function(obj) {
  return JSON.parse(JSON.stringify(obj));
};

module.exports = jsonCopy;
