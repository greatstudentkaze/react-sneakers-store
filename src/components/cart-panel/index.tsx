import { useContext, useState } from 'react';
import axios from 'axios';
import cn from 'classnames';

import { AppContext } from '../../context/app.context';
import { CartContext } from '../../context/cart.context';
import { API } from '../../utils/api';
import { formatRuPrice } from '../../utils/formatRuPrice';
import { SneakersItem } from '../../interfaces/sneakers.interface';

import InfoBlock from '../info-block';
import Button from '../button';
import CartItemList from './cart-item-list';

import './styles/cart-panel.scss';
import emptyBoxSrc from '../../assets/images/empty-box.png';
import orderConfirmedSrc from '../../assets/images/order-confirmed.png';

const renderNoItems = (isOrderConfirmed: boolean, closeCartPanel: () => void, orderData: OrderData | null, ) => {
  if (isOrderConfirmed) {
    return (
      <InfoBlock
        className="cart-panel__order-confirmed"
        title={'Заказ оформлен!'}
        description={`Ваш заказ #${orderData?.id} скоро будет передан курьерской доставке`}
        imageData={{ src: orderConfirmedSrc, width: 83, height: 120 }}
        onButtonClick={closeCartPanel}
      />
    );
  }

  return (
    <InfoBlock
      title={'Корзина пустая'}
      description={'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}
      imageData={{ src: emptyBoxSrc, width: 120, height: 120 }}
      onButtonClick={closeCartPanel}
    />
  );
};

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

const CartPanel = ({ isOpened, close }: CartPanelProps) => {
  const { isLoading, showLoader, hideLoader } = useContext(AppContext);
  const { cartItems: items, totalPrice, clearCart } = useContext(CartContext);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  const handleCartButtonClick = async () => {
    showLoader();

    try {
      const { data } = await axios.post(API.ORDERS, { clientId: '000', items, createdAt: Date.now() });

      setIsOrderConfirmed(true);
      clearCart();
      setOrderData(data);

      setTimeout(() => {
        close();
        setTimeout(() => {
          setIsOrderConfirmed(false);
        }, 1000);
      }, 10000);
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

        {items.length > 0
          ? (
            <>
              <CartItemList />
              <div className="cart-panel__order-amount-and-tax-block">
                <p className="cart-panel__row">
                  Итого:
                  <span className="dots"/>
                  <span>{formatRuPrice(totalPrice)}</span>
                </p>
                <p className="cart-panel__row" title="Сумма вернётся Вам на карту в течение 7 дней с момента оплаты">
                  Кэшбэк 5%:
                  <span className="dots"/>
                  <span>{formatRuPrice(Math.floor(totalPrice * 0.05))}</span>
                </p>
              </div>
              <Button onClick={handleCartButtonClick} disabled={isLoading} arrowDirection="right">
                Оформить заказ
              </Button>
            </>
          )
          : renderNoItems(isOrderConfirmed, close, orderData)
        }
      </section>
    </div>
  );
};

export default CartPanel;
