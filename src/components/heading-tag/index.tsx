import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';

interface HeadingTagProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
  level: '1' | '2' | '3',
  children: ReactNode,
}

const HeadingTag = ({ level, children, className, ...props }: HeadingTagProps) => {
  switch (level) {
    case '1':
      return <h1 className={cn(className)} {...props}>{children}</h1>
    case '2':
      return <h2 className={cn(className)} {...props}>{children}</h2>
    case '3':
      return <h3 className={cn(className)} {...props}>{children}</h3>
    default:
      return <></>;
  }
};

export default HeadingTag;
