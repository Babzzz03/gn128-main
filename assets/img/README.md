# Landing page assets

Drop the real assets here and reference them from `index.html` / `style.css`.
The page ships with CSS-generated placeholders so nothing looks broken before
the real files arrive.

| File                | Where it's used                          | Suggested size        |
| ------------------- | ---------------------------------------- | --------------------- |
| `favicon.png`       | `<link rel="icon">`                      | 64×64                 |
| `og-image.jpg`      | Open Graph social preview                | 1200×630              |
| hero visual         | `.showcase__media` (hero band)           | ~1600×600, dark bg    |

## Swapping the hero visual for a real image
In `assets/css/style.css`, replace the `.showcase__media` background rules with:

```css
.showcase__media {
    background: url("../img/your-hero.jpg") center / cover no-repeat;
}
```
and delete the `.showcase__placeholder` span from `index.html`.
