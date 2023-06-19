interface Localization {
  [key: string]: {
    [key: string]: string
  }
}
const localization: Localization = {
  'en-US': {
    timeformat: 'Time format: DAYS:HOURS:MINUTES',

    cooldown: 'Cooldown, buddy. Wait a few seconds and try again.',

    'ping-main': 'Pong! %VAR%',

    'server-embed-author': 'Server statistics',
    'server-nostat': 'This server has no games played. Play one to get started!',

    'user-embed-author': "%VAR%'s statistics",
    'user-self-nostat': 'You have no games played. Play one to get started!',
    'user-user-nostat': '%VAR% have no games played. I mean.. you could ask him to play something',

    'flush-nostat': 'You have no games to flush.',
    'flush-confirm-author': "⚠️ This action will remove everything we know you've played",
    'flush-confirm-desc': 'Remove %VAR% rows from database?',
    'flush-confirm-footer': 'This action is irreversible',
    'flush-confirm-button': 'Yes, flush',
    'flush-success': 'Flushed everything about you from database',
    'flush-timeout': 'Flushing timed out',

    'top-notfound': '404: No game found',
    'top-notfound-footer': "Hint: You must specify a full name of the game. You can also use game's id",
    'top-nostat': "No one in your server hasn't played this game yet. Play at least once to see it in here!",
    'top-embed-author': 'Top 10 players at "%VAR%" (%VAR%)',

    'link-nogame': "There's no game with this name or id",
    'link-author': 'Link created or updated',
    'link-success': "Great! Now when a user plays **%VAR%**, hours of **%VAR%**, we'll add **%VAR%** to this user's roles",
    'link-nopermission': "I don't have permission to manage roles",

    'list-author': 'Links',
    'list-nolinks': 'No links created',

    'remove-nolink': 'No game was linked to this role',
    'remove-success': 'Successfully removed link',
  },
  "uk": {
    timeformat: 'Формат часу: ДНІ:ГОДИНИ:ХВИЛИНИ',

    cooldown: 'Охолодись, козаче. Зачекай декілька секунд та спробуй ще раз.',

    'ping-main': 'Понг! %VAR%',

    'user-embed-author': 'Статистика %VAR%',
    'user-self-nostat': 'У Вас немає зіграних ігор. Зіграй одну щоб побачити її тут!',
    'user-user-nostat': '%VAR% ніколи не грав у ігри. Ну.. Ви б могли його попросити зіграти у щось',

    'server-embed-author': 'Статистика серверу',
    'server-nostat': 'Цей сервер ніколи не грав в ігри. Спробуйте зіграти у щось!',

    'flush-nostat': 'Ви не маєте ігор щоб очистити',
    'flush-confirm-author': '⚠️ Ця дія видалить усю інформацію про те, що Ви грали',
    'flush-confirm-desc': 'Видалити %VAR% записів з бази даних?',
    'flush-confirm-footer': 'Ця дія є незворотною',
    'flush-confirm-button': 'Так, видалити',
    'flush-success': 'Видалено всі записи про Вас з бази даних',
    'flush-timeout': 'Час видалення вичерпано',

    'top-notfound': '404: Гру не знайдено',
    'top-notfound-footer': 'Підказка: Ви повинні вказати повну назву. Ви можете використовувати ID гри',
    'top-nostat': 'Ніхто з учасників серверу ще не грав у цю гру. Зіграйте разочок щоб побачити її тут!',
    'top-embed-author': 'Топ 10 гравців у "%VAR%" (%VAR%)',

    'link-nogame': 'Не знайдено гри з такою назвою або ID',
    'link-author': "Прив'язка створена або оновлена",
    'link-success': 'Чудово! Відтепер, як тільки користувач зіграє **%VAR%**, годин у **%VAR%**, ми додамо **%VAR%** до ролей цього користувача',
    'link-nopermission': 'У мене немає права на керування ролями',

    'list-author': "Усі прив'язки",
    'list-nolinks': "Прив'язки відсутні",

    'remove-nolink': "До цієї ролі не прив'язані ігри",
    'remove-success': "Прив'язка успішно видалена",
  },
}

const getLocale = async (language: string, value: string, ...vars: any[]) => {
  if (language === 'ru') return 'RUSSIA IS A TERRORIST STATE'

  if (!localization[language]) localization[language] = localization['en-US']
  if (!localization[language][value]) {
    console.error(`There is no localization for "${value}" in language: ${language}. We'll use default language`)
    localization[language] = localization['en-US']
  }

  let locale = localization[language][value]

  if (!locale) {
    console.error(`There is no localization for "${value}" in language: en-US. We'll use a placeholder`)
    return value
  }

  let count = 0
  locale = locale.replace(/%VAR%/g, () => (vars[count++] !== undefined ? vars[count - 1] : '%VAR%'))

  return locale
}

export default getLocale
