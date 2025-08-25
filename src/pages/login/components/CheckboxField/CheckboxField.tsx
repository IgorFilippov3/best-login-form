import styles from "./CheckboxField.module.css";

interface CheckboxFieldProps {
  id: string;
  name: string;
  label: string;
  defaultChecked: boolean;
  disabled?: boolean;
  required?: boolean;
  "aria-label"?: string;
  "aria-describedby"?: string;
}

export const CheckboxField = ({
  id,
  name,
  label,
  defaultChecked,
  disabled,
  required,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby,
}: CheckboxFieldProps) => {
  return (
    <div className={styles.checkbox}>
      <input
        type="checkbox"
        id={id}
        name={name}
        defaultChecked={defaultChecked}
        disabled={disabled}
        required={required}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
