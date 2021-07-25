import { useContext } from 'react';

import { AppContext } from '../../context/app.context';

import CartItem from '../cart-item';
import InfoBlock from '../info-block';

import './styles/cart-panel.scss';
import emptyBoxSrc from '../../assets/images/empty-box.png';

interface CartPanelProps {
  close: () => void,
}

const CartPanel = ({ close }: CartPanelProps) => {
  const { cartItems: items } = useContext(AppContext);

  return (
    <div className="overlay" onClick={close}>
      <section className="cart-panel" onClick={evt => evt.stopPropagation()}>
        <h2 className="cart-panel__title">Корзина</h2>
        {
          !items.length
            ? <InfoBlock
                title={'Корзина пустая'}
                description={'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}
                imageData={{ src: emptyBoxSrc, width: 120, height: 120 }}
                onButtonClick={close}
              />
            : <>
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
              <button className="cart-panel__button" type="button">
                Оформить заказ
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M1 7H14.7143" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </>
        }
      </section>
    </div>
  );
};

export default CartPanel;
