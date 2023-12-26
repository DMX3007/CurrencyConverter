// InputBind.tsx
import { useState } from 'react';
import styles from "./InputField.module.css"

export interface Binder {
  value: string;
  setter: (value: string) => void;
}
/**
 * Hook that returns a value to be used with InputBind component.
 */
export function useBind(initialValue: string): Binder {
  const [value, setter] = useState(initialValue);
  return { value, setter };
}
/**
 * Custom input component with binding.
 */
export function InputBind({ value }: { value: Binder }) {
  return <input className={styles["input_push"]} type="text" value={value.value} placeholder='1'
    onChange={e => value.setter(e.target.value)} />;
}