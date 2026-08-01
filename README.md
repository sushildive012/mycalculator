![Vanilla JS Calculator](assets/banner_title.svg)

- A calculator built with **HTML, CSS, and vanilla JavaScript**
- no `eval()` used
- Every button routes through a **modular** state engine, not one giant handler.

🔗 **Live Demo:** [Click Here to View](https://sushildive012.github.io/mycalculator/)

<!--![Preview](assets/preview.png) -->

---

![Features](assets/banner_features.svg)
- ⌨️ **Full keyboard support** — type numbers/operators directly (`Enter` = `=`, `Esc` = `AC`, `Backspace` = `del`)
- 🧩 **Modular engine** — one function per concern: `handleOperand`, `handleOperator`, `handlePercentage`, `handleDeleteButton`
- 🔢 Chained operations (`5 + 3 x` → `8 x`) via a running-total state model
- 🎯 Edge cases handled by hand: blocks double decimals, kills leading zeroes, contextual `%` (differs across `+ - * /`)
- 🖱️ Chiseled 3D key press effect via `clip-path`, fully responsive with `clamp()`

![Tech Stack](assets/banner_tech.svg)
- `HTML5`
- `CSS3` (`clip-path` polygon, `clamp()`)
- `Vanilla JS` (state machine, event delegation, `keydown` mapping)

![What I Learned](assets/banner_learned.svg)
- **State over `eval()`** — 4 tracked variables (`runningTotal`, `currentNumber`, `currentExpression`, `activeOperator`) drive every calculation myself, no string evaluation
- **Edge-case-first thinking** — leading-zero strip, blocked repeat decimals, and delete syncing both the display string *and* the number in memory took more logic than the "happy path"
- **Keyboard as a second input source** — mapped physical keys to the same `handleInput()` engine the buttons use, so one core function drives two input methods
- **`clip-path: polygon()`** for chiseled corners + inset bevel = 3D pressed-key feel
- **Traced state with `console.log`** at each transition instead of guessing why a value was wrong

![Run Locally](assets/banner_run.svg)
```bash
git clone https://github.com/sushildive012/mycalculator.git
cd mycalculator
# open index.html in your browser
```

![Structure](assets/banner_structure.svg)
```
├── index.html
├── style.css
├── script.js
└── assets/
    └── icon.png
```
