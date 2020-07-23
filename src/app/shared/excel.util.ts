import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

export class ExcelUtils {
  constructor() {
  }

  public static exportAsExcelFile(objects: any[], excelFileName: string, options?: any): void {
    const data = objects;
    if (!data || data.length === 0) {
      return;
    }

    let worksheet: XLSX.WorkSheet;

    let header = {};

    if (options !== undefined) {
      if (options.headerObject) {
        header = options.headerObject;
      } else if (options.headerJsonKeys) {
        const k = Object.keys(data[0]);
        k.forEach(e => {
          let t = e;
          if (options.headerDictionary) {
            if (options.headerDictionary[t]) {
              t = options.headerDictionary[t];
            }
          }
          header[e] = t;
        });
      }
    }

    data.map(c => {
      const k = Object.keys(data[0]);
      k.forEach((e: any) => {
        if (c[e] instanceof Date) {
          const d = c[e].toLocaleString();
          delete c[e];
          c[e] = d;
        }
      });
    });

    if (header) {
      data.unshift(header);
      worksheet = XLSX.utils.json_to_sheet(data, { skipHeader: true });
    } else {
      worksheet = XLSX.utils.json_to_sheet(data);
    }
    const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private static saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
