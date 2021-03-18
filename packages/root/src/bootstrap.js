import { registerApplication, start, navigateToUrl } from 'single-spa';
import {
    constructApplications,
    constructRoutes,
    constructLayoutEngine,
} from 'single-spa-layout';

const loading = "<h1>Loading...</h1>";
const error = "<h1>error</h1>";

const routes = constructRoutes({
    "routes": [
        {
            "type": "button",
            "attrs": [
                {
                    "name": "id",
                    "value": "gotoapp1"
                }
            ],
            "routes": [
                {
                    "type": "#text",
                    "value": "app1"
                }
            ]
        },
        {
            "type": "button",
            "attrs": [
                {
                    "name": "id",
                    "value": "gotoapp2"
                }
            ],
            "routes": [
                {
                    "type": "#text",
                    "value": "app2"
                }
            ]
        },
        {
            "type": "button",
            "attrs": [
                {
                    "name": "id",
                    "value": "gotoapp3"
                }
            ],
            "routes": [
                {
                    "type": "#text",
                    "value": "app3"
                }
            ]
        },
        { "type": "application", "name": "LocalApp", "loader": loading, "error": error },
        {
            "type": "div",
            "attrs": [
                {
                    "name": "id",
                    "value": "main"
                }
            ],
            "routes": [
                {
                    "type": "route", "path": "app1", "routes": [
                        { "type": "application", "name": "app1", "loader": loading, "error": error }
                    ],
                },
                {
                    "type": "route", "path": "app2", "routes": [
                        { "type": "application", "name": "app2", "loader": loading, "error": error }
                    ]
                },
                {
                    "type": "route", "path": "app3", "routes": [
                        { "type": "application", "name": "app3", "loader": loading, "error": error }
                    ]
                }
            ]
        }
    ]
});

const applications = constructApplications({
    routes,
    loadApp({ name }) {
        switch (name) {
            case 'app1':
                return import('app1/App');
            case 'app2':
                return import('app2/App');
            case 'app3':
                return import('app3/App');
            case 'LocalApp':
                return import('./local/LocalApp');
            default:
                console.log('no app here');
        }
    },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
start();
window.document.getElementById('gotoapp1').onclick = () => navigateToUrl('/app1')
window.document.getElementById('gotoapp2').onclick = () => navigateToUrl('/app2')
window.document.getElementById('gotoapp3').onclick = () => navigateToUrl('/app3')