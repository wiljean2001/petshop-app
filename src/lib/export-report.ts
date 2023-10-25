import * as XLSX from 'xlsx'
// import jsPDF from "jspdf";
// import "jspdf-autotable";
/**
 * TODO: NEED TO BE CUSTOM PDF
 * @params data: Get the data from the table
 */
// export function exportToPDF(data: any[]) {
//   // Create a new PDF document
//   const doc = new jsPDF();

//   // Prepare the data for the table
//   const tableData = data.map((item) => {
//     const rowData = [];
//     for (const key in item) {
//       if (item.hasOwnProperty(key)) {
//         rowData.push(item[key].toString());
//       }
//     }
//     return rowData;
//   });

//   // Set the column headers for the table
//   const headers = Object.keys(data[0]);

//   // Set the initial position for the table
//   let yPos = 40;

//   // Set the padding for the table cells
//   const cellPadding = 5;

//   // Draw the column headers
//   headers.forEach((header, colIndex) => {
//     doc.text(header, cellPadding + colIndex * 50, yPos);
//   });

//   // Draw the table data
//   tableData.forEach((rowData, rowIndex) => {
//     yPos += 10; // Increase the row height for the next row
//     rowData.forEach((cellData, colIndex) => {
//       doc.text(cellData, cellPadding + colIndex * 50, yPos);
//     });
//   });

//   // Generate the PDF file and trigger a download
//   doc.save("data.pdf");
// }

export function exportToXLSX<T>(data: T[]) {
  // Get the data from the table
  // Create a new workbook
  const wb = XLSX.utils.book_new()

  // Convert the data to a worksheet
  const ws = XLSX.utils.json_to_sheet(data)

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

  // Generate the Excel file and trigger a download
  XLSX.writeFile(wb, 'data.xlsx')
}
