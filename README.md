@hornOfUnicorn_bot - telegram bot.

The bot uses Typescript for the programming language and Node.js for the backend platform. Libraries:
* Telegraf - Telegram framework [link](https://www.npmjs.com/package/telegraf);
* MongoDB NodeJS Driver [link](https://www.npmjs.com/package/mongodb);
* Node Schedule - agile scheduler [link](https://www.npmjs.com/package/node-schedule).

The work with MongoDB is depend on interfaces, that are described in ./dist/db/dbInterfaces. Thus any request to external API is satisfied to the interfaces. If external API is not avaliable, then the last data will be taken from DB. There are 3 collections in DB:
* MessageItems - the last data of movies and phrases;
* WeatherData - the last data of the weather, identified by user id;
* Users - configs of users.

The cofiguration set ups used by scenes, which are located in ./dist/scenes/. The information, that user enter in each scene, is collected in the state. Then the state tranform in cofiguration and is send to db and to scheduler. After that according to the cofig of the user the notification is created by scheduling the call of method of the User class.

The command of the bot:
* /changeConfig;
* /getConfig;
* /deleteNotification;
* /pushNotification;
* /checkNotification - check is the notification set.

Packages:
* classes - dto, pay attention to the absract class ExternalAPI;
* db - entities;
* enums;
* interfaces;
* scenes;
* schedule.
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Бот написан на TypeScript и работает на Node.js. Используемые инструменты:
* Telegraf - Telegram фреймворк [link](https://www.npmjs.com/package/telegraf);
* MongoDB NodeJS Driver [link](https://www.npmjs.com/package/mongodb);
* Node Schedule - гибкий планировщик заданий [link](https://www.npmjs.com/package/node-schedule).

При использовании MongoDB работа с данными в боте осуществляется с помощью интерфейсов, которые находятся в ./dist/db/dbInterfaces.
Таким образм, при любом запросе к внешним API или базе данных данные всегда соответсвуют интерфейсам. Если API стороннего сервиса не доступно, тогда берется последняя запись из бд. Всего в базе данных 3 коллекции:
* MessageItems - содержит последние данные о запросах к API сервисов погоды, фильмов, фраз;
* WeatherData - содержит последние данные о погоде, идентификатором является id пользователя;
* Users - содержит конфигурации пользователей.

Конфигурация пользователей собирается при помощи сцен, которые находятся в ./dist/scenes/. Последовательный ввод данных происходит при помощи пробрасывания состояния текущей сцены (имплементит интерфейс конфигурации пользователя) в следующую, пока пользователь не дойдет до финальной сцены, откуда данные уходят в бд и в планировщик задач. Далее соответсвенно конфигурации пользователя планиурется вызов метода объета класса User, отвечающего за формирования оповещения. При вызове данного метода объекта запросы отправляются к API сторонних сервисов, результаты кешируются и выводится уведомление с данными. Сцены являются изолированными частями программы, где можно релизовать локальную логику (команды, обработчики и т.д.) недоступную извне.

В боте присутствую команды:
* /changeConfig - изменение настроек профиля, пользовтаель направляется в первую сцену;
* /getConfig - просмотр настройки профиля, возвращается отформатированный результат запроса к коллекции Users;
* /deleteNotification - удаление уведомлений, удаляется задача из планироващика при использовании id пользователя;
* /pushNotification - рассылка уведомлений, добавляется задача в планировщик задач в соответствие с конфигом пользователя из бд;
* /checkNotification - проверить рассылку уведомлений, проверяется нахождение задачи в планировщике задач.

Описание областей:
* classes - содержит классы для работы с данными, отдельно нужно выделить абстрактный класс ExternalAPI, от которого наследуются все классы сторонных API;
* db - содержит API для работы с бд Mongo, возвращающий экземпляр класса, методы которого используются для работы с бд, также содержит интерфейсы для работы с данными в папке dbInterfaces;
* enums;
* interfaces - содержит интерфейсы валют и контекста бота;
* scenes - содержит сцены, для последовательного сбора данных;
* schedule - предоставляет экземпляр класса UsersSchedule, методы которого требуются для работы с планировщиком задач.
