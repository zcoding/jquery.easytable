## 辅助函数
# 判断是否为数组
isArray = (obj) ->
  Object::toString.call(obj) is "[object string]"
# 判断是否为函数
isFunction = (obj) ->
  Object::toString.call(obj) is "[object function]"

# EasyTable
#
# addRow
#
class EasyTable
  constructor: ($table) ->
    @element = $table
    @dom = $table[0]
    # 获取表头
    $th = $table.find 'thead>tr>th'
    Header = ($th.eq(i).text() for i in [0...$th.length])
    # 获取表格数据
    $tr = $table.find 'tbody>tr'
    Datas = []
    for j in [0...$tr.length]
      $td = $tr.eq(j).find('td')
      for k in [0...$td.length]
        Datas.push $td.eq(k).text()
    # 获取表尾
    $tf = $table.find 'tfoot>tr>td'
    Footer = ($tf.eq(i).text() for i in [0...$tf.length])
    # 这是一个只读属性，不允许外部直接修改（外部直接修改不会影响实际行数和列数，因为实际计算用的是私有变量Length，每次执行引起行数/列数变化的操作后，总能根据该变量获取当前实际行数和列数的值）
    this.length =
      row: $tr.length
      column: $th.length
    # 实际长度
    Length.row = $tr.length
    Length.column = $th.length
  #
  # 插入一行单元格数据
  #
  # tableInstance.addRow()                 在表格最后添加一个空行
  # @return {Object} 
  #
  # tableInstance.addRow(rowNumber)        在表格第rowNumber行添加一个空行
  # @param {Number} rowNumber 插入的位置（行号）
  #
  # tableInstance.addRow(arr)              在表格最后一行添加一行，以arr数组中的数据作为对应单元格数据
  # @param {Array} data 待插入的行数据数组
  # @return {Object} this 链式操作
  #
  # tableInstance.addRow(rowNumber,arr)    在表格第rowNumber行添加一行，以arr数组中的数据作为对应单元格数据
  # @param {Number} rowNumber 插入的位置（行号）
  # @param {Array} data 待插入的行数据数组
  # @return {Object} this 链式操作
  #
  # tableInstance.addRow(rowNumber,data)   在表格第rowNumber行添加一行，以data作为每个单元格的数据
  # @param {Number} rowNumber 插入的位置（行号）如果没有指定行号，默认在最后一行添加
  # @param {String|Number} data 待插入的行数据，或者字符串/数字，或者undefined
  # @return {Object} this 链式操作
  #
  addRow: (rowNumber, data) ->
    if arguments.length < 1
      rowNumber = Length.row + 1
      data = []
    else
      if isArray(arguments[0]) and arguments.length is 1
        data = arguments[0]
        rowNumber = Length.row + 1
      else
        rowNumber = parseInt(rowNumber)
        if rowNumber is rowNumber
          rowNumber = rowNumber < 1 ? 1 : rowNumber
          rowNumber = rowNumber > Length.row ? Length.row + 1 : rowNumber
        else
          'Not Found.'
        data = data or []

    html = ''
    html += '<tr>'
    if isArray(data) # 是数组，按照顺序填充，不足则补空字符串
      fillArray(data, Length.column, '')
      for i in [0...Length.column]
        html += '<td>' + data[i] + '</td>'
      Datas.splice(rowNumber-1, 0, data)
    else  # 不是数组，将data作为元素填充每一个单元格
      for i in [0...Length.column]
        html += '<td>' + data + '</td>'
      Datas.splice(rowNumber-1, 0, fillArray([], Length.column, data))

    html += '</tr>'
    if rowNumber <= Length.row
      this.element.find('tbody>tr').eq(rowNumber-1).before(html)
    else
      this.element.find('tbody').append(html)
    Length.row += 1
    getLength.apply(this)
    this
  
$.fn.easytable = (options) ->
  options = $.extend({}, defaults, options)
  $this = $(this)
  # Event Namespace
  Insert = "z-insert"
  Delete = "z-delete"