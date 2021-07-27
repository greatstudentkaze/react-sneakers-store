import { useContext, useState } from 'react';
import axios from 'axios';

import { AppContext, ICartContext } from '../../context/app.context';
import { API } from '../../utils/api';
import { SneakersItem } from '../../interfaces/sneakers.interface';

import CartItem from '../cart-item';
import InfoBlock from '../info-block';

import './styles/cart-panel.scss';
import emptyBoxSrc from '../../assets/images/empty-box.png';
import orderConfirmedSrc from '../../assets/images/order-confirmed.png';
import cn from 'classnames';

interface CartPanelProps {
  isOpened: boolean,
  close: () => void,
}

interface OrderData {
  clientId: string,
  createdAt: string,
  name: string,
  id: string,
  items: SneakersItem[],
}

// todo: refactor
const renderCartPanelBody = (items: ICartContext['cartItems'], isOrderConfirmed: boolean, handleCartButtonClick: () => void, close: CartPanelProps['close'], orderData: OrderData | null, isLoading: boolean) => {
  if (items.length > 0) {
    return <>
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
      <div className="cart-panel__order-amount-and-tax-block">
        <p className="cart-panel__row">
          Итого:
          <span className="dots"/>
          <span>21 498 руб.</span>
        </p>
        <p className="cart-panel__row">
          Налог 5%:
          <span className="dots"/>
          <span>1 074 руб.</span>
        </p>
      </div>
      <button className="cart-panel__button" type="button" onClick={handleCartButtonClick} disabled={isLoading}>
        Оформить заказ
        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M1 7H14.7143" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </>;
  }

  if (isOrderConfirmed) {
    return <InfoBlock
      className="cart-panel__order-confirmed"
      title={'Заказ оформлен!'}
      description={`Ваш заказ #${orderData?.id} скоро будет передан курьерской доставке`}
      imageData={{ src: orderConfirmedSrc, width: 83, height: 120 }}
      onButtonClick={close}
    />;
  }

  return <InfoBlock
    title={'Корзина пустая'}
    description={'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}
    imageData={{ src: emptyBoxSrc, width: 120, height: 120 }}
    onButtonClick={close}
  />;
};

const CartPanel = ({ isOpened, close }: CartPanelProps) => {
  const { cartItems: items, isLoading, showLoader, hideLoader, clearCart } = useContext(AppContext);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  const handleCartButtonClick = async () => {
    showLoader();

    try {
      const { data } = await axios.post(API.ORDERS, { clientId: '000', items });

      clearCart();
      setIsOrderConfirmed(true);
      setOrderData(data);

      setTimeout(close, 10000);
    } catch (err) {
      alert('Не удалось оформить заказ :(');
      console.error(err);
    }

    hideLoader();
  };

  return (
    <div className={cn('overlay', { 'overlay--visible': isOpened })} onClick={close}>
      <section className={cn('cart-panel', { 'cart-panel--opened': isOpened })} onClick={evt => evt.stopPropagation()}>
        <h2 className="cart-panel__title">Корзина</h2>
        {renderCartPanelBody(items, isOrderConfirmed, handleCartButtonClick, close, orderData, isLoading)}
      </section>
    </div>
  );
};

export default CartPanel;
