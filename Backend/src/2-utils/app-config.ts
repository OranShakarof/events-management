class AppConfig {
    public readonly port = 4000;
    public readonly mongodbConnectionString = "mongodb://127.0.0.1:27017/events-management";
}

const appConfig = new AppConfig();

export default appConfig;
