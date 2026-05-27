interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: string;
}

export function Toggle({ checked, onChange, label, id }: ToggleProps) {
  return (
    <label htmlFor={id} className="inline-flex items-center gap-3 cursor-pointer select-none">
      <div className="relative">
        <input
          id={id}
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="w-11 h-6 bg-[var(--color-border)] dark:bg-[var(--color-border-dark)] rounded-full peer peer-checked:bg-[var(--color-accent)] dark:peer-checked:bg-[var(--color-accent-dark)] transition-colors" />
        <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white dark:bg-black rounded-full transition-transform peer-checked:translate-x-5" />
      </div>
      {label && (
        <span className="text-sm text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)]">
          {label}
        </span>
      )}
    </label>
  );
}
