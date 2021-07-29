import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';

import './styles/button.scss';

interface ButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  arrowDirection?: 'right' | 'left' | false,
  uppercase?: boolean,
  disabled?: boolean,
  children: ReactNode,
}

const Button = ({ arrowDirection, uppercase, className, children, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(className, 'button', {
        'button--uppercase': uppercase,
        'button--arrow-left': arrowDirection === 'left',
      })}
      type="button"
      {...props}
    >
      {arrowDirection === 'left' && (
        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M14.7144 7L1.00007 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 13L1 7L7 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
      {children}
      {arrowDirection === 'right' && (
        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M1 7H14.7143" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  );
};

export default Button;
