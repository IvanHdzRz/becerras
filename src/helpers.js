
// headers must be a string array
//rows must be a object array
function createTable({headers,rows}){
    const table= document.createElement("table");
    const tableHeadersContainer = document.createElement("thead");
    const tableBody = document.createElement("tbody")
    headers.forEach(header => {
        const tableHeader = document.createElement("th")
        tableHeader.innerText=header;
        tableHeadersContainer.appendChild(tableHeader);
    });

    rows.forEach(row=>{
        const rowData = Object.values(row);
        const tableRow = document.createElement("tr")
        
        rowData.forEach(item=>{
           const tableData = document.createElement("td")
           tableData.innerHTML=item
           tableRow.appendChild(tableData)
        })
        tableBody.appendChild(tableRow);
    })
    table.appendChild(tableHeadersContainer)
    table.appendChild(tableBody)
    return table;
}

module.exports.createTable = createTable;