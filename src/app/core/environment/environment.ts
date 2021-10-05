import {InjectionToken} from "@angular/core";

export const ENVIRONMENT = new InjectionToken<Environment>('Environment')

export interface Environment {
  production: boolean,
  apiUrl: string
}
