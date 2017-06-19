import {executeSql} from "./sql/MsSqlDb";
import {exportCategories} from "./exportCategories";
import {exportAttrs} from "./exportAttrs";
import {exportAttrTerms} from "./exportAttrTerms";
var WooCommerceAPI = require('woocommerce-api');

var WooCommerce = new WooCommerceAPI({
    url: 'http://shop.buhta.ru',
    consumerKey: 'ck_2b0a8f3845bee998dd69a734f4c1dde4e6679cbb',
    consumerSecret: 'cs_0c8132d5c4c07c61f4c66b384c67ade6d06b0459',
    wpAPI: true,
    version: 'wc/v2'
});

WooCommerce.get('products/attributes', function(err:any, data:any, res:any) {

    var fs = require('fs');
    fs.writeFile("c:/$/xxx.json", res, function(err:any) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
    console.log(res);
});

