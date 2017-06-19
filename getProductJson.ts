import {executeSql} from "./sql/MsSqlDb";

export async function getProductJson(tmcKey: number): Promise<any> {
    let sql =`
select * from ТМЦ where Ключ=${tmcKey}
        `;

    let rowset = await executeSql(sql);

    let tmcRows = rowset[0];
    let tmcRow = tmcRows[0];


    var data = {
        name: tmcRow["Название"],
        sku: tmcRow["Номер"],
        type: "simple",
        regular_price: tmcRow["_Цена"],
        description: tmcRow["_КороткоеОписание"],
        short_description: tmcRow["[_ПолноеОписание]"],
        categories: [
            {
                id: 9
            },
            {
                id: 14
            }
        ],
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

}

export async function getProductCategoriesJson(tmcKey: number): Promise<any> {
    let sql = "select * from ТМЦ where Ключ=" + tmcKey;
    let tmcRows = await executeSql(sql);
    let tmcRow = tmcRows[0];


    var data = {
        name: tmcRow["Название"],
        sku: tmcRow["Номер"],
        type: "simple",
        regular_price: tmcRow["_Цена"],
        description: tmcRow["_КороткоеОписание"],
        short_description: tmcRow["[_ПолноеОписание]"],
        categories: [
            {
                id: 9
            },
            {
                id: 14
            }
        ],
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

}