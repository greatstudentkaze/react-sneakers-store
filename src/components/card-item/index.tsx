import { useContext } from 'react';
import cn from 'classnames';

import { AppContext } from '../../context/app.context';
import { SneakersItem } from '../../interfaces/sneakers.interface';

type Props = SneakersItem & {
  index: number,
}

const CardItem = ({ title, imageSrc, index, price, currency, id, uid }: Props) => {
  const {
    removeItemFromCartById,
    addItemToCart,
    isItemAddedToCart,
    addItemToWishlist,
    removeItemFromWishlistById,
    isItemWishlisted,
  } = useContext(AppContext);
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
      >
        <span className="visually-hidden">Добавить в избранное</span>
        {/*todo: ally*/}
        <svg width="15" height="14" aria-hidden="true">
          <path d="M14.585 3.223a4.299 4.299 0 00-.949-1.37A4.453 4.453 0 0010.53.6a4.478 4.478 0 00-2.795.978A4.478 4.478 0 004.94.6a4.453 4.453 0 00-3.107 1.254c-.404.39-.726.855-.949 1.37a4.213 4.213 0 00-.35 1.684c0 .551.114 1.125.339 1.709.188.488.458.994.803 1.505.547.809 1.299 1.652 2.232 2.507a24.93 24.93 0 003.144 2.437l.395.25c.175.112.4.112.575 0l.395-.25a25.244 25.244 0 003.144-2.437c.933-.855 1.685-1.698 2.231-2.507a7.537 7.537 0 00.804-1.505 4.752 4.752 0 00.338-1.709 4.182 4.182 0 00-.348-1.685z"/>
        </svg>
      </button>
      <a className="card-item__link" href="/">
        <img
          className="card-item__image"
          src={imageSrc['1x']} srcSet={`${imageSrc['2x']} 2x`}
          width="133"
          height="112"
          alt=""
          aria-labelledby={`title-${index}`}
        />
      </a>
      <h3 className="card-item__title" id={`title-${index}`}>{title}</h3>
      <footer className="card-item__footer">
        <p className="card-item__price">
          Цена:
          {/*todo: format price 12 999 руб.*/}
          <span>{price}</span>
        </p>
        <button
          className={cn('card-item__cart-button', {
            'card-item__cart-button--active': isAddedToCart,
          })}
          type="button"
          onClick={handleCartButtonClick}
        >
          <span className="visually-hidden">Добавить в корзину</span>
          {/*todo: ally*/}
          {
            isAddedToCart
              ? (
                <svg width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d)" clipPath="url(#clip0)">
                    <path d="M9.657 1.62a.982.982 0 011.402 1.375L5.833 9.53a.982.982 0 01-1.414.027L.954 6.092a.982.982 0 111.39-1.389l2.74 2.742L9.631 1.65a.326.326 0 01.026-.03z"
                          fill="#fff"/>
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <path transform="translate(.667 .667)" d="M0 0h10.667v10.667H0z"/>
                    </clipPath>
                    <filter id="filter0_d" x=".667" y="1.33" width="10.67" height="10.513" filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                      <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                      <feOffset dy="2"/>
                      <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                      <feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/>
                      <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                    </filter>
                  </defs>
                </svg>
              )
              : (
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M10.6653 5.13122H7.20214V1.66821C7.20214 0.332846 5.13114 0.332846 5.13114 1.66821V5.13122H1.668C0.332935 5.13122 0.332935 7.20215 1.668 7.20215H5.13114V10.6652C5.13114 12.0005 7.20214 12.0005 7.20214 10.6652V7.20215H10.6653C12.0005 7.20215 12.0005 5.13122 10.6653 5.13122Z"/>
                </svg>
              )
          }
        </button>
      </footer>
    </div>
  );
};

export default CardItem;
