import React from 'react';

import CardItem from '../card-item';
import './styles/catalog.scss';
import searchIconSrc from '../../assets/images/icon/search.svg';

interface Props {
  title: string
}

const catalog = [
  {
    id: '123',
    title: 'Мужские Кроссовки Nike Blazer Mid Suede',
    price: 12999,
    currency: 'RUB',
    imageSrc: {
      '1x': 'catalog/sneakers/nike-blazer-mid-suede.jpg',
      '2x': 'catalog/sneakers/nike-blazer-mid-suede@2x.jpg',
    },
  },
  {
    id: '1234',
    title: 'Мужские Кроссовки Nike Blazer Mid Suede',
    price: 12999,
    currency: 'RUB',
    imageSrc: {
      '1x': 'catalog/sneakers/nike-blazer-mid-suede.jpg',
      '2x': 'catalog/sneakers/nike-blazer-mid-suede@2x.jpg',
    },
  },
  {
    id: '12345',
    title: 'Мужские Кроссовки Nike Blazer Mid Suede',
    price: 12999,
    currency: 'RUB',
    imageSrc: {
      '1x': 'catalog/sneakers/nike-blazer-mid-suede.jpg',
      '2x': 'catalog/sneakers/nike-blazer-mid-suede@2x.jpg',
    },
  },
];

const Catalog = ({ title }: Props) => {
  return (
    <section className="catalog">
      <header className="catalog__header">
        <h2 className="catalog__title">{title}</h2>
        <label htmlFor="catalog-search" className="visually-hidden">Поиск товара в каталоге</label>
        <input className="catalog__search" type="text" id="catalog-search" placeholder="Поиск..." style={{ backgroundImage: `url("${searchIconSrc}")` }} />
      </header>
      <ul className="catalog__list">
        {
          !catalog.length
            ? ': - ('
            : catalog.map((item, i) => <li key={item.id}>
              <CardItem title={item.title} imageSrc={item.imageSrc} index={i} price={item.price} currency={item.currency} />
            </li>)
        }
        <li>
        </li>
      </ul>
    </section>
  );
};

export default Catalog;
