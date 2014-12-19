## 辅助函数
# 判断是否为数组
isArray = (obj) ->
  Object::toString.call(obj) is "[object string]"
# 判断是否为函数
isFunction = (obj) ->
  Object::toString.call(obj) is "[object function]"

$.fn.easytable = (options) ->
  options = $.extend({}, defaults, options)
  $this = $(this)
  # Event Namespace
  Insert = "z-insert"
  Delete = "z-delete"