import React from 'react';

import './styles/catalog.scss';
import searchIconSrc from '../../assets/images/icon/search.svg';

interface Props {
  title: string
}

const Catalog = ({ title }: Props) => {
  return (
    <section className="catalog">
      <header className="catalog__header">
        <h2 className="catalog__title">{title}</h2>
        <label htmlFor="catalog-search" className="visually-hidden">Поиск товара в каталоге</label>
        <input className="catalog__search" type="text" id="catalog-search" placeholder="Поиск..." style={{ backgroundImage: `url("${searchIconSrc}")` }} />
      </header>
      <ul className="catalog__list">
        <li></li>
      </ul>
    </section>
  );
};

export default Catalog;
