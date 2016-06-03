import jsonExport from '../json-export';
import jsonData from './json-data';


const btnExcel = document.getElementById('btn-excel');

btnExcel.addEventListener('click', () => {
  jsonExport({
    type: 'excel',
    data: jsonData,
    keys: ['name', 'age'],
    header: ['Nombre', 'Edad'],
  });
});
