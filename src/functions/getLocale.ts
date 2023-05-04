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

        "user-embed-author": "%VAR%'s statisics",
        "user-self-nostat": "You have no games played. Play one to get started!",
        "user-user-nostat": "%VAR% have no games played. I mean.. you could ask him to play something",

        "flush-nostat": "You have no games to flush.",
        "flush-confirm-author": "⚠️ This action will remove everything we know you've played",
        "flush-confirm-desc": "Remove %VAR% rows from database?",
        "flush-confirm-footer": "This action is irreversible",
        "flush-confirm-button": "Yes, flush",
        "flush-success": "Flushed everything about you from database",
        "flush-timeout": "Flushing timed out",

        "top-notfound": "404: No game found",
        "top-notfound-footer": "Hint: You must specify a full name of the game. You can also use game's id",
        "top-nostat": "No one in your server hasn't played this game yet. Play at least once to see it in here!",
        "top-embed-author": 'Top 10 players at "%VAR%" (%VAR%)',
    },
    "en-GB": {
      "cooldown": 'Steady on, mate. Give it a tick and \'ave another go, yeah?',

      "ping-main": "Pong! %VAR%",

      "server-embed-author": "Blimey, let's 'ave a butcher's at them server stats, shall we?",
      "server-nostat": "Blimey, this server's a bit quiet, innit? 'Ave a go at a game to get the ball rollin', why don't ya?",

      "user-embed-author": "Let's 'ave a gander at %VAR%'s numbers and see 'ow they stack up, eh?",
      "user-self-nostat": "Well, you've not 'ad a crack at any games yet, 'ave ya? Get yer act together and 'ave a go at one to get things goin', mate!",
      "user-user-nostat": "%VAR%'s a bit of a slacker, ain't 'e? Might as well give 'im a nudge and see if 'e fancies 'avin' a go at one of them games, eh?",

      "flush-nostat": "Well, looks like there's no games for you to chuck down the loo, mate! Better get to playin' if you want to get in on the action.",
      "flush-confirm-author": "⚠️ Steady on, mate! If you go through with this, we'll be in the dark about all them games you've been 'avin' a crack at.",
      "flush-confirm-desc": "You're not thinkin' of scrappin' a %VAR% rows from the database, are ya?",
      "flush-confirm-footer": "Understand, once you go ahead, there's no turnin' back.",
      "flush-confirm-button": "Flush it all down the loo like yesterday's bangers and mash!",
      "flush-success": "Blimey, mate! We've gone and wiped the slate clean! Your gaming history is as empty as a pub on a Monday mornin!",
      "flush-timeout": "My man, flushing time got out",
      
      "top-notfound": "404: Seems like we can't seem to find any trace of the game you're lookin' for!",
      "top-notfound-footer": "Nugget of knowledge: Give the full name, or the game's ID, or we'll be as lost as a tourist in London!",
      "top-nostat": "Blimey, not a sausage! It looks like no one on your server's been giving this game a go. Time to roll up your sleeves and get stuck in, mate! Play it once and we'll make sure it shows up here in all its glory!",
      "top-embed-author": 'The top 10 players at %VAR% are as sharp as a tack and quick as a wink. (%VAR%)',
  },
    "uk": {
        "cooldown": 'Охолодись, козаче. Зачекай декілька секунд та спробуй ще раз.',

        "ping-main": "Понг! %VAR%",

        "user-embed-author": "Статистика %VAR%",
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
        "flush-timeout": "Час видалення вичерпано",

        "top-notfound": "404: Гру не знайдено",
        "top-notfound-footer": "Підказка: Ви повинні вказати повну назву. Ви можете використовувати ID гри",
        "top-nostat": "Ніхто з участників серверу ще не грав у цю гру. Зіграйте разочок щоб побачити її тут!",
        "top-embed-author": 'Топ 10 гравців у "%VAR%" (%VAR%)',
    }
}

const getLocale = async(language: string, value: string, ...vars: any[]) => {

    if(language === 'ru') return "RUSSIA IS A TERRORIST STATE"

    if (!localization[language]) localization[language] = localization['en-US'];
    if (!localization[language][value]){
      console.error(`There is no localization for "${value}" in language: ${language}. We'll use default language`)
      localization[language] = localization['en-US'];
    }

    let locale = localization[language][value];

    if(!locale){
      console.error(`There is no localization for "${value}" in language: en-US. We'll use a placeholder`)
      return value
    }

    let count = 0;
    locale = locale.replace(/%VAR%/g, () => vars[count++] !== undefined ? vars[count - 1] : "%VAR%");

    return locale;
}

export default getLocale;
