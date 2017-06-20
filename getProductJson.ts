import {executeSql} from "./sql/MsSqlDb";
import {getRandomId} from "./getRandomId";
import {translit} from "./translit";

export async function getProductJson(tmcKey: number): Promise<any> {
    let sql = `
select 
  Номер,
  Название,
  _Цена,
  _КороткоеОписание,
  _ПолноеОписание,
  _wooId,
  (SELECT _wooId FROM _КатегорияТовара WHERE _КатегорияТовара.Ключ=ТМЦ._КатегорияТовара) Category
from ТМЦ 
where Ключ=${tmcKey}
`;
    let tmcRows = (await executeSql(sql))[0];
    let tmcRow = tmcRows[0];


    var data:any = {
        name: tmcRow["Название"],
        sku: tmcRow["Номер"],
        slug: translit(tmcRow["Номер"])+"-"+tmcRow["Ключ"],
        type: "simple",
        regular_price: tmcRow["_Цена"].toString(),
        description: tmcRow["_КороткоеОписание"],
        short_description: tmcRow["_ПолноеОписание"],
        categories: [
            {
                id: tmcRow["Category"]
            }
        ],
        attributes: await getProductAttributesJson(tmcKey)
        // images: [
        //     {
        //         src: 'http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_front.jpg',
        //         position: 0
        //     },
        //     {
        //         src: 'http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_back.jpg',
        //         position: 1
        //     }
        // ]
    };

    if (tmcRow["_wooId"] > 0) {
        data.id = tmcRow["_wooId"];
        delete data.slug;
    }

    return data;
}

export async function getProductAttributesJson(tmcKey: number): Promise<any[]> {
    let sql = `
SELECT
[_ТМЦ_ПривязкаАтрибутов.ЗначениеАтрибута._АтрибутТовара].Номер name,
[_ТМЦ_ПривязкаАтрибутов.ЗначениеАтрибута._АтрибутТовара]._wooId id,
[_ТМЦ_ПривязкаАтрибутов.ЗначениеАтрибута._АтрибутТовара].[ПорядокПоказа] position,
[_ТМЦ_ПривязкаАтрибутов.ЗначениеАтрибута].[Значение] options
--[_ТМЦ_ПривязкаАтрибутов].[Ключ] [Ключ],
--[_ТМЦ_ПривязкаАтрибутов.ТМЦ].[Номер и название] [ТМЦ],
--[_ТМЦ_ПривязкаАтрибутов.ТМЦ].ключ [ТМЦ-ключ],
FROM [_ТМЦ_ПривязкаАтрибутов view] [_ТМЦ_ПривязкаАтрибутов] WITH(NOLOCK)
LEFT OUTER JOIN [_АтрибутТовараЗначение view] [_ТМЦ_ПривязкаАтрибутов.ЗначениеАтрибута]  WITH(NOLOCK)
LEFT OUTER JOIN [_АтрибутТовара view] [_ТМЦ_ПривязкаАтрибутов.ЗначениеАтрибута._АтрибутТовара]  WITH(NOLOCK)
ON [_ТМЦ_ПривязкаАтрибутов.ЗначениеАтрибута._АтрибутТовара].[Ключ]=[_ТМЦ_ПривязкаАтрибутов.ЗначениеАтрибута].[_АтрибутТовара]
ON [_ТМЦ_ПривязкаАтрибутов.ЗначениеАтрибута].[Ключ]=[_ТМЦ_ПривязкаАтрибутов].[ЗначениеАтрибута]
LEFT OUTER JOIN [ТМЦ view] [_ТМЦ_ПривязкаАтрибутов.ТМЦ]  WITH(NOLOCK)
ON [_ТМЦ_ПривязкаАтрибутов.ТМЦ].[Ключ]=[_ТМЦ_ПривязкаАтрибутов].[ТМЦ]
where 
  [_ТМЦ_ПривязкаАтрибутов.ТМЦ].ключ=${tmcKey} and 
  [_ТМЦ_ПривязкаАтрибутов.ЗначениеАтрибута].[Значение]>''
`;
    let attrsRows = (await executeSql(sql))[0];

    let data = [];

    for (let row of attrsRows) {
        data.push({
            id: row["id"],
            name: row["name"],
            position: row["position"],
            options: [row["options"].toString()]
        });
    }

    return data;

}