import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';

import './styles/button.scss';
import { ReactComponent as ArrowLeftIcon } from '../../assets/images/icon/arrow-left.svg';
import { ReactComponent as ArrowRightIcon } from '../../assets/images/icon/arrow-right.svg';

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
      {arrowDirection === 'left' && <ArrowLeftIcon aria-hidden="true" />}
      {children}
      {arrowDirection === 'right' && <ArrowRightIcon aria-hidden="true" />}
    </button>
  );
};

export default Button;
