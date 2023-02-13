let showMenu = (chatId, bot) => {
  //==============================================ПОКАЗАТЬ МЕНЮ

  bot.sendMessage(chatId, "Выбери нужный пункт: ", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Обычный каталог",
            callback_data: "1",
          },
        ],

        [
          {
            text: "Оптовый каталог",
            callback_data: "2",
          },
        ],

        [
          {
            text: "Связаться для покупки",
            callback_data: "3",
          },
        ],

        [
          {
            text: "Отзывы",
            callback_data: "4",
          },
        ],
      ],
    },
  });
};

let showAdminMenu = (chatId, bot) => {
  //================================================ПОКАЗАТЬ АДМИН МЕНЮ

  bot.sendMessage(chatId, "[ADMIN-MENU]\n\nВыбери нужный пункт: ", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Посмотреть каталог",
            callback_data: "admin1",
          },
        ],

        [
          {
            text: "Изменить элемент",
            callback_data: "admin2",
          },
        ],

        [
          {
            text: "Добавить элемент",
            callback_data: "admin3",
          },
        ],

        [
          {
            text: "Удалить элемент",
            callback_data: "admin4",
          },
        ],
      ],
    },
  });
};

function showCatalog(jsonFile) {
  //=============================================ПОКАЗАТЬ КАТАЛОГ============================================
  let result = "";
  for (i = 0; i < jsonFile.length; i++) {

    if(jsonFile[i].type == "дудка"){
      let itemName = jsonFile[i].name;
      let itemTraction = jsonFile[i].qty_traction;
      let itemCost = jsonFile[i].cost;
      result += `[${i + 1}] ${itemName} ${itemTraction} тяг  - ${itemCost} руб\n`;
    }
    else if(jsonFile[i].type == "жижа"){
      let itemName = jsonFile[i].name;
      let itemCost =  jsonFile[i].cost;
      let itemTasty = jsonFile[i].tasty.join(", ");
      result += `[${i + 1}] жижа  ${itemName} со вкусами: ${itemTasty} - ${itemCost} руб\n`
    }
  }
  return result;
}

function debug(obj = {}) {
  return JSON.stringify(obj, null, 4);
}

function editAdminEl(chatId, bot, string) {
  //========================================РЕДАКТИРОВАНИЕ ЭЛЕМЕНТА В КАТАЛОГЕ=======================================
  const fs = require("fs");
  let txtFile = fs.readFileSync("catalog.json", "utf-8");
  let jsonFile = JSON.parse(txtFile);

  len = string.length;
  let bufferString = string.slice(5, len - 1);
  console.log(bufferString);
  let bufferArr = bufferString.split(",");

  let editElIndex = bufferArr[0] - 1;
  let editParam = bufferArr[1];
  let newParam = bufferArr[2];
  
  switch(editParam){
    case "название": {
      jsonFile[editElIndex].name = newParam;
      txtFile = JSON.stringify(jsonFile);
      fs.writeFileSync("catalog.json", txtFile);
      break;
    }

    case "тяги": {
      jsonFile[editElIndex].qty_traction = newParam;
      txtFile = JSON.stringify(jsonFile);
      fs.writeFileSync("catalog.json", txtFile);
      break;
    }

    case "цена": {
      jsonFile[editElIndex].cost = newParam;
      txtFile = JSON.stringify(jsonFile);
      fs.writeFileSync("catalog.json", txtFile);
      break;
    }

    case "вкусы": {
      jsonFile[editElIndex].tasty = newParam;
      txtFile = JSON.stringify(jsonFile);
      fs.writeFileSync("catalog.json", txtFile);
      break;
    }

    case "никотин": {
      jsonFile[editElIndex].qty_nicotine = newParam;
      txtFile = JSON.stringify(jsonFile);
      fs.writeFileSync("catalog.json", txtFile);
      break;
    }

    case "тип": {
      jsonFile[editElIndex].type = newParam;
      txtFile = JSON.stringify(jsonFile);
      fs.writeFileSync("catalog.json", txtFile);
      break;
    }
  }

  bot.sendMessage(chatId, "Элемент успешно изменен!", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Посмотреть каталог",
            callback_data: "admin1",
          },
          {
            text: "Назад",
            callback_data: "backToAdminMenu",
          },
        ],
      ],
    },
  });
}

function addAdminStickEl(chatId, bot, string) {
  //=========================================ДОБАВЛЕНИЕ ДУДКИ В КАТАЛОГ============================================
  const fs = require("fs");
  let txtFile = fs.readFileSync("catalog.json", "utf-8");
  let jsonFile = JSON.parse(txtFile);

  let len = string.length;
  let bufferString = string.slice(11, len - 1);
  let bufferArr = bufferString.split(",");

  let name = bufferArr[0];
  let qty_traction = bufferArr[1];
  let cost = bufferArr[2];
  let tasty = bufferArr[3].slice(1, (bufferArr[3].length) - 1);
  tasty = tasty.split(" ");
  let qty_nicotine = bufferArr[4];
  let type = "дудка";

  let bufferObj = {
    name: name,
    qty_traction: qty_traction,
    cost: cost,
    tasty: tasty,
    qty_nicotine: qty_nicotine,
    type: type,
  };

  jsonFile.push(bufferObj);
  txtFile = JSON.stringify(jsonFile);
  fs.writeFileSync("catalog.json", txtFile);

  bot.sendMessage(chatId, "Элемент успешно добавлен!", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Посмотреть каталог",
            callback_data: "admin1",
          },
          {
            text: "Назад",
            callback_data: "backToAdminMenu",
          },
        ],
      ],
    },
  });
}

function addAdminGooEl(chatId, bot, string) {
//=================================================ДОБАВЛЕНИЕ ЖИЖИ В КАТАЛОГ========================================
  console.log("функция работает");

  const fs = require("fs");
  let txtFile = fs.readFileSync("catalog.json", "utf-8");
  let jsonFile = JSON.parse(txtFile);

  let len = string.length;
  let bufferString = string.slice(10, len - 1);
  let bufferArr = bufferString.split(",");

  let name = bufferArr[0];
  let cost = bufferArr[1];
  let tasty = bufferArr[2].slice(1, (bufferArr[2].length) - 1);
  tasty = tasty.split(" ");
  let qty_nicotine = bufferArr[4];
  let type = "жижа";

  let bufferObj = {
    name: name,
    cost: cost,
    tasty: tasty,
    qty_nicotine: qty_nicotine,
    type: type,
  };

  jsonFile.push(bufferObj);
  txtFile = JSON.stringify(jsonFile);
  fs.writeFileSync("catalog.json", txtFile);

  bot.sendMessage(chatId, "Элемент успешно добавлен!", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Посмотреть каталог",
            callback_data: "admin1",
          },
          {
            text: "Назад",
            callback_data: "backToAdminMenu",
          },
        ],
      ],
    },
  });
}

function delAdminEl(chatId, bot, string) {
  //============================================УДАЛИТЬ ЭЛЕМЕНТ ИЗ КАТАЛОГА
  const fs = require("fs");
  let txtFile = fs.readFileSync("catalog.json", "utf-8");
  let jsonFile = JSON.parse(txtFile);

  len = string.length;
  let bufferString = string.slice(5, len - 1);
  // console.log(bufferString);

  jsonFile.splice(bufferString - 1, 1);
  console.log(jsonFile);

  txtFile = JSON.stringify(jsonFile);
  fs.writeFileSync("catalog.json", txtFile);

  bot.sendMessage(chatId, "Элемент успешно удален!", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Посмотреть каталог",
            callback_data: "admin1",
          },
          {
            text: "Назад",
            callback_data: "backToAdminMenu",
          },
        ],
      ],
    },
  });
}

module.exports = {
  showMenu,
  showCatalog,
  debug,
  showAdminMenu,
  addAdminStickEl,
  addAdminGooEl,
  delAdminEl,
  editAdminEl,
};
