import { ApplicationConfig } from './application-config.type';

export const applicationConfiguration = (): ApplicationConfig => {
  return {
    application: {
      environment: process.env.NODE_ENV,
      port: parseInt(process.env.APPLICATION_TOOLBOX_PORT, 10),
    },
  };
};
