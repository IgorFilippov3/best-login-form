import styles from "./InputField.module.css";

interface InputFieldProps {
  id: string;
  name: string;
  label: string;
  defaultValue?: string;
  type?: "text" | "email" | "password" | "tel" | "url";
  placeholder?: string;
  required?: boolean;
  error?: string;
  minLength?: number;
  maxLength?: number;
  "aria-label"?: string;
  "aria-describedby"?: string;
}

export const InputField = ({
  id,
  name,
  label,
  defaultValue = "",
  type = "text",
  placeholder,
  required,
  minLength,
  maxLength,
  error,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby,
}: InputFieldProps) => {
  const errorId: string | undefined = error ? `${id}-error` : undefined;
  const describedBy: string | undefined =
    [ariaDescribedby, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={`${styles.input} ${error ? styles.inputError : ""}`}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        aria-label={ariaLabel}
        aria-describedby={describedBy}
        aria-invalid={error ? "true" : undefined}
      />

      {error && (
        <div
          id={errorId}
          className={styles.messageError}
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}
    </div>
  );
};
