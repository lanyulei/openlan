<script lang="ts" setup>
import { OpenLanSpinner } from '@vben-core/shadcn-ui';

import { useContentSpinner } from './use-content-spinner';

defineOptions({ name: 'LayoutContentSpinner' });

const { spinning } = useContentSpinner();
</script>
<template>
  <OpenLanSpinner :spinning="spinning" />
</template>
