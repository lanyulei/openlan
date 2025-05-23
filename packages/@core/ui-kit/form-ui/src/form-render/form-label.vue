<script setup lang="ts">
import type { CustomRenderType } from '../types';

import {
  FormLabel,
  OpenLanHelpTooltip,
  OpenLanRenderContent,
} from '@vben-core/shadcn-ui';
import { cn } from '@vben-core/shared/utils';

interface Props {
  class?: string;
  colon?: boolean;
  help?: CustomRenderType;
  label?: CustomRenderType;
  required?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <FormLabel :class="cn('flex items-center', props.class)">
    <span v-if="required" class="text-destructive mr-[2px]">*</span>
    <slot></slot>
    <OpenLanHelpTooltip v-if="help" trigger-class="size-3.5 ml-1">
      <OpenLanRenderContent :content="help" />
    </OpenLanHelpTooltip>
    <span v-if="colon && label" class="ml-[2px]">:</span>
  </FormLabel>
</template>
