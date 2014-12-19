(function() {
  var isArray, isFunction;

  isArray = function(obj) {
    return Object.prototype.toString.call(obj) === "[object string]";
  };

  isFunction = function(obj) {
    return Object.prototype.toString.call(obj) === "[object function]";
  };

  $.fn.easytable = function(options) {
    var $this, Delete, Insert;
    options = $.extend({}, defaults, options);
    $this = $(this);
    Insert = "z-insert";
    return Delete = "z-delete";
  };

}).call(this);
