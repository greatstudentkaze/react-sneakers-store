import Section from '../section';
import InfoBlock from '../info-block';

import somethingWentWrongSrc from '../../assets/images/something-went-wrong.png';

const SomethingWentWrong = () => (
  <Section centered>
    <InfoBlock
      title={'Что-то пошло не так...'}
      description={'Попробуйте обновить страницу'}
      imageData={{ src: somethingWentWrongSrc, width: 70, height: 70 }}
    />
  </Section>
);

export default SomethingWentWrong;
