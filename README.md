# react-highlight-menu

[![NPM Version](https://shields.io/npm/v/react-highlight-menu)](https://www.npmjs.com/package/react-highlight-menu)

A context menu that appears after highlighting or selecting text.
_Similar to how the menu on Medium works._

![preview](https://asyndesis.github.io/react-highlight-menu/preview.png)

- [Demo](https://asyndesis.github.io/react-highlight-menu/) - Buttons and icons from [ChakraUI](https://chakra-ui.com/)

## Installation

Run one of the following commands:

- `npm install react-highlight-menu`
- `yarn add react-highlight-menu`

Then use it in your app:

```jsx
import React from "react";
/* Library comes with some super basic MenuButtons: */
import { HighlightMenu, MenuButton } from "react-highlight-menu";

export default function App() {
  return (
    <div className="app">
      <HighlightMenu
        target=".app"
        allowedPlacements={["top", "bottom"]}
        menu={({ selectedText = "", setClipboard, setMenuOpen }) => (
          <>
            <MenuButton
              title="Copy to clipboard"
              icon="clipboard"
              onClick={() =>
                setClipboard(selectedText, () => {
                  alert("Copied to clipboard");
                })
              }
            />

            <MenuButton
              title="Search Google"
              onClick={() => {
                window.open(
                  `https://www.google.com/search?q=${encodeURIComponent(
                    selectedText
                  )}`
                );
              }}
              icon="magnifying-glass"
            />
            <MenuButton
              title="Close menu"
              onClick={() => setMenuOpen(false)}
              icon="x-mark"
            />
          </>
        )}
      />
    </div>
  );
}
```

## Props

- **target** - can either be a querySelector string, or a react ref.
- **styles** - several css attributes can be applied for styling. (See demo)
- **menu** - `({ selectedHtml, selectedText, setMenuOpen, setClipboard }) => <>Buttons</>`
- **allowedPlacements** - array of allowed placements `-'auto' | 'auto-start' | 'auto-end' | 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'right' | 'right-start' | 'right-end' | 'left' | 'left-start' | 'left-end'`
- **offset** - distance in pixels from highlighted words. `10`
- **zIndex** - zIndex of the popover `999999999`
