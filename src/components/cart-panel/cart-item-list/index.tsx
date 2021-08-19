import { useContext } from 'react';

import { CartContext } from '../../../context/cart.context';

import CartItem from '../../cart-item';

const CartItemList = () => {
  const { cartItems: items } = useContext(CartContext);

  return (
    <ul className="cart-panel__list">
      {items.map((item, i) => (
        <li key={item.id}>
          <CartItem
            title={item.title}
            imageSrc={item.imageSrc}
            index={i}
            price={item.price}
            currency={item.currency}
            id={item.id}
          />
        </li>
      ))}
    </ul>
  );
};

export default CartItemList;
