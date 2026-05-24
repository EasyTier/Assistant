import type { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  children: ReactNode;
  description?: string;
  required?: boolean;
}

export function FormField({ label, htmlFor, children, description, required }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)]">
        {label}
        {required && <span className="ml-1 text-[var(--color-accent)]">*</span>}
      </label>
      {children}
      {description && (
        <p className="text-xs text-[var(--color-text)] dark:text-[var(--color-text-dark)] opacity-70">
          {description}
        </p>
      )}
    </div>
  );
}
