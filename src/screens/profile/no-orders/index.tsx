import Section from '../../../components/section';
import InfoBlock from '../../../components/info-block';

import emptyOrderListSrc from '../../../assets/images/empty-orderlist.png';

const NoOrders = () => (
  <Section centered>
    <InfoBlock
      title={'У вас нет заказов'}
      description={'Вам нравится ходить босиком? Оформите хотя бы один заказ.'}
      imageData={{ src: emptyOrderListSrc, width: 70, height: 70 }}
    />
  </Section>
);

export default NoOrders;
