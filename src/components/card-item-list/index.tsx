import { DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';

import { SneakersItem } from '../../interfaces/sneakers.interface';

import CardItem from '../card-item';
import CardItemSkeleton from '../card-item/skeleton';

import '../card-item/styles/card-item.scss';
import './styles/card-item-list.scss';

interface CardItemListProps extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  items: SneakersItem[],
  isLoading: boolean,
}

const renderItems = (
  items: SneakersItem[],
  isLoading: boolean,
) => {

  if (items.length > 0) {
    return items.map((item, i) => <li key={item.id}>
      <CardItem
        title={item.title}
        imageSrc={item.imageSrc}
        index={i}
        price={item.price}
        currency={item.currency}
        id={item.id}
      />
    </li>);
  }

  if (isLoading) {
    const skeletonItems = new Array(12).fill(true);

    return skeletonItems.map((_, i) => <li key={i}>
      <CardItemSkeleton />
    </li>);
  }

  return 'Товары не найдены 😓';
};

const CardItemList = ({ items, isLoading, className, ...props }: CardItemListProps) => {
  return (
    <ul className={cn('card-item-list', className)} {...props}>
      {renderItems(items, isLoading)}
    </ul>
  );
};

export default CardItemList;
