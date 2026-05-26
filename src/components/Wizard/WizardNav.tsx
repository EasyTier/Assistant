interface WizardNavProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (index: number) => void;
}

export function WizardNav({ steps, currentStep, onStepClick }: WizardNavProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isLast = index === steps.length - 1;
          const clickable = onStepClick !== undefined && index <= currentStep;

          return (
            <div key={step} className="flex items-center flex-1">
              <button
                type="button"
                disabled={!clickable}
                onClick={() => onStepClick?.(index)}
                className="flex flex-col items-center gap-1.5 bg-transparent border-0 p-0 disabled:cursor-default"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)] text-white'
                      : isCompleted
                      ? 'bg-[var(--color-accent-bg)] dark:bg-[var(--color-accent-bg-dark)] text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]'
                      : 'bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] text-[var(--color-text)] dark:text-[var(--color-text-dark)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)]'
                  } ${clickable ? 'cursor-pointer hover:opacity-80' : ''}`}
                >
                  {isCompleted ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={`hidden sm:block text-xs whitespace-nowrap ${
                    isActive
                      ? 'text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] font-medium'
                      : 'text-[var(--color-text)] dark:text-[var(--color-text-dark)]'
                  } ${clickable ? 'cursor-pointer' : ''}`}
                >
                  {step}
                </span>
              </button>
              {!isLast && (
                <div
                  className={`flex-1 h-0.5 mx-2 transition-colors ${
                    isCompleted
                      ? 'bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)]'
                      : 'bg-[var(--color-border)] dark:bg-[var(--color-border-dark)]'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
