import {executeSql} from "./sql/MsSqlDb";
import {getRandomId} from "./getRandomId";

export async function getAttrTermJson(attrKey: number): Promise<any> {
    let sql = `
select Ключ,Значение,ПорядокПоказа,_wooId from _АтрибутТовараЗначение where Ключ=${attrKey}
        `;

    let rowset = await executeSql(sql);

    let attrRows = rowset[0];
    let attrRow = attrRows[0];

    var data: any = {
        name: attrRow["Значение"],
        slug: getRandomId(),
        menu_order: attrRow["ПорядокПоказа"],
    };

    if (attrRow["_wooId"] > 0) {
        data.id = attrRow["_wooId"];
        delete data.slug;
    }

    return data;
}

