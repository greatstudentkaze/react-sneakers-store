import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';
import { formatRuPrice } from '../../utils/formatRuPrice';
import { SneakersItem } from '../../interfaces/sneakers.interface';

import './styles/cart-item.scss';
import { ReactComponent as CrossIcon } from '../../assets/images/icon/cross.svg';

type Props = SneakersItem & {
  index: number,
}

const CartItem = ({ title, imageSrc, index, price, id }: Props) => {
  const { removeItemFromCartById } = useContext(CartContext);

  const handleRemoveButtonClick = () => {
    removeItemFromCartById(id);
  };

  return (
    <div className="cart-item">
      <a className="cart-item__link" href="/">
        <img className="cart-item__image" src={imageSrc['1x']} srcSet={`${imageSrc['2x']} 2x`} width="133" height="112" alt="" aria-labelledby={`cart-item-title-${index}`} />
      </a>
      <h3 className="cart-item__title" id={`cart-item-title-${index}`}>{title}</h3>
      <p className="cart-item__price" aria-label="Цена">
        {formatRuPrice(price)}
      </p>
      <button className="cart-item__remove-button" type="button" onClick={handleRemoveButtonClick} aria-label="Убрать из корзины">
        <CrossIcon aria-hidden="true" />
      </button>
    </div>
  );
};

export default CartItem;
