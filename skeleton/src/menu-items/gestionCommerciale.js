// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconBrandChrome, IconHelp, IconSitemap, IconSettings, IconPlayerRecord } from '@tabler/icons';

// constant
const icons = {
    IconBrandChrome,
    IconHelp,
    IconSettings,
    IconPlayerRecord,
    IconSitemap
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const gestionCommerciale = {
    id: 'gestionCommerciale',
    type: 'collapse',
    title: <FormattedMessage id="gestionCommerciale" />,
    icon: icons.IconPlayerRecord,
    children: [
        {
            id: 'categorie',
            title: <FormattedMessage id="Categorie" />,
            type: 'item',
            url: '/parametre/categorie',
            icon: icons.IconPlayerRecord,
            breadcrumbs: false
        },
        {
            id: 'article',
            title: <FormattedMessage id="Article" />,
            type: 'item',
            url: '/parametre/article',
            icon: icons.IconPlayerRecord,
            breadcrumbs: false
        }
    ]
};

export default gestionCommerciale;
