export interface IConfig {
    sqlServerAddress: string;
    sqlServerInstance: string;
    sqlServerPort: number;
    sqlLogin: string;
    sqlPassword: string;
    sqlDatabase: string;
}

let psWeb: IConfig = {
    sqlServerAddress: "ps-web",
    sqlServerInstance: "",
    sqlServerPort: 1433,
    sqlLogin: "sa1",
    sqlPassword: "sonyk",
    sqlDatabase: "BuhtaStore",

};

// export let wooApiConfig = {  shop.buhta.ru
//     url: 'http://shop.buhta.ru',
//     consumerKey: 'ck_32eb45e32df293bfacdd854bc01e49133dbef3c3',
//     consumerSecret: 'cs_ca27d3eba6c68416f2c471f22cb3e950230901e0',
//     wpAPI: true,
//     version: 'wc/v2'
// };
export let wooApiConfig = {
    url: 'http://cl76861-wordpress-3.tw1.ru',
    consumerKey: 'ck_897daae43090574752a999898b32a8a8c586efd0',
    consumerSecret: 'cs_986c95467c1b87641df8143dfea6ddb67cf16625',
    wpAPI: true,
    version: 'wc/v2'
};


export let config: IConfig = psWeb;
//изменено 888-999