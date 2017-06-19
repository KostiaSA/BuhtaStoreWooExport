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
    consumerKey: 'ck_840ad78c648fade181ed3c10ff1688c0e20ec2ff',
    consumerSecret: 'cs_6eaca7680e3cb619bd92b712a55d4592ade39fe1',
    wpAPI: true,
    version: 'wc/v2'
};


export let config: IConfig = psWeb;
//изменено 888-999