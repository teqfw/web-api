# Development Notes

Этот плагин добавляет к плагину `@teqfw/web` обработчик POST-запросов с нагрузкой в виде JSON-файлов для передачи данных
в запросе и ответе: `TeqFw_Web_Api_Back_Web_Handler_Service`.

Обработчик использует отдельные классы для обработки запросов - сервисы. Сервисы, используемые каким-либо плагином
описываются в дескрипторе этого плагина (`./teqfw.json`):

```json
{
  "@teqfw/web-api": {
    "services": [
      "Svelters_Back_Web_Api_SignUp_Challenge"
    ]
  }
}
```

Каждый сервис должен имплементировать интерфейс `TeqFw_Web_Api_Back_Api_Service`.

Каждому сервису соответствует endpoint, который имплементирует интерфейс `TeqFw_Web_Api_Shared_Api_Endpoint`.

Endpoint'ы используются как обработчиком запросов на бэке (`TeqFw_Web_Api_Back_Web_Handler_Service`), так и коннектором
на фронте (`TeqFw_Web_Api_Front_Mod_Connect`). Имя класса endpoint'а является маршрутом для соответствующего сервиса.
Endpoint создаёт DTO для запроса и ответа.