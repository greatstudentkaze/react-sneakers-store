import { DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';

import './styles/info-block.scss';

interface InfoBlockProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string,
  description: string,
  imageData: {
    src: string,
    width: number,
    height: number,
  },
  buttonText?: string,
  onButtonClick: () => void,
}

const InfoBlock = ({ title, description, imageData, buttonText = 'Вернуться назад', onButtonClick, className, ...props }: InfoBlockProps) => {
  return (
    <div className={cn('info-block', className)} {...props}>
      <img className="info-block__image" src={imageData.src} width={imageData.width} height={imageData.height} alt="" />
      <p className="info-block__title">{title}</p>
      <p className="info-block__info">{description}</p>

      <button className="info-block__button cart-panel__button cart-panel__button--arrow-left" type="button" onClick={onButtonClick}>
        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M14.7144 7L1.00007 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 13L1 7L7 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {buttonText}
      </button>
    </div>
  );
};

export default InfoBlock;
