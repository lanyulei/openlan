import type {
  BaseFormComponentType,
  ExtendedFormApi,
  OpenLanFormProps,
} from './types';

import { defineComponent, h, isReactive, onBeforeUnmount, watch } from 'vue';

import { useStore } from '@vben-core/shared/store';

import { FormApi } from './form-api';
import OpenLanUseForm from './openlan-use-form.vue';

export function useOpenLanForm<
  T extends BaseFormComponentType = BaseFormComponentType,
>(options: OpenLanFormProps<T>) {
  const IS_REACTIVE = isReactive(options);
  const api = new FormApi(options);
  const extendedApi: ExtendedFormApi = api as never;
  extendedApi.useStore = (selector) => {
    return useStore(api.store, selector);
  };

  const Form = defineComponent(
    (props: OpenLanFormProps, { attrs, slots }) => {
      onBeforeUnmount(() => {
        api.unmount();
      });
      api.setState({ ...props, ...attrs });
      return () =>
        h(OpenLanUseForm, { ...props, ...attrs, formApi: extendedApi }, slots);
    },
    {
      name: 'OpenLanUseForm',
      inheritAttrs: false,
    },
  );
  // Add reactivity support
  if (IS_REACTIVE) {
    watch(
      () => options.schema,
      () => {
        api.setState({ schema: options.schema });
      },
      { immediate: true },
    );
  }

  return [Form, extendedApi] as const;
}
