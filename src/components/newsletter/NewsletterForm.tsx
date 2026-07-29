'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Lock } from 'lucide-react';
import { useId, useState, type FormEvent } from 'react';
import { cn } from '@/lib/utils';

interface NewsletterFormProps {
  /** Shown in the success message so the reader knows what they signed up to. */
  newsletterName?: string;
  inverted?: boolean;
  /** Styling for placement on the rich red newsletter block. */
  onRed?: boolean;
  /** Forces the field and button to stack, for narrow columns. */
  stacked?: boolean;
  className?: string;
  buttonLabel?: string;
  showPrivacyNote?: boolean;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Client-side validated signup with a simulated submission.
 *
 * No network request is made — this is a template. Replace `submit` with a real
 * call and keep the surrounding states.
 */
export function NewsletterForm({
  newsletterName = 'the Daily Brief',
  inverted = false,
  onRed = false,
  stacked = false,
  className,
  buttonLabel = 'Subscribe',
  showPrivacyNote = true,
}: NewsletterFormProps) {
  const inputId = useId();
  const errorId = `${inputId}-error`;
  const reduced = useReducedMotion();

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = email.trim();
    if (!value) {
      setError('Enter your email address to subscribe.');
      return;
    }
    if (!EMAIL_PATTERN.test(value)) {
      setError('That address does not look right — check for a typo.');
      return;
    }

    setError(null);
    setStatus('submitting');

    // Simulated request. Swap for your provider's API.
    await new Promise((resolve) => setTimeout(resolve, 700));
    setStatus('success');
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        role="status"
        className={cn(
          'flex items-start gap-3 rounded-sm border p-4',
          onRed || inverted ? 'border-white/25 bg-white/10' : 'border-brand-red/30 bg-brand-wash',
          className,
        )}
      >
        <span
          className={cn(
            'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-sm',
            onRed ? 'bg-white text-brand-red' : 'bg-brand-red text-white',
          )}
        >
          <Check aria-hidden="true" className="h-4 w-4" />
        </span>
        <div>
          <p className={cn('font-serif text-lg', onRed || inverted ? 'text-white' : 'text-ink')}>
            You’re subscribed.
          </p>
          <p className={cn('mt-1 text-sm', onRed || inverted ? 'text-white/95' : 'text-ink-soft')}>
            The next edition of {newsletterName} will arrive at {email}. Confirm your address from
            the email we just sent.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className={cn('w-full', className)}>
      <label
        htmlFor={inputId}
        className={cn('label mb-2 block', onRed || inverted ? 'text-white/95' : 'text-ink-soft')}
      >
        Email address
      </label>

      <div className={cn('flex flex-col gap-2', !stacked && 'sm:flex-row')}>
        <input
          id={inputId}
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (error) setError(null);
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'min-h-[48px] w-full flex-1 rounded-sm border px-4 text-base transition-colors placeholder:text-ink-faint',
            onRed
              ? 'border-transparent bg-white text-ink placeholder:text-ink-faint focus:border-ink'
              : inverted
                ? 'border-white/25 bg-transparent text-white placeholder:text-white/70 focus:border-white'
                : 'border-line bg-surface text-ink focus:border-ink',
            error && (onRed ? 'border-white' : 'border-brand-red'),
          )}
        />

        <button
          type="submit"
          disabled={status === 'submitting'}
          className={cn(
            'group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-sm px-6 text-sm font-semibold transition-colors duration-200',
            onRed
              ? 'bg-ink text-white hover:bg-black'
              : 'bg-brand-red text-white hover:bg-brand-deep',
            status === 'submitting' && 'cursor-wait opacity-70',
          )}
        >
          {status === 'submitting' ? 'Subscribing…' : buttonLabel}
          {status === 'idle' ? (
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 ease-editorial group-hover:translate-x-1 rtl:-scale-x-100"
            />
          ) : null}
        </button>
      </div>

      <AnimatePresence>
        {error ? (
          <motion.p
            id={errorId}
            role="alert"
            initial={reduced ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'mt-2 text-sm font-medium',
              onRed ? 'text-white' : 'text-brand-red',
            )}
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>

      {showPrivacyNote ? (
        <p
          className={cn(
            'mt-3 flex items-start gap-1.5 text-xs leading-relaxed',
            onRed || inverted ? 'text-white/95' : 'text-ink-soft',
          )}
        >
          <Lock aria-hidden="true" className="mt-0.5 h-3 w-3 shrink-0" />
          We never sell reader data. Unsubscribe in one click from any edition.
        </p>
      ) : null}
    </form>
  );
}
