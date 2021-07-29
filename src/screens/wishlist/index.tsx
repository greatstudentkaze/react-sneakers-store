import { useContext } from 'react';

import { AppContext } from '../../context/app.context';

import Section from '../../components/section';
import CardItemList from '../../components/card-item-list';
import InfoBlock from '../../components/info-block';
import SomethingWentWrong from '../../components/something-went-wrong';

import emptyWishlistSrc from '../../assets/images/empty-wishlist.png';

const Wishlist = () => {
  const {
    wishlistItems: items,
    areWishlistItemsLoading: isLoading
  } = useContext(AppContext);

  if (!items.length) {
    return (
      <Section centered>
        <InfoBlock
          title={'Закладок нет :('}
          description={'Вы ничего не добавляли в закладки'}
          imageData={{ src: emptyWishlistSrc, width: 70, height: 70 }}
        />
      </Section>
    )
  }

  return (
    <Section title={'Мои закладки'}>
      <CardItemList items={items} isLoading={isLoading} />
    </Section>
  );
};

const WishlistScreen = () => {
  const { isWishlistError: isError } = useContext(AppContext);

  return (
    <main className="main">
      {isError
        ? <SomethingWentWrong />
        : <Wishlist />
      }
    </main>
  );
};

export default WishlistScreen;
