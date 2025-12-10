import {
  IAesConfig,
  INodeConfig,
  IServerConfig,
} from "./dotenvInterface.secret";

export const ServerConfig: IServerConfig = {
  LOCAL_BACKEND_URL: process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL as string,
  REMOTE_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL as string,
};

export const NodeConfig: INodeConfig = {
  APP_PORT: Number.parseInt(process.env.NEXT_PUBLIC_APP_PORT as string),
  APP_ENV: process.env.NEXT_PUBLIC_APP_ENV as string,
};

export const AesConfig: IAesConfig = {
  AES_ENCRYPTION_KEY: process.env.NEXT_PUBLIC_AES_ENCRYPTION_KEY as string,
};
