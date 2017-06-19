import {executeSql} from "./sql/MsSqlDb";
import {exportCategories} from "./exportCategories";
import {exportAttrs} from "./exportAttrs";
import {exportAttrTerms} from "./exportAttrTerms";
var WooCommerceAPI = require('woocommerce-api');

//
// var WooCommerce = new WooCommerceAPI({
//     url: 'http://192.168.0.90',
//     consumerKey: 'ck_c5aeebf053155260dd790fc2f7db0091681852d9',
//     consumerSecret: 'cs_cb0e21e1d1ca1ab561ad581d56f01e708dfff3d3',
//     wpAPI: true,
//     version: 'wc/v1'
// });

var WooCommerce = new WooCommerceAPI({
    url: 'http://shop.buhta.ru',
    consumerKey: 'ck_2b0a8f3845bee998dd69a734f4c1dde4e6679cbb',
    consumerSecret: 'cs_0c8132d5c4c07c61f4c66b384c67ade6d06b0459',
    wpAPI: true,
    version: 'wc/v2'
});


//console.log(WooCommerce);

// WooCommerce.get('', function(err:any, data:any, res:any) {
//     console.log(err,data,res);
// });

// WooCommerce.get('products', function(err:any, data:any, res:any) {
//     console.log(err);
//     console.log(data);
//     console.log(res);
// });

// var data = {
//     name: 'Premium Quality 222',
//     type: 'simple',
//     regular_price: '4100.00',
//     description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.',
//     short_description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
//     categories: [
//         {
//             id: 9
//         },
//         {
//             id: 14
//         }
//     ],
//     images: [
//         {
//             src: 'http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_front.jpg',
//             position: 0
//         },
//         {
//             src: 'http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_back.jpg',
//             position: 1
//         }
//     ]
// };
//
// WooCommerce.post('products', data, function(err:any, data:any, res:any) {
//     if (err)
//     console.error(err);
//     // if (data)
//     //     console.log("data",data);
//     if (res)
//         console.log("res",res);
// });

//let sql = "select top 1 Номер,Название from ТМЦ where Ключ=6 select top 1 Номер,Название from ТМЦ where Ключ=7 ";
//let tmcRows = executeSql(sql).then((res)=>{console.log(res)});



exportCategories()
    .then(() => {
        console.log("exportCategories Ok");

        exportAttrs()
            .then(() => {
                console.log("exportAttrs Ok");

                exportAttrTerms()
                    .then(() => {
                        console.log("exportAttrTerms Ok");
                    })
                    .catch((err) => {
                        console.error("exportAttrTerms ", err);
                    });


            })
            .catch((err) => {
                console.error("exportAttrs ", err);
            });

    })
    .catch((err) => {
        console.error("exportCategories ", err);
    });

