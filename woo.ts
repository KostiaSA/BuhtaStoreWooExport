import {wooApiConfig} from "./config/config";
var WooCommerceAPI = require('woocommerce-api');

var WooCommerce = new WooCommerceAPI(wooApiConfig);

export async function wooGet(method: string, data: any): Promise<any> {
    return new Promise<any>(
        (resolve: (obj: any) => void, reject: (error: string) => void) => {

            WooCommerce.get(method, data, function (err: any, data: any, res: any) {
                if (err) {
                    console.error(err);
                    reject(err.toString());
                }
                else
                    resolve({res, data});
            });

        });

}
export async function wooPost(method: string, data: any): Promise<any> {
    return new Promise<any>(
        (resolve: (obj: any) => void, reject: (error: string) => void) => {

            WooCommerce.post(method, data, function (err: any, data: any, res: any) {
                if (err) {
                    console.error(err);
                    reject(err.toString());
                }
                else
                    resolve(JSON.parse(res));
            });

        });

}

