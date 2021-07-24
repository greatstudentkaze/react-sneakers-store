import React from 'react';

import CardItem from '../card-item';
import './styles/catalog.scss';
import searchIconSrc from '../../assets/images/icon/search.svg';
import { SneakersItem } from '../../interfaces/sneakers.interface';

interface Props {
  title: string,
  items: SneakersItem[],
  addItemToCart: (item: SneakersItem) => void,
  removeItemFromCart: (id: SneakersItem['id']) => void,
}

const Catalog = ({ title, items, addItemToCart, removeItemFromCart }: Props) => {

  return (
    <section className="catalog">
      <header className="catalog__header">
        <h2 className="catalog__title">{title}</h2>
        <label htmlFor="catalog-search" className="visually-hidden">Поиск товара в каталоге</label>
        <input className="catalog__search" type="text" id="catalog-search" placeholder="Поиск..." style={{ backgroundImage: `url("${searchIconSrc}")` }} />
      </header>
      <ul className="catalog__list">
        {
          !items.length
            ? 'Товары не найдены 😓'
            : items.map((item, i) => <li key={item.id}>
              <CardItem
                title={item.title}
                imageSrc={item.imageSrc}
                index={i}
                price={item.price}
                currency={item.currency}
                id={item.id}
                addItemToCart={addItemToCart}
                removeItemFromCart={removeItemFromCart}
              />
            </li>)
        }
        <li>
        </li>
      </ul>
    </section>
  );
};

export default Catalog;
