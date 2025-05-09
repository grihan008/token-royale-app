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
  'game.notCheckedIn': {
    en: 'YOU HAVE NOT CHECKED IN THIS GAME',
    ru: 'ВЫ НЕ ЗАРЕГИСТРИРОВАЛИСЬ В ЭТОЙ ИГРЕ',
  },
  'game.tryNextGame': {
    en: 'Try again in the next game',
    ru: 'Попробуйте снова в следующей игре',
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
    ru: 'ВОЙТИ',
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

  // Info dialog related
  'info.button': {
    en: 'Info',
    ru: 'Инфо',
  },
  'info.title': {
    en: 'About Token Royale',
    ru: 'О Token Royale',
  },
  'info.description': {
    en: 'Game Description\n\nThis game is a blockchain-based variation of the classic battle royale. Participants register and confirm their participation in each round to compete for a share of the prize pool. All game logic is fixed in a smart contract and is fully executed on the blockchain, which guarantees fairness and transparency.\n\n---\n\nRegistration\n\nThe main screen displays a timer that shows either the time until the game starts or until the end of registration for the current round.\n\nTo participate, click the "JOIN" button. After that, you will receive participant status. To continue the game, you need to check in for each round. Complete all rounds and you\'ll become a winner, receiving a share of the total prize pool.\n\n---\n\nGame Structure\n\nThe game runs daily and consists of several rounds.\n\nEach subsequent round is shorter than the previous one.\n\nMissing even one round means elimination from the game.\n\n---\n\nParticipation Cost\n\nRegistration: price is shown under the timer + network fee (~0.01 TON)\n\nCheck-in for each round: ~0.01 TON\n\n---\n\nPrize Pool\n\nUp to 85% of all fees go to the prize pool. It is indicated under the timer. Winners share it in equal parts.\n\nUp to 15% goes to platform maintenance and development.\n\n---\n\nImportant to Know\n\nAll rules and mechanics are fixed in the smart contract and cannot be changed.\n\nCheck-in is sending a minimum amount of TON to the contract address. The funds (minus the network fee) are returned back to you.\n\nPlease note: transaction confirmation in the TON network takes an average of 10-20 seconds. Take this into account when calculating the time for check-in in each round.',
    ru: 'Описание игры\n\nИгра представляет собой вариацию классического батл-рояля, реализованную на блокчейне. Участники регистрируются и подтверждают своё участие в каждом раунде, чтобы побороться за часть призового фонда. Вся логика игры зафиксирована в смарт-контракте и полностью выполняется на блокчейне, что гарантирует честность и прозрачность.\n\n---\n\nРегистрация\n\nНа главном экране отображается таймер, который транслирует время либо до начала игры, либо до окончания регистрации в текущем раунде.\n\nЧтобы принять участие, нажмите кнопку «Зарегистрироваться». После этого вы получите статус участника. Для продолжения игры нужно проходить чек-ин в каждом из раундов. Пройдёте все — станете победителем и получите долю от общего призового фонда.\n\n---\n\nСтруктура игры\n\nИгра проходит ежедневно и состоит из нескольких раундов.\n\nКаждый следующий раунд короче предыдущего.\n\nПропуск хотя бы одного раунда означает вылет из игры.\n\n---\n\nСтоимость участия\n\nРегистрация: цена указана под таймером + комиссия сети (~0.01 TON)\n\nЧек-ин в каждом раунде: ~0.01 TON\n\n---\n\nПризовой фонд\n\nДо 85% всех взносов направляются в призовой фонд. Он указан под таймером. Победители делят его в равных долях.\n\nДо 15% идут на поддержание и развитие платформы.\n\n---\n\nВажно знать\n\nВсе правила и механики закреплены в смарт-контракте и не могут быть изменены.\n\nЧек-ин — это отправка минимальной суммы TON на адрес контракта. Средства (за вычетом комиссии сети) возвращаются вам обратно.\n\nОбратите внимание: подтверждение транзакции в сети TON занимает в среднем 10–20 секунд. Учитывайте это при расчёте времени для чек-ина в каждом раунде.',
  },
  'info.close': {
    en: 'Close',
    ru: 'Закрыть',
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
