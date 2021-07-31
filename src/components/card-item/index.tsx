import { useContext } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { AppContext } from '../../context/app.context';
import { CartContext } from '../../context/cart.context';
import { formatRuPrice } from '../../utils/formatRuPrice';
import { SneakersItem } from '../../interfaces/sneakers.interface';

import { ReactComponent as WishlistIcon } from '../../assets/images/icon/wishlist.svg';
import { ReactComponent as AddToCartIcon } from '../../assets/images/icon/add-to-cart.svg';
import { ReactComponent as AddedToCartIcon } from '../../assets/images/icon/added-to-cart.svg';

type Props = SneakersItem & {
  index: number,
}

const CardItem = ({ title, imageSrc, index, price, currency, id }: Props) => {
  const {
    addItemToWishlist,
    removeItemFromWishlistById,
    isItemWishlisted,
  } = useContext(AppContext);
  const {
    removeItemFromCartById,
    addItemToCart,
    isItemAddedToCart,
  } = useContext(CartContext);

  const isAddedToCart = isItemAddedToCart(id);
  const isWished = isItemWishlisted(id);

  const handleWishButtonClick = () => {
    isWished
      ? removeItemFromWishlistById(id)
      : addItemToWishlist({ id, title, price, currency, imageSrc });
  };

  const handleCartButtonClick = () => {
    isAddedToCart
      ? removeItemFromCartById(id)
      : addItemToCart({ id, title, price, currency, imageSrc });
  };

  return (
    <div className="card-item">
      <button
        className={cn('card-item__wishlist-button', {
          'card-item__wishlist-button--active' : isWished
        })}
        type="button"
        onClick={handleWishButtonClick}
        aria-label={isWished ? 'Убрать из списка желаний' : 'Добавить в список желаний'}
      >
        <WishlistIcon aria-hidden="true" />
      </button>
      <Link className="card-item__link" to="/">
        <img
          className="card-item__image"
          src={imageSrc['1x']} srcSet={`${imageSrc['2x']} 2x`}
          width="133"
          height="112"
          alt=""
          aria-labelledby={`title-${index}`}
        />
      </Link>
      <h3 className="card-item__title" id={`title-${index}`}>{title}</h3>
      <footer className="card-item__footer">
        <p className="card-item__price">
          Цена:
          <span>{formatRuPrice(price)}</span>
        </p>
        <button
          className={cn('card-item__cart-button', {
            'card-item__cart-button--active': isAddedToCart,
          })}
          type="button"
          onClick={handleCartButtonClick}
          aria-label={isAddedToCart ? 'Убрать из корзины' : 'Добавить в корзину'}
        >
          {
            isAddedToCart
              ? <AddedToCartIcon aria-hidden="true" />
              : <AddToCartIcon aria-hidden="true" />
          }
        </button>
      </footer>
    </div>
  );
};

export default CardItem;
