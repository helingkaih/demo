import { Redirect } from 'react-router-dom';
import Home from "../pages/home/home";
import Workbench from '../pages/workbench/workbench';
import Setting from '../pages/setting/setting';
import Pagea from "../pages/pagea/pagea";
import Pageb from '../pages/pageb/pageb';
import Pagec from '../pages/pagec/pagec';
import Paged from '../pages/paged/paged';
import Pagee from '../pages/pagee/pagee';

const routeConfig = [
    {
        path: "/",
        exact: true,
        render: () => (
            <Redirect to={"/home/pagea"} />
        )
    },
    {
        path: "/home",
        component: Home,
        routes: [
            {
                path: "/home/pagea",
                component: Pagea,
            },
            {
                path: "/home/pageb",
                component: Pageb,
            },
            {
                path: "/home/pagec",
                component: Pagec,
            }
        ]
    },
    {
        path: "/workbench",
        component: Workbench,
        routes: [
            {
                path: "/workbench/paged",
                exact: true,
                component: Paged,
            }
        ]
    },
    {
        path: "/setting",
        component: Setting,
        routes: [
            {
                path: "/setting",
                exact: true,
                render: () => (
                    <Redirect to={"/setting/pagee"} />
                )
            },
            {
                path: "/setting/pagee",
                exact: true,
                component: Pagee,
            }
        ]
    }
];
export default routeConfig;