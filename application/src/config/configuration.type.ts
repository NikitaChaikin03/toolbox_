import { ApplicationConfig } from './application';
import { TypeormConfig } from './typeorm';

export interface Config extends ApplicationConfig, TypeormConfig {}
