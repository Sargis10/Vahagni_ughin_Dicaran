export function Card({ as: Tag = 'article', variant, className, children, ...rest }) {
  const classes = ['card', variant && `card--${variant}`, className].filter(Boolean).join(' ');
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
