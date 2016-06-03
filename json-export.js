import xtend from 'xtend';
import FileSaver from 'filesaver.js';


const defaults = {
  filename: 'download',
  type: 'excel',
  ext: 'xls',
};

let tpl = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:{{type}}" xmlns="http://www.w3.org/TR/REC-html40">'
  tpl += '<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{{name}}</x:Name>'
  tpl += '<x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook>'
  tpl += '</xml><![endif]--></head><body><table>{{table-data}}</table></body></html>';

const jsonExport = (args) => {
  const opts = xtend(args, defaults);

  const thead = `<thead><tr>${opts.header.map((header) => (`<th>${header}</th>`)).join('')}</tr></thead>`;
  const tbody = `<tbody>${opts.data.map((dt) => (`<tr>${opts.keys.map((k) => (`<td>${dt[k]}</td>`)).join('')}</tr>`)).join('')}</tbody>`;

  const data = tpl.replace('{{table-data}}', `${thead}${tbody}`).replace('{{type}}', opts.type);

  FileSaver.saveAs(new Blob([data], {
    type: 'application/vnd.ms-excel',
  }), `${opts.filename}.${opts.ext}`);
}

module.exports = jsonExport;
