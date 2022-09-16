import { TypeormConfig } from './typeorm-config.type';

export const typeormConfiguration = (): TypeormConfig => {
  return {
    typeorm: {
      databaseUrl: process.env.APPLICATION_TOOLBOX_DATABASE_URL,
    },
  };
};
