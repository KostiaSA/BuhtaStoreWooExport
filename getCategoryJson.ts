import {executeSql} from "./sql/MsSqlDb";
import {getRandomId} from "./getRandomId";
import {translit} from "./translit";

export async function getCategoryJson(categoryKey: number): Promise<any> {
    let sql = `
select _wooId,Ключ,Номер,Название,Описание,ПорядокПоказа,[dbo].[_РодительскаяКатегорияТовара_wooId](Ключ) parent from _КатегорияТовара where Ключ=${categoryKey}
        `;

    let rowset = await executeSql(sql);

    let catRows = rowset[0];
    let catRow = catRows[0];

    var data: any = {
        name: catRow["Название"],
        description: catRow["Описание"],
        menu_order: catRow["ПорядокПоказа"],
        slug: translit(catRow["Название"]),
    };

    if (catRow["_wooId"] > 0){
        data.id = catRow["_wooId"];
        delete data.slug;
    }

    if (catRow["parent"] > 0)
        data.parent = catRow["parent"];

    return data;
}

