export type {
  AlertProps,
  BeforeCloseScope,
  IconType,
  PromptProps,
} from './alert';
export { useAlertContext } from './alert';
export { default as Alert } from './alert.vue';
export {
  openlanAlert as alert,
  clearAllAlerts,
  openlanConfirm as confirm,
  openlanPrompt as prompt,
} from './AlertBuilder';
