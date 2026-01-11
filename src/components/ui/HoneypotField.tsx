/**
 * Honeypot Field Component
 *
 * Hidden field for spam prevention. Bots will fill this field,
 * but legitimate users won't see it. If the field has a value,
 * the submission is rejected as spam.
 *
 * Usage:
 * 1. Add <HoneypotField /> to your form
 * 2. Check for honeypot value on server: if (body.website) return spam error
 */

interface HoneypotFieldProps {
  /** Field name (default: "website" - looks legitimate to bots) */
  name?: string;
}

export default function HoneypotField({ name = 'website' }: HoneypotFieldProps) {
  return (
    <div
      style={{
        position: 'absolute',
        left: '-9999px',
        top: '-9999px',
        width: '1px',
        height: '1px',
        opacity: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
      tabIndex={-1}
    >
      <label htmlFor={name} style={{ display: 'none' }}>
        <input
          type="text"
          id={name}
          name={name}
          autoComplete="off"
          tabIndex={-1}
        />
      </label>
    </div>
  );
}


