(function() {
  var EasyTable, isArray, isFunction;

  isArray = function(obj) {
    return Object.prototype.toString.call(obj) === "[object string]";
  };

  isFunction = function(obj) {
    return Object.prototype.toString.call(obj) === "[object function]";
  };

  EasyTable = (function() {
    function EasyTable($table) {
      var $td, $tf, $th, $tr, Datas, Footer, Header, i, j, k, _i, _j, _ref, _ref1;
      this.element = $table;
      this.dom = $table[0];
      $th = $table.find('thead>tr>th');
      Header = (function() {
        var _i, _ref, _results;
        _results = [];
        for (i = _i = 0, _ref = $th.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          _results.push($th.eq(i).text());
        }
        return _results;
      })();
      $tr = $table.find('tbody>tr');
      Datas = [];
      for (j = _i = 0, _ref = $tr.length; 0 <= _ref ? _i < _ref : _i > _ref; j = 0 <= _ref ? ++_i : --_i) {
        $td = $tr.eq(j).find('td');
        for (k = _j = 0, _ref1 = $td.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; k = 0 <= _ref1 ? ++_j : --_j) {
          Datas.push($td.eq(k).text());
        }
      }
      $tf = $table.find('tfoot>tr>td');
      Footer = (function() {
        var _k, _ref2, _results;
        _results = [];
        for (i = _k = 0, _ref2 = $tf.length; 0 <= _ref2 ? _k < _ref2 : _k > _ref2; i = 0 <= _ref2 ? ++_k : --_k) {
          _results.push($tf.eq(i).text());
        }
        return _results;
      })();
      this.length = {
        row: $tr.length,
        column: $th.length
      };
      Length.row = $tr.length;
      Length.column = $th.length;
    }

    EasyTable.prototype.addRow = function(rowNumber, data) {
      var html, i, _i, _j, _ref, _ref1, _ref2, _ref3;
      if (arguments.length < 1) {
        rowNumber = Length.row + 1;
        data = [];
      } else {
        if (isArray(arguments[0]) && arguments.length === 1) {
          data = arguments[0];
          rowNumber = Length.row + 1;
        } else {
          rowNumber = parseInt(rowNumber);
          if (rowNumber === rowNumber) {
            rowNumber = (_ref = rowNumber < 1) != null ? _ref : {
              1: rowNumber
            };
            rowNumber = (_ref1 = rowNumber > Length.row) != null ? _ref1 : Length.row + {
              1: rowNumber
            };
          } else {
            'Not Found.';
          }
          data = data || [];
        }
      }
      html = '';
      html += '<tr>';
      if (isArray(data)) {
        fillArray(data, Length.column, '');
        for (i = _i = 0, _ref2 = Length.column; 0 <= _ref2 ? _i < _ref2 : _i > _ref2; i = 0 <= _ref2 ? ++_i : --_i) {
          html += '<td>' + data[i] + '</td>';
        }
        Datas.splice(rowNumber - 1, 0, data);
      } else {
        for (i = _j = 0, _ref3 = Length.column; 0 <= _ref3 ? _j < _ref3 : _j > _ref3; i = 0 <= _ref3 ? ++_j : --_j) {
          html += '<td>' + data + '</td>';
        }
        Datas.splice(rowNumber - 1, 0, fillArray([], Length.column, data));
      }
      html += '</tr>';
      if (rowNumber <= Length.row) {
        this.element.find('tbody>tr').eq(rowNumber - 1).before(html);
      } else {
        this.element.find('tbody').append(html);
      }
      Length.row += 1;
      getLength.apply(this);
      return this;
    };

    return EasyTable;

  })();

  $.fn.easytable = function(options) {
    var $this, Delete, Insert;
    options = $.extend({}, defaults, options);
    $this = $(this);
    Insert = "z-insert";
    return Delete = "z-delete";
  };

}).call(this);
