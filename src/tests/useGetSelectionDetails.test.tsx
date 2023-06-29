import { describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { useGetSelectionDetails } from "../";
import "@testing-library/jest-dom";

const HIGLIGHT_RANGE = { START: 0, END: 5 };
const TARGET_CLASS_NAME = "testing-target-class";
const TEXT_CONTENT = "Here is some example selected text.";
const TEXT_SELECTION = TEXT_CONTENT.substring(
  HIGLIGHT_RANGE.START,
  HIGLIGHT_RANGE.END
);

/* Create a component that dumps the hook state to the dom so that we can actually test it */
function SelectionDetailsComponent({ target }: { target: HM.TargetSelector }) {
  const selectionDetails = useGetSelectionDetails(target);
  const { selectedText } = selectionDetails ?? {};

  return <div>selectedText: {selectedText}</div>;
}

/* Perform a text selection event on any non-input dom node */
function performTextSelection(content = TEXT_CONTENT) {
  const element = screen.getByText(content);

  const selectEvent = new Event("selectionchange", { bubbles: true });
  const mouseUpEvent = new Event("mouseup", { bubbles: true });
  const range = document.createRange();
  const textNode = element.firstChild;

  if (textNode) {
    range.setStart(textNode, HIGLIGHT_RANGE.START); // Start position of selected text
    range.setEnd(textNode, HIGLIGHT_RANGE.END); // End position of selected text
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
    fireEvent(element, selectEvent);
    fireEvent(element, mouseUpEvent);
  }
}

/* Perform a dom selection event within an input element */
function performInputSelection(content = TEXT_CONTENT) {
  const inputElement = screen.getByDisplayValue(content) as HTMLInputElement;

  inputElement.setSelectionRange(HIGLIGHT_RANGE.START, HIGLIGHT_RANGE.END);
  inputElement.focus();

  const selectEvent = new Event("selectionchange", { bubbles: true });
  const mouseUpEvent = new Event("mouseup", { bubbles: true });

  fireEvent(inputElement, selectEvent);
  fireEvent(inputElement, mouseUpEvent);
}

/* Test to make sure highlighting in the browser works first */
describe("Text highlighting", () => {
  test("works in the browser with p tags", () => {
    render(<p className={TARGET_CLASS_NAME}>{TEXT_CONTENT}</p>);
    performTextSelection();
    // Assert that the window has a selection
    const selection = window.getSelection();
    expect(selection?.toString()).toBe(TEXT_SELECTION);
  });
  test("works in the browser with nested div tags", () => {
    render(
      <div>
        <p></p>
        <div className={TARGET_CLASS_NAME}>{TEXT_CONTENT}</div>
      </div>
    );
    performTextSelection();
    // Assert that the window has a selection
    const selection = window.getSelection();
    expect(selection?.toString()).toBe(TEXT_SELECTION);
  });
});

/* Now we can test to see if the hook is actually working. */
describe("useGetSelectionDetails hook", () => {
  test("gets selectedText from a p tag with a class", () => {
    render(
      <>
        <SelectionDetailsComponent target={`.${TARGET_CLASS_NAME}`} />
        <p className={TARGET_CLASS_NAME}>{TEXT_CONTENT}</p>
      </>
    );
    performTextSelection();
    const selectedText = screen.getByText(/selectedText/i);

    expect(selectedText.textContent).toBe(`selectedText: ${TEXT_SELECTION}`);
  });

  test("gets selectedText from a input tag with a class", () => {
    render(
      <>
        <SelectionDetailsComponent target={`.${TARGET_CLASS_NAME}`} />
        <p className={TARGET_CLASS_NAME}>
          <textarea defaultValue={TEXT_CONTENT} />
        </p>
      </>
    );
    performInputSelection();

    const selectedText = screen.getByText(/selectedText/i);
    expect(selectedText.textContent).toBe(`selectedText: ${TEXT_SELECTION}`);
  });

  test("gets selectedText from a input tag with a class", () => {
    render(
      <>
        <SelectionDetailsComponent target={`.${TARGET_CLASS_NAME}`} />
        <p className={TARGET_CLASS_NAME}>
          <textarea defaultValue={TEXT_CONTENT} />
        </p>
      </>
    );
    performInputSelection();

    const selectedText = screen.getByText(/selectedText/i);
    expect(selectedText.textContent).toBe(`selectedText: ${TEXT_SELECTION}`);
  });
});
