import React from 'react';

import './styles/cart-item.scss';

interface Props {
  title: string,
  imageSrc: {
    '1x': string,
    '2x'?: string,
  },
  index: number,
  price: number,
  currency: string,
}

const CartItem = ({ title, imageSrc, index, price }: Props) => {

  const handleRemoveButtonClick = () => {
    console.log('click');
  };

  return (
    <div className="cart-item">
      <a className="cart-item__link" href="/">
        <img className="cart-item__image" src={imageSrc['1x']} srcSet={`${imageSrc['2x']} 2x`} width="133" height="112" alt="" aria-labelledby={`cart-item-title-${index}`} />
      </a>
      <h3 className="cart-item__title" id={`cart-item-title-${index}`}>{title}</h3>
      <p className="cart-item__price" aria-label="Цена">
        {/*todo: format price 12 999 руб.*/}
        {price}
      </p>
      <button className="cart-item__remove-button" type="button" onClick={handleRemoveButtonClick}>
        <span className="visually-hidden">Удалить из корзину</span>
        {/*todo: ally*/}
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.0799 7.61553L6.6311 5.16673L9.07982 2.71801C10.0241 1.77376 8.55964 0.309342 7.6154 1.25359L5.16668 3.70231L2.71787 1.2535C1.77384 0.309466 0.309467 1.77384 1.2535 2.71787L3.70231 5.16668L1.25359 7.61539C0.309343 8.55964 1.77376 10.0241 2.71801 9.07982L5.16673 6.6311L7.61553 9.0799C8.55969 10.0241 10.0241 8.55969 9.0799 7.61553Z" fill="#D3D3D3"/>
        </svg>
      </button>
    </div>
  );
};

export default CartItem;