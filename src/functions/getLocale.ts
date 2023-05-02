interface Localization {
  [key: string]: {
    [key: string]: string;
  };
}
const localization: Localization = {
    "en-US": {
        "cooldown": 'Cooldown, buddy. Wait a few seconds and try again.',

        "ping-main": "Pong! %VAR%",

        "server-embed-author": "Server statistics",
        "server-nostat": "This server has no games played. Play one to get started!",

        "user-embed-author": "Your statistics",
        "user-self-nostat": "You have no games played. Play one to get started!",
        "user-user-nostat": "%VAR% have no games played. I mean.. you could ask him to play something",

        "flush-nostat": "You have no games to flush.",
        "flush-confirm-author": "⚠️ This action will remove everything we know you've played",
        "flush-confirm-desc": "Remove %VAR% rows from database?",
        "flush-confirm-footer": "This action is irreversible",
        "flush-confirm-button": "Yes, flush",
        "flush-success": "Flushed everything about you from database",
    },
    "uk": {
        "cooldown": 'Охолодись, козаче. Зачекай декілька секунд та спробуй ще раз.',

        "ping-main": "Понг! %VAR%",

        "user-embed-author": "Ваша статистика",
        "user-self-nostat": "У Вас немає зіграних ігор. Зіграй одну щоб побачити її тут!",
        "user-user-nostat": "%VAR% ніколи не грав у ігри. Ну.. Ви б могли його попросити зіграти у щось",

        "server-embed-author": "Статистика серверу",
        "server-nostat": "Цей сервер ніколи не грав в ігри. Спробуйте зіграти у щось!",
        
        "flush-nostat": "Ви немаєте ігор щоб очистити",
        "flush-confirm-author": "⚠️ Ця дія видалить усю інформацію про те, що Ви грали",
        "flush-confirm-desc": "Видалити %VAR% записів з бази данних?",
        "flush-confirm-footer": "Ця дія є незворотньою",
        "flush-confirm-button": "Так, видалити",
        "flush-success": "Видалено всі записи про Вас з бази данних",
    }
}

const getLocale = async(language: string, value: string, ...vars: any[]) => {

    if(language === 'ru') return "RUSSIA IS A TERRORIST STATE"

    if (!localization[language]) localization[language] = localization['en-US'];
    if (!localization[language][value]){
      console.error(`There is no localization for value: ${value} in language: ${language}.\nWe'll try to use "en-US" instead to prevent an error.`)
      localization[language] = localization['en-US'];
    }

    let locale = localization[language][value];

    if(!locale){
      console.error(`There is no localization for value: ${value} in language: ${language}.\nWe'll use value name instead to prevent an error.`)
      return value
    }

    let count = 0;
    locale = locale.replace(/%VAR%/g, () => vars[count] !== null ? vars[count] : "%VAR%");

    return locale;
}

export default getLocale;
