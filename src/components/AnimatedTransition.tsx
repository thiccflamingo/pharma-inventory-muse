
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface AnimatedTransitionProps {
  children: ReactNode;
  className?: string;
}

const AnimatedTransition = ({ children, className = '' }: AnimatedTransitionProps) => {
  const location = useLocation();

  return (
    <div
      key={location.pathname}
      className={`animate-fade-in ${className}`}
    >
      {children}
    </div>
  );
};

export default AnimatedTransition;
