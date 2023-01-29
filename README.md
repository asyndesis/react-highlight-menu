# react-highlight-menu

![preview](https://asyndesis.github.io/react-highlight-menu/preview.png)

A context menu that appears after highlighting or selecting text.
_Similar to how the menu on Medium works._

[![NPM Version](https://shields.io/npm/v/react-highlight-menu)](https://www.npmjs.com/package/react-highlight-menu)

- [Demo](https://asyndesis.github.io/react-highlight-menu/) - Buttons and icons from [ChakraUI](https://chakra-ui.com/)

## Installation

Run one of the following commands:

- `npm install react-highlight-menu`
- `yarn add react-highlight-menu`

Then use it in your app:

```jsx
import React from "react";
import HighlightMenu from "react-highlight-menu";

export default function App() {
  return (
    <div className="app">
      <HighlightMenu
        target=".app"
        menu={({ selectedHtml, setClipboard, setMenuOpen }) => (
          <React.Fragment>
            <button type="button" onClick={() => setClipboard(selectedHtml)}>
              📋
            </button>
            <button type="button" onClick={() => setMenuOpen(false)}>
              ❌
            </button>
          </React.Fragment>
        )}
        styles={{
          borderColor: "black",
          background: "black",
          boxShadow: "0px 5px 5px 0px rgba(0, 0, 0, 0.15)",
          zIndex: 10,
          borderRadius: "5px",
          padding: "3px",
        }}
      />
    </div>
  );
}
```

## Props

- `target` - can either be a querySelector string, or a react ref.
- `styles` - several css attributes can be applied for styling. (See demo)
- `menu` - ({ selectedHtml, selectedText, setMenuOpen, setClipboard }) => <>Buttons</>
