<script lang="ts" setup>
import type { Component } from 'vue';

import type { AlertProps } from './alert';

import { computed, h, nextTick, ref } from 'vue';

import { useSimpleLocale } from '@vben-core/composables';
import {
  CircleAlert,
  CircleCheckBig,
  CircleHelp,
  CircleX,
  Info,
  X,
} from '@vben-core/icons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  OpenLanButton,
  OpenLanLoading,
  OpenLanRenderContent,
} from '@vben-core/shadcn-ui';
import { globalShareState } from '@vben-core/shared/global-state';
import { cn } from '@vben-core/shared/utils';

import { provideAlertContext } from './alert';

const props = withDefaults(defineProps<AlertProps>(), {
  bordered: true,
  buttonAlign: 'end',
  centered: true,
  containerClass: 'w-[520px]',
});
const emits = defineEmits(['closed', 'confirm', 'opened']);
const open = defineModel<boolean>('open', { default: false });
const { $t } = useSimpleLocale();
const components = globalShareState.getComponents();
const isConfirm = ref(false);

function onAlertClosed() {
  emits('closed', isConfirm.value);
  isConfirm.value = false;
}

function onEscapeKeyDown() {
  isConfirm.value = false;
}

const getIconRender = computed(() => {
  let iconRender: Component | null = null;
  if (props.icon) {
    if (typeof props.icon === 'string') {
      switch (props.icon) {
        case 'error': {
          iconRender = h(CircleX, {
            style: { color: 'hsl(var(--destructive))' },
          });
          break;
        }
        case 'info': {
          iconRender = h(Info, { style: { color: 'hsl(var(--info))' } });
          break;
        }
        case 'question': {
          iconRender = CircleHelp;
          break;
        }
        case 'success': {
          iconRender = h(CircleCheckBig, {
            style: { color: 'hsl(var(--success))' },
          });
          break;
        }
        case 'warning': {
          iconRender = h(CircleAlert, {
            style: { color: 'hsl(var(--warning))' },
          });
          break;
        }
        default: {
          iconRender = null;
          break;
        }
      }
    }
  } else {
    iconRender = props.icon ?? null;
  }
  return iconRender;
});

function doCancel() {
  handleCancel();
  handleOpenChange(false);
}

function doConfirm() {
  handleConfirm();
  handleOpenChange(false);
}

provideAlertContext({
  doCancel,
  doConfirm,
});

function handleConfirm() {
  isConfirm.value = true;
  emits('confirm');
}

function handleCancel() {
  isConfirm.value = false;
}

const loading = ref(false);
async function handleOpenChange(val: boolean) {
  await nextTick(); // 等待标记isConfirm状态
  if (!val && props.beforeClose) {
    loading.value = true;
    try {
      const res = await props.beforeClose({ isConfirm: isConfirm.value });
      if (res !== false) {
        open.value = false;
      }
    } finally {
      loading.value = false;
    }
  } else {
    open.value = val;
  }
}
</script>
<template>
  <AlertDialog :open="open" @update:open="handleOpenChange">
    <AlertDialogContent
      :open="open"
      :centered="centered"
      :overlay-blur="overlayBlur"
      @opened="emits('opened')"
      @closed="onAlertClosed"
      @escape-key-down="onEscapeKeyDown"
      :class="
        cn(
          containerClass,
          'left-0 right-0 mx-auto flex max-h-[80%] flex-col p-0 duration-300 sm:rounded-[var(--radius)] md:w-[520px] md:max-w-[80%]',
          {
            'border-border border': bordered,
            'shadow-3xl': !bordered,
          },
        )
      "
    >
      <div :class="cn('relative flex-1 overflow-y-auto p-3', contentClass)">
        <AlertDialogTitle v-if="title">
          <div class="flex items-center">
            <component :is="getIconRender" class="mr-2" />
            <span class="flex-auto">{{ $t(title) }}</span>
            <AlertDialogCancel v-if="showCancel" as-child>
              <OpenLanButton
                variant="ghost"
                size="icon"
                class="rounded-full"
                :disabled="loading"
                @click="handleCancel"
              >
                <X class="text-muted-foreground size-4" />
              </OpenLanButton>
            </AlertDialogCancel>
          </div>
        </AlertDialogTitle>
        <AlertDialogDescription>
          <div class="m-4 min-h-[30px]">
            <OpenLanRenderContent :content="content" render-br />
          </div>
          <OpenLanLoading v-if="loading && contentMasking" :spinning="loading" />
        </AlertDialogDescription>
        <div
          class="flex items-center justify-end gap-x-2"
          :class="`justify-${buttonAlign}`"
        >
          <OpenLanRenderContent :content="footer" />
          <AlertDialogCancel v-if="showCancel" as-child>
            <component
              :is="components.DefaultButton || OpenLanButton"
              :disabled="loading"
              variant="ghost"
              @click="handleCancel"
            >
              {{ cancelText || $t('cancel') }}
            </component>
          </AlertDialogCancel>
          <AlertDialogAction as-child>
            <component
              :is="components.PrimaryButton || OpenLanButton"
              :loading="loading"
              @click="handleConfirm"
            >
              {{ confirmText || $t('confirm') }}
            </component>
          </AlertDialogAction>
        </div>
      </div>
    </AlertDialogContent>
  </AlertDialog>
</template>
