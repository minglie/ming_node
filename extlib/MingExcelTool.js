const ExcelJS = require('exceljs');

class MingExcelTool {
    worksheet;
    constructor(path,indexOrName) {
        this.path=path;
        this.indexOrName=indexOrName;
    }
    async init(){
        const workbook = new ExcelJS.Workbook();
        this.workbook=workbook;
        await workbook.xlsx.readFile(this.path);
        this.worksheet = workbook.getWorksheet(this.indexOrName);
    }

    getCell(cellName){
        const cell =this.worksheet.getCell(cellName);
        return cell.value;
    }

    getColumn(indexOrKey){
        const  col =this.worksheet.getColumn(indexOrKey);
        let r=[];
        col.eachCell((cell, rowNumber) => {
            if( "object"==typeof cell.value ){
                if(cell.value==null){
                    r.push("");
                }else{
                    r.push(cell.value.result);
                }
            }else {
                r.push(cell.value);
            }
        });
        return r;
    }

    getRow(indexOrKey){
        const  col =this.worksheet.getRow(indexOrKey);
        let r=[];
        col.eachCell((cell, rowNumber) => {
            if( "object"==typeof cell.value ){
                r.push(cell.value.result);
            }else {
                r.push(cell.value);
            }
        });
        return r;
    }

    setCell(cellName,val){
        this.worksheet.getCell(cellName).value = val;
    }

    async save(fileName){
        await this.workbook.xlsx.writeFile(fileName);
    }

}


function test(){
    const me= new MingExcelTool('hq.xlsx',1 );
    async function main(){
        await me.init();
        let c= me.getColumn(3);
        me.setCell("H4","wer")
        await me.save("D:/ming.xlsx")
        console.log(c);
    }
    main()
}

test()
module.exports = MingExcelTool;