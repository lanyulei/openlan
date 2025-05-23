<script lang="ts" setup>
import { Settings } from '@vben/icons';

import { OpenLanIconButton } from '@vben-core/shadcn-ui';

import Preferences from './preferences.vue';

const emit = defineEmits<{ clearPreferencesAndLogout: [] }>();

function clearPreferencesAndLogout() {
  emit('clearPreferencesAndLogout');
}
</script>
<template>
  <Preferences @clear-preferences-and-logout="clearPreferencesAndLogout">
    <OpenLanIconButton>
      <Settings class="text-foreground size-4" />
    </OpenLanIconButton>
  </Preferences>
</template>
