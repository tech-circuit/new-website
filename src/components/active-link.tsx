import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

type ActiveLinkProps = LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    activeClassName: string;
  };

const ActiveLink = ({
  children,
  activeClassName,
  className,
  ...props
}: ActiveLinkProps) => {
  const { asPath, isReady } = useRouter();
  const [currentClassname, setClassName] = useState(className);

  useEffect(() => {
    // Check if the router fields are updated client-side
    if (isReady) {
      // Dynamic route will be matched via props.as
      // Static route will be matched via props.href
      const linkPathname = new URL(
        (props.as || props.href) as string,
        location.href
      ).pathname;

      // Using URL().pathname to get rid of query and hash
      const activePathname = new URL(asPath, location.href).pathname;

      const newClassName =
        linkPathname === activePathname ? activeClassName : className;

      if (newClassName !== className) {
        setClassName(newClassName);
      }
    }
  }, [
    asPath,
    isReady,
    props.as,
    props.href,
    activeClassName,
    setClassName,
    className,
  ]);

  return (
    <Link {...props} className={currentClassname}>
      {children}
    </Link>
  );
};

export default ActiveLink;
