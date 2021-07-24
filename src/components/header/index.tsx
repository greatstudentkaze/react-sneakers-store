import React from 'react';

import './styles/header.scss';
import logoSrc from '../../assets/images/logo.svg';
import cartIconSrc from '../../assets/images/icon/cart.svg';
import wishlistIconSrc from '../../assets/images/icon/wishlist-nav.svg';
import loginIconSrc from '../../assets/images/icon/login.svg';

interface HeaderProps {
  openCartPanel: () => void,
}

const Header = ({ openCartPanel }: HeaderProps) => {

  const handleCartButtonClick = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    openCartPanel();
  }

  return (
    <header className="header">
      <div className="header__container">
        <a className="logo" href="/">
          <img src={logoSrc} width="245" height="41" alt="Логотип React Sneakers" />
        </a>
        <nav>
          <ul className="user-list">
            <li className="user-list__item">
              <a href="/" style={{ backgroundImage: `url("${cartIconSrc}")` }} onClick={handleCartButtonClick}>
                <span className="visually-hidden">Корзина:</span>
                <span>1205 руб.</span>
              </a>
            </li>
            <li className="user-list__item user-list__item--icon">
              <a href="/" style={{ backgroundImage: `url("${wishlistIconSrc}")` }}>
                <span className="visually-hidden">Список желаний</span>
              </a>
            </li>
            <li className="user-list__item user-list__item--icon">
              <a href="/" style={{ backgroundImage: `url("${loginIconSrc}")` }}>
                <span className="visually-hidden">Вход</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
