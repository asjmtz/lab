define(function(require, exports, module) {

  var $ = require('jquery');
  console.log($);
  function App(container){ 
  	this.container = $(container);
  }
  module.exports = App;

  App.prototype.show = function(){
  	this.container.html("Hello World!")
  }

});
