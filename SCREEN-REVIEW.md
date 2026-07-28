# Екран `/review/[id]` — специфікація з Figma

> Джерело: вузол `402 / Order review` (`2325:20182`).
> Поточна реалізація зроблена без макета й підлягає переписуванню.

---

## Структура

```
root                      bg neutral-50, flex-col
├── Status bar
├── toolbar               "Order review" / "Step 4 of 4"
├── content
│   ├── stack-container   px-8 — картка з 7 рядками
│   ├── bonuses-container pt-8 px-8
│   ├── stack             pt-32 px-24 — три рядки розрахунку
│   └── total-to-pay      pt-8 pb-16 px-24
├── info                  px-8 pb-16 — жовтий блок
└── nav                   flex-1, justify-end
```

---

## Картка підсумку

Контейнер `px-8`. Картка: `bg neutral-0`, `rounded-10`, `px-16 py-8`, `overflow-clip`.

**Рядок** — `py-12`, `gap-10`, `items-center`, `border-bottom 0.5px neutral-100`.
**Останній рядок обводки не має.**

- **іконка** у контейнері: `bg rgba(85,60,84,0.06)`, `p-4`, `rounded-6`, іконка `16×16`
- **текст** — `flex-1`, `gap-4`:
  - підпис ліворуч — Geist **Regular** 16/24, `neutral-500`
  - значення праворуч — Geist **SemiBold** 16/24, `neutral-800`, `text-right`, `flex-1`

### Сім рядків

| Іконка | Підпис | Значення |
|---|---|---|
| `house-line` | Service | Faucet repair |
| `drop` | Faucet type | Water |
| `circle` | Diameter | I don't know |
| `user` | Contact person | Ivan L |
| `map-pin` | Address | Shevchenka st., 47 |
| `clock` | Date & time | Fri 17 Jul, 17:00 - 19:00 |
| `user` | Master | Automatic matching |

Значення тягнуться з query-параметрів `option`, `date`, `time`. Дата форматується як `Fri 17 Jul`.

> У макеті немає рядків Materials і Photos — сім рядків саме такі, як у таблиці.

---

## Блок бонусів

Контейнер `pt-8 px-8`. Картка: `bg neutral-0`, `rounded-10`, `p-16`, `flex gap-12 items-center`.

- `Use bonuses` — Geist SemiBold 16/24, `neutral-800`, `flex-1`
- `487 ₴` — Geist SemiBold 16/24, `neutral-800`
- перемикач

**Перемикач — не пігулка.** Ширина `56`, `rounded-6`, `pl-22 pr-2 py-2`. Повзунок: `bg neutral-0`, висота `20`, `rounded-4`, на всю доступну ширину.
Увімкнений стан:
```css
background-image: linear-gradient(166.84deg, #0364ca 0%, #283694 47.617%);
```

> Кут `166.84°` — не той самий, що в кнопки. Не переплутати.

---

## Розрахунок

Контейнер `pt-32 px-24`, `flex-col gap-4`.

Кожен рядок — `flex gap-8 items-center`: підпис Geist **Regular** 16/24 `neutral-500` `flex-1`, значення Geist **SemiBold** 16/24 `neutral-800` `text-right` `flex-1`.

| Підпис | Значення |
|---|---|
| Estimated cost | `1,500.00 ₴` |
| Travel fee (included) | `100 ₴` |
| Bonuses applied | `-487 ₴` |

> **Свідоме відхилення від макета.** У Figma підпис просто `Travel fee`. Ми додаємо `(included)`, бо інакше читається як помилка розрахунку: 1 500 + 100 − 487 ≠ 1 013.

---

## Total to pay

`pt-8 pb-16 px-24`, `flex gap-8 items-center`.

- `Total to pay` — Alumni Sans SemiBold `36/32`, `neutral-800`, `flex-1`
- сума — Alumni Sans SemiBold `36/32`, `neutral-800`
- символ `₴` окремо — Geist Medium 16/24, `neutral-800`, вирівняний по **верху** суми, `gap-4`

**Формула:** `Total = Estimated cost − (бонуси якщо увімкнено)`
Travel fee не додається. Еталон: `1 500 − 487 = 1 013,00 ₴`. З вимкненим перемикачем — `1 500,00 ₴`.

---

## Попереджувальний блок

Контейнер `px-8 pb-16`.

Блок: `bg yellow-100` `#fff2c7`, `rounded-10`, `px-16 py-14`, `flex gap-10 items-center`.
- іконка `info` `20×20`
- текст Geist Medium 12/12, колір `yellow-700` `#a87808`:
  > Final cost may vary depending on the actual scope of work and materials required.

> Тут **жовтий**, а не синій. На екрані Master інфо-блок синій — це різні за змістом блоки, не уніфікувати.

---

## Нижня навігація

`flex-1`, `justify-end`, градієнт затухання `linear-gradient(to top, #f7f4f0, rgba(247,244,240,0))`.

Кнопка `Confirm order`: висота `56`, `px-18 py-16`, `rounded-8`, брендовий градієнт `175.07deg`, текст Geist Medium 16/24 `blue-50`.
Веде на `/success/[id]` зі збереженням параметрів.

Під кнопкою — Home Indicator.

---

## Критичне: джерело ціни

Зараз `Estimated cost` показує **450 ₴**, а крок 1 для тієї ж послуги — **1 500 ₴**. Це головний баг екрана.

Ціна має братись **із того самого джерела, що й на `/order/[id]`**. Спершу знайти це джерело, потім використати його, а не підбирати число.
