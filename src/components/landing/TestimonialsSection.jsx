import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useT } from '../../lib/i18n';
import { coverageTranslations } from '../../lib/i18n-coverage';

const cities = [
  { name: 'Marrakech', img: 'https://images.openai.com/static-rsc-4/YX5HSRyuyYgpkIU8q4zhO8Pq05-jdCIiavAFRbk-CugFqz9ZdUP7G3qwAEjXGciTt8LSkx_wom44HiZqtKDNN8fRXLZZT1Gg1ZrqpY5P0xG0fADhLEzfg5lnnN2L_s5aGQqdkrnGyZFnd-slZWIb-tYEn037rRdoF3RLM-U-savYUFj_PSHN7JyAlqSBf7h-?purpose=fullsize' },
  { name: 'Fès', img: 'https://images.openai.com/static-rsc-4/zS_f3d1VfZFmapvnyX6j2lruvMXaGbf6gOYbp-CRa8FKxLy-gQytY9dlIv9Vdwx3xF1jliH-nASvEBk7j1Cc_1RUErZF5w8HVFJFpKswqDqkP1GQJ8lCIOwUctVqPE3hKS7lyiKOpmYAifgxw59jhdgPCww_mfH55fDMkz6r4cmmN-pqq3Feqvw5tcBh4Diq?purpose=fullsize' },
  { name: 'Chefchaouen', img: 'https://images.openai.com/static-rsc-4/NP_p3STNKytrxQJC5mXl45gsVoYbG4G06Vr4ZdFrcXwnVBEKcuHhFmNTTOPVIYC_U-aGtashiL6dqjerMTy-_g6QzPQQQqXQ7uoZbd5sr4XQMdIcCryqA9r9EzwJaLuvCZowPIz_vhaSO-37DVPzdcwGcjZWHq9-Yrlh1k1Gg9yvJuhS9idA86Xd1vCMfFWT?purpose=fullsize' },
  { name: 'Casablanca', img: 'https://images.openai.com/static-rsc-4/Tdj-oF3JSUyXk95QAFZGV7lAAp91i7SSnQSquPYpKeaVeBZXKhqf7e3sq0sRuu-PTGNgGBZAsd7tWFpuRp0WvXjyXULwNHQHUGa6cgOPtRsclxNhtr84P7MY6GjNX9HJ1rtyE36FcM3i_7OEVyNudHoe2ONYpsILhFgXPf1fc-YoQrgdF_WT6W6BY2Ca93Cr?purpose=fullsize' },
  { name: 'Rabat', img: 'https://images.openai.com/static-rsc-4/24bb3Xy0XScs6fWSDaDNUzMaMxvHOXi7R3ZU48b8AqTKs3VhRrUZW5pcT6VZCFU2bobUxgTUBKG8t_y0gikHTSJU8_V7UIB5akme3hgA3nbIkQymp3OU_EEXvY8cV9RDXBdF1uLOdQlwm-THxhb7Pa2tgqUltmPkPQkKfmZ922zct4u1cTvjrwclSMqrRVpH?purpose=fullsize' },
  { name: 'Meknès', img: 'https://images.openai.com/static-rsc-4/OUV2WxcWbAvCUxGbq44Q8hjdYlkwf0S6oYJkFpCn2332_Vr0DUr3KZixUbvXemaPMS4riWA83D0ddfpm6V5dV9ZD2Yv2QlOHS03ctYPVZ4N-l65-9uQYOKyNr9WPE5wAIbHIwRMVbCnY98f8seMK4B5a3DP9MF7zKOdopdYiOUYeOpRrWGtLmFECa83grF9t?purpose=fullsize' },
  { name: 'Agadir', img: 'https://images.openai.com/static-rsc-4/Zo1cPxMHOk7Q39VPtNKvG5jletF1PEo4QEdy-FY-7JUhBGzWKmdQLMHfrA80FueztEVtKqJyeHMeka9dLRY22KqAtUv6aLDGzrmUNz3-MtszkCIQL7XoE-zKTUphOKma8FgaMOxZHV3h7HX7VtVcWtxR-qz7H6voPbTfZyHcZF4RKB6IPwk67usWJILPT4bt?purpose=fullsize' },
  { name: 'Tanger', img: 'https://images.openai.com/static-rsc-4/lXSe49UcKHzC08zuj0x6Rh0ssP922hlWKNQdGrh7YrRc_6HvQ2I6Y40o6Ov7FLrRmxo1rBPOhxK_Vx0SLxqUps0SIRHCFe42SBtwtCo3hwoeczLzHRptfqAvG1vYVRWhUnarqRdWb_1dc6pitqohEA5M4eamUUWqZwZb7rO4QuR1ZYLxljFlun40Ts4uVfyV?purpose=fullsize' },
  { name: 'Essaouira', img: 'https://images.openai.com/static-rsc-4/67cphEse5ftCx5uwK5t-kfLCQ9EaW8p5wJeBOBnT9AMHT4xsVfHysH8hVyhVng-9o5HX4GzDbxlQhPq7AbrKAm7Hwwqb71HMwjxlpRFtFm4AKkCCbParNv0g_FZyaGg0aYMp-eN_cPQrEXjnqaZrM9WaCTaZi7ygTVfaS-KdH1iMCuznQI2Tt7x7hK1ZBfbZ?purpose=fullsize' },
  { name: 'Ouarzazate', img: 'https://images.openai.com/static-rsc-4/H5QIbYIaWIuplHVPW9rZ3Cp20Rth45EmAtCaeIlAXrJwTaMRGo7ZNLO_5keE_L2ix3j7k2faJa928Tn3X5ghCboRlVVgQwz_GNpM7Y491sdmgE5plQAgg1LOzeoE4285Ede-LBp6ebDbPQAsWivWPyjwwpN47TZAnnjMBTg_cdHikPoPwS8rEQDXpoHaHUl3?purpose=fullsize' },
  { name: 'Merzouga', img: 'https://images.openai.com/static-rsc-4/WQ8-O0AGq7Mdhufk3nuAv3Wkm7Jwv1rqqduce_aS2oZv2sTtksPS9nGs9ey8Kk2vg0rIZlUi1Q-tSV0CsQT7Tmh0iUurJ520YmGKHfaXuppAyN09cdnr8V33wru6bAC1Dl4so1u6licFKXEe1_YaehpQworKYfdRimcso3_VYMxo3LZkhS6dbRKf8Jr-wk29?purpose=fullsize' },
  { name: 'Dakhla', img: 'https://images.openai.com/static-rsc-4/L6BRc8lh_QlsoM9npsnLjUuXJc5MxrxYfuWGo-BeX6O7mEtw4vj1vfW_ztEkuGv0cdi2TcwKipS4Wm94_RpO8V0UVt2-LrIJWVRx-xlck-qv_hmHlPTkg6dYw0MtbLa5vhoAvkXv6GXvlaRWxqMaco15s2YH63h-NNCfeFYHQ7G9TgU3t4WsNpMlLy_7kKud?purpose=fullsize' },
];

export default function TestimonialsSection({ lang }) {
  const t = useT(lang);
  const coverage = coverageTranslations[lang] || coverageTranslations.fr;

  const getCoverageTitle = () => coverage.coverage_title;
  const getCoverageSubtitle = () => coverage.coverage_subtitle_text;

  const testimonials = [
    { textKey: 'test1_text', nameKey: 'test1_name', originKey: 'test1_origin', rating: 5, flag: '🇫🇷' },
    { textKey: 'test2_text', nameKey: 'test2_name', originKey: 'test2_origin', rating: 5, flag: '🇬🇧' },
    { textKey: 'test3_text', nameKey: 'test3_name', originKey: 'test3_origin', rating: 5, flag: '🇪🇸' },
  ];

  return (
    <>
      {/* Cities */}
      <section className="py-16 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-poppins font-black text-3xl text-white mb-2">
              {getCoverageTitle()} <span className="text-shield-green text-lg align-middle">🇲🇦</span>
            </h2>
            <p className="text-gray-500 text-sm">{getCoverageSubtitle()}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {cities.map((city) => (
              <div
                key={city.name}
                className="relative rounded-2xl overflow-hidden group cursor-pointer"
              >
                <img
                  src={city.img}
                  alt={city.name}
                  className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-shield-green flex-shrink-0"></div>
                  <span className="text-white text-xs font-bold">{city.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-shield-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-poppins font-black text-4xl text-white mb-12">{t('testimonials_title')}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((test, i) => (
              <div key={i} className="bg-shield-card border border-shield-border rounded-2xl p-6 hover:border-shield-green/20 transition-all card-glow">
                <Quote className="w-8 h-8 text-shield-green/30 mb-4" />
                <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">"{t(test.textKey)}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-shield-green/20 flex items-center justify-center text-xl">
                    {test.flag}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{t(test.nameKey)}</div>
                    <div className="text-xs text-gray-500">{t(test.originKey)}</div>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array(test.rating).fill(0).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 text-shield-gold fill-shield-gold" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}