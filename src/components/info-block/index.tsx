import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';

import { AppRoute } from '../../const';

import Button from '../button';

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
  onButtonClick?: () => void,
}

const InfoBlock = ({ title, description, imageData, buttonText = 'Вернуться назад', onButtonClick, className, ...props }: InfoBlockProps) => {
  const history = useHistory();

  const handleClick = onButtonClick ? onButtonClick : () => history.push(AppRoute.ROOT);

  return (
    <div className={cn('info-block', className)} {...props}>
      <img className="info-block__image" src={imageData.src} width={imageData.width} height={imageData.height} alt="" />
      <p className="info-block__title">{title}</p>
      <p className="info-block__info">{description}</p>
      <Button className="info-block__button" onClick={handleClick} arrowDirection="left">
        {buttonText}
      </Button>
    </div>
  );
};

export default InfoBlock;
