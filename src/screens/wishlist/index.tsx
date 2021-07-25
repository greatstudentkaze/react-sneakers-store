import { useContext } from 'react';

import { AppContext } from '../../context/app.context';

import HeadingTag from '../../components/heading-tag';
import CardItemList from '../../components/card-item-list';

interface SectionProps {
  title: string,
}

const Wishlist = ({ title }: SectionProps) => {
  const {
    wishlistItems: items,
    areWishlistItemsLoading: isLoading
  } = useContext(AppContext);

  return (
    <section className="catalog">
      <header className="catalog__header">
        <HeadingTag className="catalog__title" level="2">
          {title}
        </HeadingTag>
      </header>
      <CardItemList items={items} isLoading={isLoading} />
    </section>
  );
};

const WishlistScreen = () => {
  const { isWishlistError: isError } = useContext(AppContext);

  return (
    <main className="main">
      {isError
        ? 'Что-то пошло не так...'
        : <Wishlist title="Мои закладки" />
      }
    </main>
  );
};

export default WishlistScreen;
