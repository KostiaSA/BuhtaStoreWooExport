import {executeSql} from "./sql/MsSqlDb";
import {wooPost} from "./woo";
import {getCategoryJson} from "./getCategoryJson";

export async function exportCategories(): Promise<void> {
    let sql = `
select Ключ,Номер,Название,Описание,ПорядокПоказа from _КатегорияТовара where Опубликовано=1 and (_wooExportTime<'20000101' OR _wooExportTime<_changeTime) order by len(Номер),номер
        `;

    let catRows = (await executeSql(sql))[0];

    for (let catRow of catRows) {

        let data = await getCategoryJson(catRow["Ключ"]);
        console.log("------- data -------", data);

        let res = await wooPost("products/categories", data);


        if (res.id) {
            await executeSql("UPDATE _КатегорияТовара SET _wooId=" + res.id + ", _wooExportTime=getdate() WHERE Ключ=" + catRow["Ключ"]);
        }
        else {
//            console.log("--------БЛЯ------",res.res);

            throw "ошибка для категории '" + catRow["Название"] + "': " + JSON.stringify(res);
        }
        //console.log("ans.res", ans.res);


        //console.log("ans.data", ans.data);
    }

}

