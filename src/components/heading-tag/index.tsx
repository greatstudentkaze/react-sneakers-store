import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';

import styles from './styles/heading-tag.module.scss';

interface HeadingTagProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
  level: '1' | '2' | '3',
  children: ReactNode,
}

const HeadingTag = ({ level, children, className, ...props }: HeadingTagProps) => {
  switch (level) {
    case '1':
      return <h1 className={cn(className, styles.h1)} {...props}>{children}</h1>
    case '2':
      return <h2 className={cn(className, styles.h2)} {...props}>{children}</h2>
    case '3':
      return <h3 className={cn(className, styles.h3)} {...props}>{children}</h3>
    default:
      return <></>;
  }
};

export default HeadingTag;
