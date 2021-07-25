import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AppContext } from '../../context/app.context';

import HeadingTag from '../../components/heading-tag';
import CardItemList from '../../components/card-item-list';
import InfoBlock from '../../components/info-block';

import emptyWishlistSrc from '../../assets/images/empty-wishlist.png';

interface SectionProps {
  title: string,
}

const Wishlist = ({ title }: SectionProps) => {
  const {
    wishlistItems: items,
    areWishlistItemsLoading: isLoading
  } = useContext(AppContext);

  const history = useHistory();

  if (!items.length) {
    return (
      <section className="catalog catalog--centered">
        <InfoBlock
          title={'Закладок нет :('}
          description={'Вы ничего не добавляли в закладки'}
          imageData={{ src: emptyWishlistSrc, width: 70, height: 70 }}
          onButtonClick={() => history.push('/')}
        />
      </section>
    )
  }

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
