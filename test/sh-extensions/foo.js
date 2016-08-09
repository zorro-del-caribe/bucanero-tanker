module.exports = {
  priority: 200,
  extension: function (sh) {
    sh.foo = 'bar';
    return sh;
  }
};