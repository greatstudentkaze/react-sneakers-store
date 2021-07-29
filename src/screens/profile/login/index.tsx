import { useContext } from 'react';

import { UserContext } from '../../../context/user.context';

import Section from '../../../components/section';
import InfoBlock from '../../../components/info-block';

import wavingHandSrc from '../../../assets/images/hey.png';
import './waving-hand.scss';

const Login = () => {
  const { login } = useContext(UserContext);

  return (
    <Section centered>
      <InfoBlock
        className="waving-hand"
        title={'Привет!'}
        description={'Войдите, чтобы посмотреть заказы'}
        imageData={{ src: wavingHandSrc, width: 70, height: 70 }}
        buttonText={'Войти в аккаунт'}
        onButtonClick={() => login({ email: 'hi@nefagin.ru' })}
        isNotGoBack
      />
    </Section>
  );
};

export default Login;
