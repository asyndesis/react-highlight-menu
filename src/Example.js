import { HighlightMenu } from "./lib";

const Example = () => {
  return (
    <>
      <HighlightMenu
        target={".yarf"}
        menu={({ clientRect, selectedHtml, selectedText }) => (
          <div style={{ display: "flex", gap: 4 }}>
            <button onClick={() => console.log(selectedHtml)}>📋</button>
            <button onClick={() => console.log(clientRect)}>ℹ️</button>
          </div>
        )}
      />
      <div
        className="yarf"
        style={{
          border: "5px dotted #000",
          overflow: "scroll",
          width: "100%",
          height: "300px",
        }}
      >
        <div
          style={{ width: "200%", height: "200%", backgroundColor: "green" }}
        >
          <h1>SELECTABLE</h1>
          <Lorem />
        </div>
      </div>
      <div className="yarf">
        <h1>SELECTABLE</h1>
        <Lorem />
      </div>
      <div>
        <h1>NON-SELECTABLE</h1>
        <Lorem />
      </div>
    </>
  );
};

const Lorem = () => (
  <>
    <p>
      assdfasdfasdfasdf asf asfasdf asdf asfasdf fas fassdfasdfasdfasdf asf
      asfasdf asdf asfasdf fas fassdfasdfasdfasdf asf asfasdf asdf asfasdf fas
      fassdfasdfasdfasdf asf asfasdf asdf asfasdf fas fassdfasdfasdfasdf asf
      asfasdf asdf asfasdf fas fassdfasdfasdfasdf asf asfasdf asdf asfasdf fas
      fassdfasdfasdfasdf asf asfasdf asdf asfasdf fas fassdfasdfasdfasdf asf
      asfasdf asdf asfasdf fas fassdfasdfasdfasdf asf asfasdf asdf asfasdf fas f
    </p>
    <p>
      assdfasdfasdfasdf asf asfasdf asdf asfasdf fas fassdfasdfasdfasdf asf
      asfasdf asdf asfasdf fas fassdfasdfasdfasdf asf asfasdf asdf asfasdf fas
      fassdfasdfasdfasdf asf asfasdf asdf asfasdf fas fassdfasdfasdfasdf asf
      asfasdf asdf asfasdf fas fassdfasdfasdfasdf asf asfasdf asdf asfasdf fas
      fassdfasdfasdfasdf asf asfasdf asdf asfasdf fas fassdfasdfasdfasdf asf
      asfasdf asdf asfasdf fas fassdfasdfasdfasdf asf asfasdf asdf asfasdf fas f
    </p>
    <p>
      assdfasdfasdfasdf asf asfasdf asdf asfasdf fas fassdfasdfasdfasdf asf
      asfasdf asdf asfasdf fas fassdfasdfasdfasdf asf asfasdf asdf asfasdf fas
      fassdfasdfasdfasdf asf asfasdf asdf asfasdf fas fassdfasdfasdfasdf asf
      asfasdf asdf asfasdf fas fassdfasdfasdfasdf asf asfasdf asdf asfasdf fas
      fassdfasdfasdfasdf asf asfasdf asdf asfasdf fas fassdfasdfasdfasdf asf
      asfasdf asdf asfasdf fas fassdfasdfasdfasdf asf asfasdf asdf asfasdf fas f
    </p>
  </>
);

export default Example;
