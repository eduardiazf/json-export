'use strict';

var _xtend = require('xtend');

var _xtend2 = _interopRequireDefault(_xtend);

var _filesaver = require('filesaver.js');

var _filesaver2 = _interopRequireDefault(_filesaver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaults = {
  filename: 'download',
  type: 'excel',
  ext: 'xls'
};

var tpl = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:{{type}}" xmlns="http://www.w3.org/TR/REC-html40">';
tpl += '<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{{name}}</x:Name>';
tpl += '<x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook>';
tpl += '</xml><![endif]--></head><body><table>{{table-data}}</table></body></html>';

var jsonExport = function jsonExport(args) {
  var opts = (0, _xtend2.default)(args, defaults);

  var thead = '<thead><tr>' + opts.header.map(function (header) {
    return '<th>' + header + '</th>';
  }).join('') + '</tr></thead>';
  var tbody = '<tbody>' + opts.data.map(function (dt) {
    return '<tr>' + opts.keys.map(function (k) {
      return '<td>' + dt[k] + '</td>';
    }).join('') + '</tr>';
  }).join('') + '</tbody>';

  var data = tpl.replace('{{table-data}}', '' + thead + tbody).replace('{{type}}', opts.type);

  _filesaver2.default.saveAs(new Blob([data], {
    type: 'application/vnd.ms-excel'
  }), opts.filename + '.' + opts.ext);
};

module.exports = jsonExport;