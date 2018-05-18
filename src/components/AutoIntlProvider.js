import React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';

// import locale libraries
import zhMessages from '../locales/zh';
import enMessages from '../locales/en';

addLocaleData(...zh, ...en);

const languageMap = {
  zh: zhMessages,
  en: enMessages,
};

const detectLocale = () => {
  if (navigator) {
    return navigator.language.split(/[-_]/)[0];
  }
  return 'en';
};


const AutoIntlProvider = (props) => {
  const { children } = props;

  return (
    <IntlProvider
      locale={detectLocale()}
      messages={languageMap[detectLocale()]}
    >
      {children}
    </IntlProvider>
  );
};

export default AutoIntlProvider;
