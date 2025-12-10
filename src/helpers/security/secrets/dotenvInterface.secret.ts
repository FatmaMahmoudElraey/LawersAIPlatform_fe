export interface IServerConfig {
  LOCAL_BACKEND_URL: string;
  REMOTE_BACKEND_URL: string;
}

export interface INodeConfig {
  APP_PORT: number;
  APP_ENV: string;
}

export interface IAesConfig {
  AES_ENCRYPTION_KEY: string;
}
