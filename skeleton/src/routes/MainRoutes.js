import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const Categories = Loadable(lazy(() => import('views/pages/gestionCommerciale/categorie/')));
const Articles = Loadable(lazy(() => import('views/pages/gestionCommerciale/article')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/sample-page',
            element: <SamplePage />
        },
        {
            path: '/parametre/categorie',
            element: <Categories />
        },
        {
            path: '/parametre/article',
            element: <Articles />
        }
    ]
};

export default MainRoutes;
