import type { RouteRecordRaw } from 'vue-router';

import {
  VBEN_ANT_PREVIEW_URL,
  VBEN_DOC_URL,
  VBEN_GITHUB_URL,
  VBEN_LOGO_URL,
  VBEN_NAIVE_PREVIEW_URL,
} from '@vben/constants';
import { SvgAntdvLogoIcon } from '@vben/icons';

import { IFrameView } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      badgeType: 'dot',
      icon: VBEN_LOGO_URL,
      order: 9998,
      title: $t('demos.openlan.title'),
    },
    name: 'OpenLanProject',
    path: '/openlan-admin',
    children: [
      {
        name: 'OpenLanDocument',
        path: '/openlan-admin/document',
        component: IFrameView,
        meta: {
          icon: 'lucide:book-open-text',
          link: VBEN_DOC_URL,
          title: $t('demos.openlan.document'),
        },
      },
      {
        name: 'OpenLanGithub',
        path: '/openlan-admin/github',
        component: IFrameView,
        meta: {
          icon: 'mdi:github',
          link: VBEN_GITHUB_URL,
          title: 'Github',
        },
      },
      {
        name: 'OpenLanNaive',
        path: '/openlan-admin/naive',
        component: IFrameView,
        meta: {
          badgeType: 'dot',
          icon: 'logos:naiveui',
          link: VBEN_NAIVE_PREVIEW_URL,
          title: $t('demos.openlan.naive-ui'),
        },
      },
      {
        name: 'OpenLanAntd',
        path: '/openlan-admin/antd',
        component: IFrameView,
        meta: {
          badgeType: 'dot',
          icon: SvgAntdvLogoIcon,
          link: VBEN_ANT_PREVIEW_URL,
          title: $t('demos.openlan.antdv'),
        },
      },
    ],
  },
  {
    name: 'OpenLanAbout',
    path: '/openlan-admin/about',
    component: () => import('#/views/_core/about/index.vue'),
    meta: {
      icon: 'lucide:copyright',
      title: $t('demos.openlan.about'),
      order: 9999,
    },
  },
];

export default routes;
