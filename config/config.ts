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

export let wooApiConfig = {
    url: 'http://shop.buhta.ru',
    consumerKey: 'ck_2b0a8f3845bee998dd69a734f4c1dde4e6679cbb',
    consumerSecret: 'cs_0c8132d5c4c07c61f4c66b384c67ade6d06b0459',
    wpAPI: true,
    version: 'wc/v2'
};


export let config: IConfig = psWeb;
//изменено 888-999