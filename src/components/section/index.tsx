import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';

import HeadingTag from '../heading-tag';

import './styles/section.scss';

interface SectionProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  title?: string,
  centered?: boolean,
  children: ReactNode,
}

const Section = ({ title, children, centered, className, ...props }: SectionProps) => (
  <section className={cn('section', className, { 'section--centered': centered })} {...props}>
    {title && <header className="section__header">
      <HeadingTag className="section__title" level="2">
        {title}
      </HeadingTag>
    </header>}
    {children}
  </section>
);

export default Section;
