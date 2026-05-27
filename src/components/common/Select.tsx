interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  id?: string;
}

export function Select({ value, options, onChange, id }: SelectProps) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[var(--color-surface-dark)] text-sm text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] shadow-sm border border-[var(--color-border)] dark:border-[var(--color-border-dark)] focus:outline-none focus:ring-1 focus:ring-[var(--color-border)] dark:focus:ring-[var(--color-border-dark)] focus:shadow-md transition-shadow border-0"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
