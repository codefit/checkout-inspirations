# Checkout Pages - Standalone Build

Samostatné checkout stránky připravené pro deployment na GitHub Pages nebo jiný statický hosting.

## 📁 Struktura souborů

```
build/
├── index.html          # Úvodní stránka s přehledem
├── checkout.html       # Původní checkout stránka
├── checkout-v2.html    # Checkout V2 stránka
├── css/
│   ├── checkout.css    # Styly pro původní checkout
│   └── checkout-v2.css # Styly pro checkout v2
├── js/
│   ├── checkout.js     # JavaScript pro původní checkout
│   └── checkout-v2.js  # JavaScript pro checkout v2
├── images/             # Obrázky (volitelné)
└── README.md          # Tento soubor
```

## 🚀 Použití

### Lokální zobrazení

1. Stáhněte celou složku `build`
2. Otevřete `index.html` v prohlížeči
3. Nebo použijte lokální server:

    ```bash
    # Python
    python -m http.server 8000

    # Node.js
    npx http-server
    ```

### GitHub Pages

1. Vytvořte nový repository na GitHubu
2. Nahrajte obsah složky `build`
3. V nastavení repository aktivujte GitHub Pages
4. Vyberte branch a root složku
5. Stránka bude dostupná na `https://username.github.io/repository-name/`

## 📦 Závislosti

Všechny závislosti jsou načítány z CDN:

-   **Bootstrap 5.3.2** - CSS framework

    ```html
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
    />
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    ```

-   **Bootstrap Icons 1.11.1** - Ikony

    ```html
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
    />
    ```

-   **jQuery 3.7.1** - JavaScript knihovna
    ```html
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    ```

## 🎨 Funkce

### Checkout (Original)

-   ✅ Třísloupcový layout
-   ✅ Fixní levá a pravá část
-   ✅ Slide widgety zleva
-   ✅ Scrollovatelný střední obsah
-   ✅ Gradient overlay
-   ✅ Kontaktní informace
-   ✅ Terms & conditions checkbox

### Checkout V2

-   ✅ Dvousloupcový layout (50/50 bílá/šedá)
-   ✅ Accordion pro platební údaje
-   ✅ Slide widgety zleva (překrývají levou část)
-   ✅ Sticky pravá kolona
-   ✅ Firemní údaje checkbox
-   ✅ Bootstrap Icons
-   ✅ Responzivní design

## 🔧 Přizpůsobení

### Barvy

Primární barva je definována v CSS pomocí CSS custom properties:

```css
:root {
    --primary-color: #59a618;
    --secondary-color: #ff4500;
    --text-color: #333;
    --text-light: #666;
    --border-color: #e9ecef;
    --background-light: #f8f9fa;
    --shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    --border-radius: 8px;
}
```

### Obrázky

Obrázky jsou aktuálně načítány z externích URL. Pro lokální použití:

1. Stáhněte obrázky do složky `images/`
2. Upravte cesty v HTML souborech:

    ```html
    <!-- Před -->
    <img src="https://external-url.com/image.jpg" />

    <!-- Po -->
    <img src="images/image.jpg" />
    ```

## 📱 Responzivní breakpointy

-   **Desktop**: > 992px
-   **Tablet**: 768px - 992px
-   **Mobile**: < 768px

## 🐛 Známé problémy

-   Obrázky jsou načítány z externích URL (mohou být nedostupné)
-   Demo data jsou statická
-   Není propojeno s backend API

## 📄 License

Tento projekt je určen pouze pro demonstrační účely.

## 👤 Autor

Vytvořeno pro Laravel Nova projekt.

## 📞 Podpora

Pro dotazy nebo problémy vytvořte issue v repository.

---

**Verze**: 1.0.0  
**Poslední aktualizace**: Říjen 2025
