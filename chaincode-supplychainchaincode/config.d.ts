export interface IConfig {
    name: string;
    version: string;
    controller: string;
}
export declare type KV = {
    [k: string]: string;
};
export declare type Controller = {
    new (...args: any[]): any;
};
export declare class Config {
    private config;
    static readFromFile(path?: string): Config;
    constructor(config: IConfig[]);
    getPackages(): KV;
    getControllers(): Promise<Controller[]>;
    dump(): IConfig[];
}
