import * as XLSX from 'xlsx'

export function exportToExcel(tableData) {
    const ws = XLSX.utils.table_to_sheet(tableData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
    const now = new Date();
    const filename = `inventoryAPP${now.toLocaleString().replace(/[/:]/g, '-')}.xlsx`
    XLSX.writeFile(wb, filename)
}