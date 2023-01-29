# react-highlight-menu

![preview](https://asyndesis.github.io/react-highlight-menu/preview.png)

A context menu that appears after highlighting or selecting text.
_Similar to how the menu on Medium works._

- [Demo](https://asyndesis.github.io/react-highlight-menu/) - Icons from [ChakraUI](https://chakra-ui.com/)

## Installation

Run one of the following commands:

- `npm install react-highlight-menu`
- `yarn add react-highlight-menu`

## Documentation

Then use it in your app:

```jsx
import React, { useState } from "react";
import HighlightMenu from "react-select";

export default function App() {
  return (
    <div className="app">
      <HighlightMenu
        target=".app"
        menu={({ selectedHtml, setClipboard }) => (
          <React.Fragment>
            <button onClick={() => setClipboard(selectedHtml)} />
          </React.Fragment>
        )}
      />
    </div>
  );
}
```

## Props

Common props you may want to specify include:

- `target` - can either be a querySelector string, or a react ref.
- `styles` - several css attributes can be applied for styling. (See demo)
- `menu` - ({ selectedHtml, selectedText, setMenuOpen, setClipboard }) => <>Buttons</>
