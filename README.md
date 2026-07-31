![Vanilla JS Calculator](assets/banner_title.svg)

A calculator built with **HTML, CSS, and vanilla JavaScript** — no `eval()`, no libraries. Every operation is handled through explicit state tracking.

🔗 **Live Demo:** [sushildive.github.io/mycalculator](#) <!-- replace with your GitHub Pages link -->

<!--![Preview](assets/preview.png) -->

---

![Features](assets/banner_features.svg)
- Full operand/operator/AC/delete/percent handling, built as separate modular functions
- Chained operations (e.g. `5 + 3 * 2 =`) via a running-total state model
- Backspace (`del`) that correctly unwinds both the display string and the underlying number
- Percentage logic handled contextually (differs for `+ - *` vs `/` vs no active operator)
- Button press animation (clip-path bevel "physically" depresses on click)
- Responsive from small to large screens using `clamp()`

![Tech Stack](assets/banner_tech.svg)
- `HTML5` · `CSS3` (`clip-path` polygon, `clamp()`) · `Vanilla JavaScript` (state machine, event delegation)

![What I Learned](assets/banner_learned.svg)
- **State-driven logic over `eval()`** — every button press is resolved through 4 tracked variables (`runningTotal`, `currentNumber`, `currentExpression`, `activeOperator`) instead of evaluating a raw string, so I control precision, chaining, and edge cases myself
- **Modular function design** — one function per concern (`handleOperand`, `handleOperator`, `handlePercentage`, `handleDeleteButton`, `resetAll`) instead of one giant click handler
- **`clip-path: polygon()`** — used it to cut chiseled corners on both the calculator body and each key, plus an inset bevel layer for a 3D pressed-key look
- **Event delegation** — one listener on `.btn-panel` handles all 20 buttons
- **Debugging by tracing** — used `console.log` at each state transition to verify `runningTotal`/`currentNumber`/`activeOperator` before writing the display logic, instead of guessing

![Run Locally](assets/banner_run.svg)
```bash
git clone https://github.com/sushildive012/mycalculator.git
cd repo-name
# open index.html in your browser
```

![Structure](assets/banner_structure.svg)
```
├── index.html
├── style.css
├── script.js
└── assets/
    └── preview.png
```
