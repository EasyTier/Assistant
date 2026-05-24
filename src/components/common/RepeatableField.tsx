import { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface RepeatableFieldProps {
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  addLabel?: string;
}

export function RepeatableField({ values, onChange, placeholder, addLabel }: RepeatableFieldProps) {
  const [inputValue, setInputValue] = useState('');

  const addValue = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !values.includes(trimmed)) {
      onChange([...values, trimmed]);
      setInputValue('');
    }
  };

  const removeValue = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addValue();
            }
          }}
          placeholder={placeholder}
          className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] text-sm text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] dark:focus:ring-[var(--color-accent-dark)] transition-shadow"
        />
        <button
          type="button"
          onClick={addValue}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-white bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)] hover:opacity-90 transition-opacity"
        >
          <Plus size={16} />
          {addLabel}
        </button>
      </div>
      {values.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {values.map((v, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-[var(--color-accent-bg)] dark:bg-[var(--color-accent-bg-dark)] text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] border border-[var(--color-accent-border)] dark:border-[var(--color-accent-border-dark)]"
            >
              {v}
              <button
                type="button"
                onClick={() => removeValue(i)}
                className="inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-[var(--color-accent)] hover:text-white transition-colors"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
