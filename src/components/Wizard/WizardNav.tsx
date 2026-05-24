interface WizardNavProps {
  steps: string[];
  currentStep: number;
}

export function WizardNav({ steps, currentStep }: WizardNavProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div key={step} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)] text-white'
                      : isCompleted
                      ? 'bg-[var(--color-accent-bg)] dark:bg-[var(--color-accent-bg-dark)] text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]'
                      : 'bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] text-[var(--color-text)] dark:text-[var(--color-text-dark)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)]'
                  }`}
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
                  className={`text-xs whitespace-nowrap ${
                    isActive
                      ? 'text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] font-medium'
                      : 'text-[var(--color-text)] dark:text-[var(--color-text-dark)]'
                  }`}
                >
                  {step}
                </span>
              </div>
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
