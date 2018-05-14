import React from 'react';
import { IntlProvider } from 'react-intl';
// polyfill for safari
import intl from 'intl';

// import locale libraries
import zh from '../locales/zh';
import en from '../locales/en';

const languageMap = {
  zh,
  en,
};

const detectLocale = () => {
  if (navigator) {
    return navigator.language.split(/[-_]/)[0];
  }
  return 'en';
};


const AutoIntlProvider = props => {
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
