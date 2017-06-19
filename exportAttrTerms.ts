import {executeSql} from "./sql/MsSqlDb";
import {wooPost} from "./woo";
import {getCategoryJson} from "./getCategoryJson";
import {getAttrJson} from "./getAttrJson";
import {getAttrTermJson} from "./getAttrTermJson";

export async function exportAttrTerms(): Promise<void> {
    let sql = `
select 
  Ключ,
  Значение,
  (select Номер from _АтрибутТовара where _АтрибутТовара.Ключ=_АтрибутТовараЗначение._АтрибутТовара) wooProductName,
  (select _wooId from _АтрибутТовара where _АтрибутТовара.Ключ=_АтрибутТовараЗначение._АтрибутТовара) wooProduct
from _АтрибутТовараЗначение 
where Значение>'' AND ( _wooExportTime<'20000101' OR _wooExportTime<_changeTime) 
order by Ключ
        `;

    let attrRows = (await executeSql(sql))[0];

    for (let attrRow of attrRows) {

        let data = await getAttrTermJson(attrRow["Ключ"]);
        console.log("------- export attr term  --for--"+attrRow["wooProductName"]+"/"+attrRow["wooProduct"], data);

        let res = await wooPost("products/attributes/" + attrRow["wooProduct"] + "/terms", data);


        if (res.id) {
            await executeSql("UPDATE _АтрибутТовараЗначение SET _wooId=" + res.id + ", _wooExportTime=getdate() WHERE Ключ=" + attrRow["Ключ"]);
        }
        else {

            throw "ошибка для аттрибута '" + attrRow["Значение"] + "': " + JSON.stringify(res);
        }
    }

}

