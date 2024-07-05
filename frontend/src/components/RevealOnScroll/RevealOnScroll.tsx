import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import './RevealOnScroll.scss';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ children, className, style }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const classes = classNames(`${isVisible ? 'visible' : 'hidden'}`, className);

  return (
    <div ref={ref} className={classes} style={style}>
      {children}
    </div>
  );
};

export default RevealOnScroll;
