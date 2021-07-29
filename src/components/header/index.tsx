import { SyntheticEvent, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from '../../context/app.context';
import { AppRoute } from '../../const';
import { formatRuPrice } from '../../utils/formatRuPrice';

import './styles/header.scss';
import logoSrc from '../../assets/images/logo.svg';
import cartIconSrc from '../../assets/images/icon/cart.svg';
import wishlistIconSrc from '../../assets/images/icon/wishlist-nav.svg';
import loginIconSrc from '../../assets/images/icon/login.svg';

interface HeaderProps {
  openCartPanel: () => void,
}

const Header = ({ openCartPanel }: HeaderProps) => {
  const { totalPrice } = useContext(AppContext);

  const handleCartButtonClick = (evt: SyntheticEvent) => {
    evt.preventDefault();
    openCartPanel();
  }

  return (
    <header className="header">
      <div className="header__container">
        <Link className="logo" to={AppRoute.ROOT}>
          <img src={logoSrc} width="245" height="41" alt="Логотип React Sneakers" />
        </Link>
        <nav>
          <ul className="user-list">
            <li className="user-list__item">
              <a href="/" style={{ backgroundImage: `url("${cartIconSrc}")` }} onClick={handleCartButtonClick}>
                <span className="visually-hidden">Корзина</span>
                <span>{formatRuPrice(totalPrice)}</span>
              </a>
            </li>
            <li className="user-list__item user-list__item--icon">
              <Link to={AppRoute.WISHLIST} style={{ backgroundImage: `url("${wishlistIconSrc}")` }}>
                <span className="visually-hidden">Список желаний</span>
              </Link>
            </li>
            <li className="user-list__item user-list__item--icon">
              <Link to={AppRoute.PROFILE} style={{ backgroundImage: `url("${loginIconSrc}")` }}>
                <span className="visually-hidden">Вход</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
