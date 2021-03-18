import ReactDOM from 'react-dom';
import React from 'react';
import singleSpaReact from 'single-spa-react';

const reactLifecycles = singleSpaReact({
    React,
    ReactDOM,
    rootComponent: () => <h1>application 1</h1>,
    errorBoundary(err, info, props) {
        // https://reactjs.org/docs/error-boundaries.html
        return (
            <div>This renders when a catastrophic error occurs</div>
        );
    },
});

export const bootstrap = reactLifecycles.bootstrap;
export const mount = reactLifecycles.mount;
export const unmount = reactLifecycles.unmount;
