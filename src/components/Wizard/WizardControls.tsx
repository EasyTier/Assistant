import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, FileDown } from 'lucide-react';

interface WizardControlsProps {
  currentStep: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  onDownload: () => void;
}

export function WizardControls({ currentStep, totalSteps, onPrev, onNext, onDownload }: WizardControlsProps) {
  const { t } = useTranslation();
  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;

  return (
    <div className="flex items-center justify-between pt-6 border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
      <button
        type="button"
        onClick={onPrev}
        disabled={isFirst}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)] hover:bg-[var(--color-surface)] dark:hover:bg-[var(--color-surface-dark)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={16} />
        {t('prevStep')}
      </button>

      <span className="text-sm text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
        {t('stepCounter', { current: currentStep + 1, total: totalSteps })}
      </span>

      {isLast ? (
        <button
          type="button"
          onClick={onDownload}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)] hover:opacity-90 transition-opacity"
        >
          <FileDown size={16} />
          {t('download')}
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)] hover:opacity-90 transition-opacity"
        >
          {t('nextStep')}
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}
