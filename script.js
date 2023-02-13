const TelegramBot = require("node-telegram-bot-api");
const {
  showMenu,
  showCatalog,
  showAdminMenu,
  debug,
  addAdminStickEl,
  addAdminGooEl,
  delAdminEl,
  editAdminEl,
} = require("./functions.js");
const fs = require("fs");

const TOKEN = "5976383195:AAHzDFsW09LcNBwqC4YB-evC-d_rP51xhWQ"; //токен бота

const creator = "gh6u9do"; // админ ID
const danik = "FKGDOKU";
const maxim = "ohhWavee";

const bot = new TelegramBot(TOKEN, {
  //настройка поллинг
  polling: true,
});

console.log("работаем");

bot.onText(/^хуй/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "сам ты хуй, ты соображешь что ты боту пишешь, фрик?");
})

bot.onText(/\/start/, (msg) => {
  //===================================ОБРАБОТКА СООБЩЕНИЯ СТАРТ
  const chatId = msg.chat.id;

  bot.sendMessage(
    chatId,
    "Привет, я помогу тебе получить нужную информацию 🙂"
  );
  showMenu(chatId, bot);
});

bot.onText(/\/admin/, (msg) => {
  //=========================================ОБРАБОТКА СООБЩЕНИЯ АДМИН
  const chatId = msg.chat.id;
  const userName = msg.chat.username;
  if (userName == creator || userName == danik || userName == maxim) {
    showAdminMenu(chatId, bot);
  } else {
    bot.sendMessage(
      chatId,
      "хуядмин"
    );
  }
});

bot.onText(/^ред\s\(.*\,.*\,.*\)/, (msg)=>{
  //===========================================ОБРАБОТКА СООБЩЕНИЯ РЕДАКТИРОВАТЬ
  const chatId = msg.chat.id;
  const userName = msg.chat.username;
  let string = msg.text;

  if (userName == creator || userName == danik || userName == maxim) {
    editAdminEl(chatId, bot, string);
  } else {
    bot.sendMessage(
      chatId,
      "пошел нахуй школьник, хакер ебаный, нашел команду думаешь крутой?"
    );
  }
})

bot.onText(/^доб\sдудку\s\(.*\,.*\,.*\,.*\,.*\)/, (msg) => {
  //==========================================ОБРАБОТКА СООБЩЕНИЯ ДОБАВИТЬ ДУДКУ
  const chatId = msg.chat.id;
  const userName = msg.chat.username;
  let string = msg.text;

  if (userName == creator || userName == danik || userName == maxim) {
    addAdminStickEl(chatId, bot, string);
  } else {
    bot.sendMessage(
      chatId,
      "пошел нахуй школьник, хакер ебаный, нашел команду думаешь крутой?"
    );
  }
});

bot.onText(/^доб\sжижу\s\(.*\,.*\,.*\,.*\)/, (msg) => {
  //==========================================ОБРАБОТКА СООБЩЕНИЯ ДОБАВИТЬ ДУДКУ
  const chatId = msg.chat.id;
  const userName = msg.chat.username;
  let string = msg.text;

  if (userName == creator || userName == danik || userName == maxim) {
    addAdminGooEl(chatId, bot, string); //!!!!!!!!!!!!!!!!!!!!!!!!!
  } else {
    bot.sendMessage(
      chatId,
      "пошел нахуй школьник, хакер ебаный, нашел команду думаешь крутой?"
    );
  }
});

bot.onText(/^удл\s\(.*\)/, (msg) => { 
  //=========================================ОБРАБОТКА СООБЩЕНИЯ УДАЛИТЬ
  const chatId = msg.chat.id;
  const userName = msg.chat.username;
  let string = msg.text;

  if (userName == creator || userName == danik || userName == maxim) {
    delAdminEl(chatId, bot, string);
  } else {
    bot.sendMessage(
      chatId,
      "пошел нахуй школьник, хакер ебаный, нашел команду думаешь крутой?"
    );
  }
});

bot.on("callback_query", (query) => {
  //==============================================ОБРАБОТКА КОДА МЕНЮ
  let queryChatId = query.message.chat.id;
  let txtFile = fs.readFileSync("catalog.json", "utf-8");
  let jsonFile = JSON.parse(txtFile);

  switch (query.data) {
    case "1": {
      console.log(query.data);

      let bufferString = showCatalog(jsonFile);

      bot.sendMessage(queryChatId, bufferString, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Назад",
                callback_data: "backToMenu",
              },
            ],
          ],
        },
      });
      break;
    }
    case "2": {
      console.log(query.data);
      bot.sendMessage(queryChatId, "в разработке");
      break;
    }
    case "3": {
      console.log(query.data);
      bot.sendMessage(
        queryChatId,
        "Для покупки в Мск - @ohhWavee \n\nДля покупки за пределами Мск - @FKGDOKU",
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Назад",
                  callback_data: "backToMenu",
                },
              ],
            ],
          },
        }
      );
      break;
    }
    case "4": {
      console.log(query.data);
      bot.sendMessage(
        queryChatId,
        "Здесь вы можете оставить свой отзыв @AirPuffotzivi",
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Назад",
                  callback_data: "backToMenu",
                },
              ],
            ],
          },
        }
      );
      break;
    }
    case "backToMenu": {
      showMenu(queryChatId, bot);
      break;
    }
    case "backToAdminMenu": {
      showAdminMenu(queryChatId, bot);
      break;
    }
    case "admin1": {
      //ВЫВОД ТЕКСТА НА КНОПКУ ПОКАЗАТЬ КАТАЛОГ

      let bufferString = showCatalog(jsonFile);
      bot.sendMessage(queryChatId, bufferString, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Назад",
                callback_data: "backToAdminMenu",
              },
            ],
          ],
        },
      });
      break;
    }
    case "admin2": {
      //=====================================ВЫВОД ТЕКСТА НА КНОПКУ РЕДАКТИРОВАТЬ ЭЛЕМЕНТ===========================

      let bufferString = showCatalog(jsonFile);
      bot.sendMessage(queryChatId, bufferString);

      let sendManual = new Promise((resolve,reject) => {
        resolve(
          bot.sendMessage(queryChatId, "[ADMIN-MENU]\n\nЧтобы редактировать элемент укажите следующие параметры в нужном формате:\n\nред (индекс в каталоге,параметр,новое значение)\n\nсписок параметров дудки: название, тяги, цена, вкусы, никотин\n\nсписок параметров жижи: название, цена, вкусы, никотин\n\nОбразец ниже:")
        )
      })

      sendManual.then(() =>{
        bot.sendMessage(queryChatId, "ред (1,тяги,1500)", {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Назад",
                  callback_data: "backToAdminMenu",
                },
              ],
            ],
          },
        });
      })
      break;
    }

    case "admin3": {
      //ВЫВОД ТЕКСТА НА КНОПКУ ДОБАВИТЬ ЭЛЕМЕНТ
      let sendManual = new Promise((resolve, reject) => {
        resolve(
          bot.sendMessage(queryChatId, "[ADMIN-MENU]\n\nЧтобы добавить дудку/жижу в каталог укажите следующие параметры в нужном формате:\n\nдоб дудку (название,кол-во тяг,цена,[вкус1 вкус2 поАналогии],никотин)\n\nдоб жижу (название,цена,[вкус1 вкус2 поАналогии],никотин)\n\nОбразец ниже:")
        );
      })

      sendManual.then(() => {
        bot.sendMessage(queryChatId, "доб дудку (hqd,5000,750,[малина ягода хуй],5%)")
      }
      ).then(() => {
        bot.sendMessage(queryChatId, "доб жижу (hotspot,299,[банан йогурт киви],5%)", {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Назад",
                  callback_data: "backToAdminMenu",
                },
              ],
            ],
          },
        });
      })

      break;
    }

    case "admin4": {
      //ВЫВОД ТЕКСТА НА КНОПКУ УДАЛИТЬ ЭЛЕМЕНТ
      let sendManual = new Promise((resolve, reject) => {
        resolve(
          bot.sendMessage(queryChatId, "[ADMIN-MENU]\n\nЧтобы удалить элемент из каталога укажите следующие параметры в нужном формате: удл (номер позиции)\n\nОбразец ниже:")
        );
      });

      sendManual.then(() => {
        bot.sendMessage(queryChatId, "удл (1)", {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Назад",
                  callback_data: "backToAdminMenu",
                },
              ],
            ],
          },
        });
      })
    }
  }
});
