import React from 'react';
import { render } from 'react-dom';
import { init } from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import Root from 'components/Root';
import { BUILD_TYPE } from 'constants/appConstants';
import packageJSON from '../package.json';

if (BUILD_TYPE === 'production') {
    const { BrowserTracing } = Integrations;
    const sentryDsn = process.env.SENTRY_DSN;
    init({
        dsn: sentryDsn,
        release: `${packageJSON.name}@${packageJSON.version}`,
        autoSessionTracking: true,
        integrations: [new BrowserTracing()],
        tracesSampleRate: 1.0,
    });
}

render(<Root />, document.getElementById(`root`));
