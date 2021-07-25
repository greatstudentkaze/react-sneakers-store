import { useContext, useState } from 'react';

import { AppContext } from '../../context/app.context';

import HeadingTag from '../heading-tag';
import CardItemList from '../card-item-list';

import './styles/catalog.scss';
import searchIconSrc from '../../assets/images/icon/search.svg';

interface SectionProps {
  title: string,
}

const Catalog = ({ title }: SectionProps) => {
  const {
    sneakers: items,
    areSneakersLoading: isLoading
  } = useContext(AppContext);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = searchQuery.trim()
    ? items.filter(it => it.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : items;

  return (
    <section className="catalog">
      <header className="catalog__header">
        <HeadingTag className="catalog__title" level="2">
          {searchQuery.trim() ? `Поиск по запросу: ${searchQuery}` : title}
        </HeadingTag>
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
      <CardItemList items={filteredItems} isLoading={isLoading} />
    </section>
  );
};

export default Catalog;
