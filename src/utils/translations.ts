export type Language = 'en' | 'ru';

interface Translations {
  [key: string]: {
    en: string;
    ru: string;
  };
}

// Add all the text that needs to be translated here
export const translations: Translations = {
  // Game related
  'game.connectWallet': {
    en: 'Please connect your wallet',
    ru: 'Пожалуйста, подключите кошелек',
  },
  'game.loading': {
    en: 'Loading...',
    ru: 'Загрузка...',
  },
  'game.noGame': {
    en: 'There is no game planned yet',
    ru: 'Игра еще не запланирована',
  },
  'game.completed': {
    en: 'GAME COMPLETED',
    ru: 'ИГРА ЗАВЕРШЕНА',
  },
  'game.winnersAnnouncement': {
    en: 'The winners will be announced soon!',
    ru: 'Победители будут объявлены в ближайшее время!',
  },
  'game.registered': {
    en: 'YOU HAVE ALREADY REGISTERED',
    ru: 'ВЫ УЖЕ ЗАРЕГИСТРИРОВАНЫ',
  },
  'game.getReady': {
    en: 'Get ready for the game to start',
    ru: 'Приготовьтесь к началу игры',
  },
  'game.checkedIn': {
    en: 'YOU HAVE ALREADY CHECKED IN THIS ROUND',
    ru: 'ВЫ УЖЕ ЗАРЕГИСТРИРОВАЛИСЬ В ЭТОМ РАУНДЕ',
  },
  'game.eliminated': {
    en: 'YOU HAVE BEEN ELIMINATED',
    ru: 'ВЫ ВЫБЫЛИ ИЗ ИГРЫ',
  },
  'game.betterLuck': {
    en: 'Better luck next time',
    ru: 'Удачи в следующий раз',
  },
  'game.startIn': {
    en: 'Game starts in',
    ru: 'Игра начнется через',
  },
  'game.eliminationIn': {
    en: 'Elimination in',
    ru: 'Выбывание через',
  },
  'game.join': {
    en: 'JOIN',
    ru: 'ЗАРЕГИСТРИРОВАТЬСЯ',
  },
  'game.checkIn': {
    en: 'CHECK-IN',
    ru: 'ЧЕК-ИН',
  },
  'game.rounds': {
    en: 'Rounds',
    ru: 'Раунды',
  },
  'game.registration': {
    en: 'Registration',
    ru: 'Регистрация',
  },
  'game.round': {
    en: 'Round',
    ru: 'Раунд',
  },
  'game.players': {
    en: 'Players',
    ru: 'Игроки',
  },
  'game.prizePool': {
    en: 'Prize pool',
    ru: 'Призовой фонд',
  },
  'game.entryFee': {
    en: 'Entry fee',
    ru: 'Плата за вход',
  },

  // Winners related
  'winners.title': {
    en: 'Winners',
    ru: 'Победители',
  },
  'winners.previousGame': {
    en: 'Previous game winners',
    ru: 'Победители предыдущей игры',
  },
  'winners.allTime': {
    en: 'All time winners',
    ru: 'Победители всех времен',
  },
  'winners.address': {
    en: 'Address',
    ru: 'Адрес',
  },
  'winners.winnings': {
    en: 'Winnings',
    ru: 'Выигрыш',
  },
  'winners.wins': {
    en: 'Wins',
    ru: 'Победы',
  },
};

// Helper function to get translation
export const getTranslation = (key: string, language: Language): string => {
  if (!translations[key]) {
    console.warn(`Translation key not found: ${key}`);
    return key;
  }
  return translations[key][language];
};
