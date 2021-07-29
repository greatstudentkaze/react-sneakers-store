import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { UserContext } from '../../context/user.context';
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

const AuthButtonText = {
  LOGIN: 'Войти',
  LOGOUT: 'Выйти',
}

const Header = ({ openCartPanel }: HeaderProps) => {
  const { user, logout, login } = useContext(UserContext);
  const { totalPrice } = useContext(AppContext);
  const [authButtonText, setAuthButtonText] = useState(AuthButtonText.LOGIN);

  const history = useHistory();

  useEffect(() => {
    setAuthButtonText(user ? AuthButtonText.LOGOUT : AuthButtonText.LOGIN);
  }, [user]);

  const handleAuthButtonClick = () => {
    user ? logout() : login({ email: 'hi@nefagin.ru' });
  };

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
              <Link className="with-popup" to={AppRoute.PROFILE} style={{ backgroundImage: `url("${loginIconSrc}")` }}>
                <span className="visually-hidden">Вход</span>
                <div className="user-list__popup">
                  <button type="button" onClick={() => history.push(AppRoute.PROFILE)}>
                    Мой профиль
                  </button>
                  <button type="button" onClick={handleAuthButtonClick}>
                    {authButtonText}
                  </button>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
