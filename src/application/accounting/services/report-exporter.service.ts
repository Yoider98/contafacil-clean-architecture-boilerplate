import * as xlsx from 'xlsx';
const PdfPrinter = require('pdfmake');
import type {TDocumentDefinitions, TableCell} from 'pdfmake/interfaces';

export interface ReportColumn {
  header: string;
  key: string;
  width?: number | string; // For PDF, e.g. '*' or 100
  format?: 'currency' | 'text' | 'number';
}

export class ReportExporterService {
  constructor()  { /* Inyectado por constructor */ }

  /**
   * Exporta un arreglo de datos a un buffer de Excel (.xlsx)
   */
  exportToExcel(
    data: any[],
    columns: ReportColumn[],
    sheetName: string = 'Reporte',
  ): Buffer  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  };
      columns.forEach(col => {
        row[col.header] = item[col.key];
      });
      return row;
    });

    const worksheet = xlsx.utils.json_to_sheet(mappedData);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);

    // Formatear como buffer
    const excelBuffer = xlsx.write(workbook, {
      type: 'buffer',
      bookType: 'xlsx',
    });

    return excelBuffer;
  }

  /**
   * Exporta un arreglo de datos a un buffer de PDF utilizando pdfmake
   */
  exportToPdf(
    data: any[],
    columns: ReportColumn[],
    title: string = 'Reporte Financiero',
  ): Promise<Buffer>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  },
        };

        const printer = new PdfPrinter(fonts);

        // Crear encabezados
        const tableHeaders: TableCell[] = columns.map(col => ({
          text: col.header,
          style: 'tableHeader',
        }));

        // Crear filas
        const tableBody: TableCell[][] = data.map(item => {
          return columns.map(col => {
            let val = item[col.key];
            if (col.format === 'currency')  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }).format(val || 0);
            }
            return {
              text: val != null ? String(val) : '',
              style: col.format === 'currency' ? 'numberCell' : 'defaultCell',
            };
          });
        });

        // Definir anchos de columna (si se proveen, si no, usa '*')
        const widths = columns.map(col => col.width || '*');

        const docDefinition: TDocumentDefinitions =  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  },
          content: [
            {text: title, style: 'header'},
            {text: `Generado el: ${new Date().toLocaleString()}`, margin: [0, 0, 0, 20]},
            {
              table: {
                headerRows: 1,
                widths,
                body: [tableHeaders, ...tableBody],
              },
              layout: 'lightHorizontalLines',
            },
          ],
          styles: {
            header: {
              fontSize: 18,
              bold: true,
              margin: [0, 0, 0, 10],
            },
            tableHeader: {
              bold: true,
              fontSize: 12,
              color: 'black',
              fillColor: '#eeeeee',
            },
            defaultCell: {
              fontSize: 10,
            },
            numberCell: {
              fontSize: 10,
              alignment: 'right',
            },
          },
          pageOrientation: columns.length > 5 ? 'landscape' : 'portrait',
        };

        const pdfDoc = printer.createPdfKitDocument(docDefinition);
        const chunks: Buffer[] = [];

        pdfDoc.on('data', (chunk: Buffer) => {
          chunks.push(chunk);
        });

        pdfDoc.on('end', () => {
          const result = Buffer.concat(chunks);
          resolve(result);
        });

        pdfDoc.on('error', (err: Error) => {
          reject(err);
        });

        pdfDoc.end();
      } catch (error)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
    });
  }
}
