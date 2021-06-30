import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {Amplify} from 'aws-amplify';
import aws_exports from './aws-exports';
import {Chart, registerables} from 'chart.js';
import * as Sentry from '@sentry/angular';
import {Integrations} from '@sentry/tracing';

Amplify.configure(aws_exports);

Chart.register(...registerables);


Sentry.init({
  dsn: 'https://c44dbc27f5e6486db3e108cb77776122@o578448.ingest.sentry.io/5839499',
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: ['localhost', 'https://yourserver.io/api'],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
  ],
  environment: environment.production ? 'production' : 'testing',
  tracesSampleRate: environment.production ? 0.2 : 1.0,
});


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
