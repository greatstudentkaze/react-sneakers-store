import { useContext, useEffect } from 'react';

import { UserContext } from '../../context/user.context';
import useDataAPI from '../../hooks/useDataAPI';
import { API } from '../../utils/api';
import { formatRuPrice } from '../../utils/formatRuPrice';
import { OrderItem } from '../../interfaces/orders.interface';

import CardItemList from '../../components/card-item-list';
import NoOrders from './no-orders';
import SomethingWentWrong from '../../components/something-went-wrong';
import Section from '../../components/section';
import Loader from '../../components/loader';
import Login from './login';
import HeadingTag from '../../components/heading-tag';

import './orders.scss';

const Profile = () => {
  const [{ isError, isLoading, data: orders }, doFetch,] = useDataAPI<OrderItem[]>(API.ORDERS, []);

  useEffect(() => {
    doFetch(API.ORDERS);
  }, [doFetch]);

  if (isLoading) {
    return (
      <Section centered>
        <Loader className="active" />
      </Section>
    );
  }

  if (isError) {
    return <SomethingWentWrong />;
  }

  if (!orders.length) {
    return <NoOrders />;
  }

  return (
    <Section className="orders" title={'Мои заказы'}>
      {orders.map((order: OrderItem) => (
        <div className="orders__item order-item" key={order.id}>
          <HeadingTag className="order-item__title" level="3">
            Заказ #{order.id}
          </HeadingTag>
          <time className="order-item__date" dateTime={order.createdAt}>
            {new Date(order.createdAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' })}
          </time>
          <p className="order-item__price">
            Сумма заказа: <b>{formatRuPrice(order.items.reduce((amount, it) => amount + it.price, 0))}</b>
          </p>
          <CardItemList className="order-item__items" items={order.items} isLoading={isLoading} />
        </div>
      ))}
    </Section>
  );
};

const ProfileScreen = () => {
  const { user } = useContext(UserContext);

  return (
    <main className="main">
      {user
        ? <Profile />
        : <Login />
      }
    </main>
  );
};

export default ProfileScreen;
