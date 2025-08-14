// 輔助函數用於整合 vee-validate 和 Quasar
export function fieldProps(field: { value?: unknown; [key: string]: unknown }) {
  return {
    ...field,
    modelValue: field.value as string | number | undefined,
    value: field.value as string | number | undefined,
  }
}
