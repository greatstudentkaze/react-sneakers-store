import React, { useEffect, useState } from 'react';

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
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = searchQuery.trim()
    ? items.filter(it => it.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : items;

  return (
    <section className="catalog">
      <header className="catalog__header">
        <h2 className="catalog__title">
          {searchQuery.trim() ? `Поиск по запросу: ${searchQuery}` : title}
        </h2>
        <label htmlFor="catalog-search" className="visually-hidden">Поиск товара в каталоге</label>
        <input
          className="catalog__search"
          type="text"
          id="catalog-search"
          placeholder="Поиск..."
          style={{ backgroundImage: `url("${searchIconSrc}")` }}
          value={searchQuery}
          onChange={evt => setSearchQuery(evt.target.value)}
        />
      </header>
      <ul className="catalog__list">
        {
          !filteredItems.length
            ? 'Товары не найдены 😓'
            : filteredItems.map((item, i) => <li key={item.id}>
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
