import type {
  OpenLanFormSchema as FormSchema,
  OpenLanFormProps,
} from '@vben/common-ui';

import type { ComponentType } from './component';

import { setupOpenLanForm, useOpenLanForm as useForm, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

setupOpenLanForm<ComponentType>({
  config: {
    modelPropNameMap: {
      Upload: 'fileList',
      CheckboxGroup: 'model-value',
    },
  },
  defineRules: {
    required: (value, _params, ctx) => {
      if (value === undefined || value === null || value.length === 0) {
        return $t('ui.formRules.required', [ctx.label]);
      }
      return true;
    },
    selectRequired: (value, _params, ctx) => {
      if (value === undefined || value === null) {
        return $t('ui.formRules.selectRequired', [ctx.label]);
      }
      return true;
    },
  },
});

const useOpenLanForm = useForm<ComponentType>;

export { useOpenLanForm, z };

export type OpenLanFormSchema = FormSchema<ComponentType>;
export type { OpenLanFormProps };
