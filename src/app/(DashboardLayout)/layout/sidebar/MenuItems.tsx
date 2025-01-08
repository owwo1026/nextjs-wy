import { IconLayoutDashboard, IconUserPlus } from '@tabler/icons-react';
import { routes } from '@/config/routes';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    // navLabel: false,
    id: uniqueId(),
    title: '儀表板',
    icon: IconLayoutDashboard,
    href: '/',
  },
  {
    // navLabel: true,
    subheader: '帳號管理',
    items: [
      {
        id: uniqueId(),
        title: '使用者',
        icon: IconUserPlus,
        href: routes.account.user.list,
      },
    ],
  },
];

export default Menuitems;
