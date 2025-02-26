# react-highlight-menu

[![NPM Version](https://shields.io/npm/v/react-highlight-menu)](https://www.npmjs.com/package/react-highlight-menu)
![Tests](https://github.com/asyndesis/react-highlight-menu/actions/workflows/tests.js.yml/badge.svg)

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
/* Library comes with some super basic MenuButtons. You can import default styles and use them as a starting point.
The example below shows how to use the `classNames` prop to style the menu, popover, and arrow elements with something like Tailwind.*/
import { HighlightMenu, MenuButton } from "react-highlight-menu";

export default function App() {
  return (
    <div className="tailwind-menu-example">
      <HighlightMenu
        classNames={{
          menu: "flex gap-1 p-1",
          popover: "bg-white shadow-lg rounded-md border border-gray-200",
          arrow: "fill-white",
        }}
        target=".tailwind-menu-example"
        withoutStyles={true}
        menu={({ selectedText = "", setClipboard, setMenuOpen }) => (
          <>
            <MenuButton
              className="p-2 rounded-md hover:bg-gray-100 text-gray-700"
              title="Copy to clipboard"
              icon="clipboard"
              onClick={() =>
                setClipboard(selectedText, () => {
                  alert("Copied to clipboard");
                })
              }
            />
            <MenuButton
              className="p-2 rounded-md hover:bg-gray-100 text-gray-700"
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
              className="p-2 rounded-md hover:bg-gray-100 text-gray-700"
              title="Close menu"
              onClick={() => setMenuOpen(false)}
              icon="x-mark"
            />
          </>
        )}
        allowedPlacements={["top", "bottom"]}
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
- **withoutStyles** - if true, the menu will be only styled with props that help it to function. And we the following classnames can be targeted for styling:
- **classNames** - an object where classnames can be passed to the menu, popover, and arrow elements.
  - `menu` - for the menu element
  - `popover` - for the popover element
  - `arrow` - for the arrow element

## These classnames are also available for styling as well

- `.rhm-popover` - for the popover element
- `.rhm-menu` - for the menu element
- `.rhm-button` - for the button element
- `.rhm-arrow` - for the arrow element
- `.rhm-anchor` - for the anchor element

## Development

```bash
npm install
npm run dev
```
