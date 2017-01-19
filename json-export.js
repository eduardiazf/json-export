import xtend from 'xtend';
import { Base64 } from 'js-base64';


const defaults = {
  filename: 'download',
  type: 'excel',
  ext: 'xls',
};

let tpl = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:{{type}}" xmlns="http://www.w3.org/TR/REC-html40">'
  tpl += '<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>download</x:Name>'
  tpl += '<x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook>'
  tpl += '</xml><![endif]--></head><body><table>{{table-data}}</table></body></html>';

const join = (arr) => (arr.join(''));

const jsonExport = (args) => {
  const opts = xtend(defaults, args);

  const thead = `<thead><tr>${opts.header.map((header) => (`<th>${header}</th>`)).join('')}</tr></thead>`;

  const tbody = `<tbody>${opts.data.map((dt) => (`<tr>${opts.keys.map((k) => (`<td>${dt[k]}</td>`)).join('')}</tr>`)).join('')}</tbody>`;

  const data = tpl.replace('{{table-data}}', `${thead}${tbody}`).replace('{{type}}', opts.type);
	const base64Data = Base64.encode(data);

	window.open(`data:application/vnd.ms-${opts.type};filename=${opts.filename}.${opts.ext};base64,${base64Data}`);
}

module.exports = jsonExport;
