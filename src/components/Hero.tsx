import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { useLanguage } from '../context/LanguageContext';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const featuredGames = [
  {
    titleKey: "cyberLegends",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e"
  },
  {
    titleKey: "epicFantasy",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f"
  },
  {
    titleKey: "speedMasters",
    image: "https://images.unsplash.com/photo-1548438294-1ad5d5f4f063"
  }
];

export default function Hero() {
  const { t } = useLanguage();

  return (
    <div className="relative mt-16">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation
        pagination={{ 
          clickable: true,
          dynamicBullets: true
        }}
        loop={true}
        speed={1000}
        className="h-[400px] group"
      >
        {featuredGames.map((game, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full">
              <div className="absolute inset-0">
                <img
                  src={game.image}
                  alt={t(game.titleKey)}
                  className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-[2000ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F15] via-[#0F0F15]/50 to-transparent opacity-60" />
              </div>
              <div className="absolute bottom-8 left-8 right-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  {t(game.titleKey)}
                </h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}