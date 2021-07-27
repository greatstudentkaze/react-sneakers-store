import React from 'react';
import SwipeCore, { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';

import Button from '../button';

import './styles/promo.scss';
import sliderArrowNextSrc from '../../assets/images/icon/slider-arrow-next.svg';

SwipeCore.use([Autoplay, Navigation]);

const autoplayOptions = {
  delay: 5000,
};

const navigationOptions = {
  nextEl: '.promo__nav',
};

const promoItems = [
  {
    title: '<span style="color: #8BB43C;">Stan Smith</span>, Forever!',
    ctaText: 'Купить',
    imageSrc: {
      '1x':'promo/stan-smith-forever.jpg',
      '2x':'promo/stan-smith-forever@2x.jpg',
    }
  },
  {
    title: '<span style="color: #76b022;">Stan Smith</span>, Навсегда!',
    ctaText: 'Купить',
    imageSrc: {
      '1x':'promo/stan-smith-forever.jpg',
      '2x':'promo/stan-smith-forever@2x.jpg',
    }
  },
  {
    title: '<span style="color: #5f8e1c;">Стэн Смиты</span>, Навсегда!',
    ctaText: 'Купить',
    imageSrc: {
      '1x':'promo/stan-smith-forever.jpg',
      '2x':'promo/stan-smith-forever@2x.jpg',
    }
  },
];

const Promo = () => {
  return (
    <section className="promo">
      <h2 className="visually-hidden">Предложения магазина</h2>
      <Swiper className="promo__slider" wrapperTag="ul" spaceBetween={30} speed={500} autoplay={autoplayOptions} loop={true} navigation={navigationOptions}>
        {promoItems.map(({ title, imageSrc, ctaText }, i) => (
          <SwiperSlide key={i} className="promo__item" tag="li">
            <div className="promo__body">
              <h3 className="promo__title" dangerouslySetInnerHTML={{ __html: title }}/>
              <Button className="promo__button" uppercase>
                {ctaText}
              </Button>
            </div>
            <p className="promo__image">
              {/*todo: Vadim Makeev css imageset*/}
              <img
                src={imageSrc['1x']} srcSet={`${imageSrc['2x']} 2x`}
                width="960"
                height="300"
                alt=""
              />
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="promo__nav" type="button" style={{ backgroundImage: `url("${sliderArrowNextSrc}")` }}>
        <span className="visually-hidden">Следующий слайд</span>
      </button>
    </section>
  );
};

export default Promo;
