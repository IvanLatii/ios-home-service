# Екран `/master/[id]` — специфікація з Figma

> Джерело: вузол `402 / Master` (`2219:16427`).
> Поточна реалізація не відповідає макету й підлягає переписуванню.

---

## Структура

```
root                      bg neutral-50, flex-col
├── Status bar
├── toolbar               px-24 pb-16 gap-8
├── content               flex-1
│   ├── h1 "Choose an option"
│   ├── option-container  px-8, gap-8
│   │   ├── картка auto     (обрана)
│   │   └── картка manually (не обрана)
│   └── info-container    px-8 py-24
└── nav                   у звичайному потоці, не absolute
```

> **Відмінність від Date:** тут `nav` не абсолютний, а звичайний блок унизу потоку, і шапка не sticky. Не копіювати поведінку з екрана дати.

---

## Toolbar

Той самий патерн, що на кроках 1 і 2. Заголовок — `Master`, підпис — `Step 3 of 4`.

---

## Заголовок

`Choose an option` — Alumni Sans SemiBold `36/32`, `neutral-800`, `px-24 py-16`.

> Не `Master`. Заголовок екрана й заголовок тулбара тут різні.

---

## Картка «auto» — обраний стан

Контейнер: `bg neutral-0`, **border 1px `blue-500`**, `rounded-10`, `p-16`, `flex-col gap-12`, `min-w-330`.

### Верхня частина

`border-bottom 1px neutral-100`, `pb-14`, `flex-col gap-8`.

**Рядок заголовка** — `flex gap-8 items-center`:
- `Match me auto` — Geist **SemiBold** 16/24, `neutral-800`, займає доступну ширину
- тег `Recommended` — `bg blue-500`, `px-8 py-6`, `rounded-4`, текст Geist Medium 12/12, `blue-50`, центровано

**Опис** — Geist **Regular** 12/12, `neutral-500`:
> We find the best available master based on ratings and proximity. Fastest option.

### Нижня частина

`flex gap-12 items-center`:

**Аватари** — три по `40×40`, `rounded-full`, накладені одне на одного через `margin-right: -10px`. Другий і третій мають **білу обводку 3px**. Перший — без обводки.

**Текст із рейтингом** — `flex-1`, `flex-col gap-4`:
- рядок: п'ять зірок `16×16` із `gap-1`, далі `4.9` — Geist **SemiBold** 16/24, `neutral-800`, відступ `gap-8`
- `Top-rated masters nearby` — Geist **Regular** 12/12, `neutral-500`

**Радіо** — `24×24` контейнер, всередині `22×22`, стан «обрано».

---

## Картка «manually» — не обраний стан

Контейнер: `bg neutral-0`, `rounded-10`, `p-16`, `flex gap-12 items-center`. **Без обводки.**

**Текст** `flex-1`, `flex-col gap-4`:
- `Choose master manually` — Geist SemiBold 16/24, `neutral-800`
- `It may take longer and cost more than usual.` — Geist Regular 12/12, `neutral-500`

**Радіо** — `24×24` контейнер, всередині коло `22×22`: `bg neutral-0`, `border 1px neutral-800`, `rounded-full`.

---

## Інформаційний блок

Контейнер `px-8 py-24`.

Блок: `bg blue-100` `#d8e9ff`, `border 0.5px neutral-100`, `rounded-10`, `px-16 py-14`, `flex gap-12 items-center`, `overflow-clip`.

- іконка `info` `20×20`
- текст Geist Medium 12/12, колір **`blue-500`**:
  > All masters are verified, insured, and have passed background checks.

---

## Нижня навігація

Звичайний блок у потоці, `shrink-0`, ширина 100%.

Тло — градієнт затухання:
```css
background-image: linear-gradient(to top, #f7f4f0, rgba(247, 244, 240, 0));
```

**Кнопка Continue:** `pt-8 px-24`, висота `56`, `px-18 py-16`, `rounded-8`, на всю ширину.
```css
background-image: linear-gradient(175.07deg, #0364ca 0%, #283694 47.617%);
```
Текст — Geist Medium 16/24, `blue-50`.

Веде на `/review/[id]` зі збереженням `option`, `date`, `time`.

Під кнопкою — Home Indicator.

---

## Поведінка

- `Match me auto` обрана за замовчуванням
- клік по картці перемикає вибір, обрана отримує обводку `blue-500`, необрана її втрачає
- списку майстрів у прототипі немає — вибір `manually` лише змінює стан радіо
- аватари декоративні

---

## Розбіжності з поточним кодом

- заголовок `Choose an option` відсутній
- тег `Recommended` відсутній
- накладені аватари з білою обводкою відсутні
- рядок із зірками й рейтингом `4.9` відсутній
- інфо-блок має бути на `blue-100` з текстом `blue-500`
- кнопка без брендового градієнта
