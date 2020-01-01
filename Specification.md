# Техническое задание
## [Проект - Smart Device](Readme.md)
### Общие технические требования
1. Стандарты вёрстки: HTML5, CSS3, прогрессивное улучшение.
2. Сетка: определена в макете.
3. Раскладка блоков на странице делается с помощью флексбоксов.
4. Адаптивность сетки: мобильная, планшетная и десктопная версии. **Desktop First.** На всех промежуточных разрешениях используется резиновая вёрстка. 
5. Используемая методология: БЭМ (т.к. макет потенциально может быть натянут на cms, то формы, статьи, картинки стилизуются каскадом)
6. Используемые фреймворки: нет.
7. Используемый препроцессор:  Sass (SCSS).
8. Используемый инструмент автоматизации: Gulp. [https://github.com/tsergeytovarov/gulp-template](https://github.com/tsergeytovarov/gulp-template)
9. Кроссбраузерность: Chrome, Firefox, Safari, Edge, Internet Explorer 11.
10. Графика не предоставляется и её необходимо вырезать самостоятельно.  Правила работы с Figmа тут — [https://htmlacademy.ru/blog/useful/figma](https://htmlacademy.ru/blog/useful/figma)
11. Нестандартные шрифты подключены локально. Скачать можно с Google Fonts — [https://fonts.google.com/](https://fonts.google.com/)
12. JavaScript по желанию (Минимальная реализация, модальные окна, переключения и так далее)

### Пояснения по макету
1. Необходимо выполнить верстку одной страницы с адаптивностью. Десктопная, планшетная и мобильная версии.
2. Брейкпоинты : 
  - мобильная версия — 320px - 767px;
  - планшетная версия — 768px - 1023px;
  - десктопная версия — от 1024px и выше
3. Выделенный элемент можно пропустить.
  ![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F20e2c816-9772-49b2-9173-f4b5a4685ecf%2FHeader.png?table=block&id=4e58b02e-efe7-449f-9eb2-d6192b2ca165&width=2600&cache=v2)

4. При клике по кнопке «Заказать звонок» появляется модальное окно с формой. Реализация через JS (по желанию) или отдельным слоем. 
  ![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ffe355372-d135-4967-aa4e-488e7215f73e%2FPopup.png?table=block&id=6d9e6272-4d07-4694-8742-3e5bd6e23bbb&width=2590&cache=v2)

5. Данные блоки имеют состояние hover, но они никуда не осуществляют переход.
  ![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F279e8939-b0c1-402c-ae68-d38fd578b620%2FHover.png?table=block&id=6d64b1ba-3a4b-4711-8992-4afe6e8c3299&width=2610&cache=v2)

6. Каждый блок - это ссылка целиком.
  ![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fcc8753b7-ec2f-4986-a806-f457edca6e94%2FLink.png?table=block&id=0306761c-576c-4db3-a465-1bf33c2dd64f&width=2610&cache=v2)
