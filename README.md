# CarAtlas

CarAtlas — учебное full-stack приложение для учета автомобилей. Backend (Node.js + Apollo Server + Sequelize + SQLite) предоставляет GraphQL API для создания, обновления, удаления и просмотра записей об авто. Frontend (React + Apollo Client + DevExtreme) отображает список машин, позволяет фильтровать данные и работать с формой добавления/редактирования.

## Основные возможности

- CRUD‑операции над сущностью `Car` через GraphQL
- Валидация и хранение данных в SQLite через Sequelize
- UI-таблица и формы управления на React с DevExtreme-компонентами

## Структура

- `server/` — GraphQL-сервер, база данных, модели, резолверы
- `client/` — SPA на React, взаимодействует с сервером через Apollo Client

## Как использовать

> Требуется Node.js ≥ 18 и npm.

### Ручной способ

1. Установите зависимости:
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```
2. Запустите сервер (из каталога `server`):
   ```bash
   npm run dev
   ```
   Сервер поднимется на `http://localhost:4000/graphql`.
3. В другом терминале запустите клиент (из `client`):
   ```bash
   npm start
   ```
   Приложение откроется на `http://localhost:3000`.

### Через VSCode 

1. Установите зависимости:
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```

2. Запустите задачу:
   - Откройте палитру команд (`Ctrl+Shift+P`) → `Tasks: Run Task`.
   - Выберите задачу `Start Server and Client` — редактор создаст два CMD‑терминала (`Server` и `Client`) и запустит скрипты параллельно.

## Production-сборка
1. Соберите сервер: `cd server && npm run build`.
2. Соберите клиент: `cd client && npm run build` (результат в `client/build`).

