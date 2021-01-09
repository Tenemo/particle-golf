import React from 'react';
import { render } from 'react-dom';
import { init } from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import Root from 'components/Root';

const { BrowserTracing } = Integrations;

const sentryDsn = process.env.SENTRY_DSN;

init({
    dsn: sentryDsn,
    autoSessionTracking: true,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
});

render(<Root />, document.getElementById(`root`));
