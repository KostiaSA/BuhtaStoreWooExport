import {executeSql} from "./sql/MsSqlDb";
import {wooPost} from "./woo";
import {getCategoryJson} from "./getCategoryJson";
import {getAttrJson} from "./getAttrJson";

export async function exportAttrs(): Promise<void> {
     let sql = `
 select Ключ,Номер from _АтрибутТовара where Номер>'' and (_wooExportTime<'20000101' OR _wooExportTime<_changeTime) order by номер
         `;

//    let sql="select Ключ,Название from _АтрибутТовара where Название>''";

    let attrRows = (await executeSql(sql))[0];

    for (let attrRow of attrRows) {

        let data = await getAttrJson(attrRow["Ключ"]);
        console.log("------- export attr  -------", data);

        let res = await wooPost("products/attributes", data);


        if (res.id) {
            await executeSql("UPDATE _АтрибутТовара SET _wooId=" + res.id + ", _wooExportTime=getdate() WHERE Ключ=" + attrRow["Ключ"]);
        }
        else {

            throw "ошибка для аттрибута '" + attrRow["Номер"] + "': " + JSON.stringify(res);
        }
    }

}

