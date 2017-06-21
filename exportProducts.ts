import {executeSql} from "./sql/MsSqlDb";
import {wooPost} from "./woo";
import {getCategoryJson} from "./getCategoryJson";
import {getProductJson} from "./getProductJson";

export async function exportProducts(): Promise<void> {
    let sql = `
select Ключ,Название from ТМЦ where _Опубликовано=1 and (_wooExportTime<'20000101' OR _wooExportTime<_changeTime) order by Номер
        `;

    let tmcRows = (await executeSql(sql))[0];

    for (let tmcRow of tmcRows) {

        let data = await getProductJson(tmcRow["Ключ"]);
        console.log("--- export ТМЦ --- : ", data.description);


        let method = "products";
        if (data.id)
            method = "products/" + data.id;

        let res = await wooPost(method, data);

        if (res.id) {
            await executeSql("UPDATE ТМЦ SET _wooId=" + res.id + ", _wooExportTime=getdate() WHERE Ключ=" + tmcRow["Ключ"]);
        }
        else {

            throw "ошибка для ТМЦ '" + tmcRow["Название"] + "': " + JSON.stringify(res);
        }
    }

}

