import { Link } from 'react-router';

function buttonClassName(variant, size, className) {
  return ['button', `button--${variant}`, size && `button--${size}`, className]
    .filter(Boolean)
    .join(' ');
}

export function ButtonLink({ to, variant = 'primary', size, className, children, ...rest }) {
  return (
    <Link to={to} className={buttonClassName(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

export function Button({ variant = 'primary', size, className, type = 'button', children, ...rest }) {
  return (
    <button type={type} className={buttonClassName(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
