import React, { useRef, useState, CSSProperties } from "react";
import { HighlightMenu } from "./lib";
import { CopyIcon, SearchIcon, CloseIcon } from "@chakra-ui/icons";
import {
  ChakraProvider,
  IconButton,
  Flex,
  Heading,
  Text,
  Card,
  Tooltip,
  CardBody,
  FormControl,
  FormLabel,
  Switch,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const MENU_STYLES: Record<string, CSSProperties> = {
  black: {
    borderColor: "black",
    backgroundColor: "black",
    boxShadow: "0px 5px 5px 0px rgba(0, 0, 0, 0.15)",
    zIndex: 10,
    borderRadius: "5px",
    padding: "3px",
  },
  white: {
    borderColor: "white",
    backgroundColor: "white",
    boxShadow: "0px 5px 5px 0px rgba(0, 0, 0, 0.15)",
    zIndex: 10,
    borderRadius: "5px",
    padding: "3px",
  },
  pink: {
    borderColor: "#D53F8C",
    backgroundColor: "#D53F8C",
    boxShadow: "0px 5px 5px 0px rgba(0, 0, 0, 0.15)",
    zIndex: 10,
    borderRadius: "5px",
    padding: "3px",
  },
};

const useGetMenu =
  (styleColor: any) =>
  ({ selectedText = "", setMenuOpen, setClipboard }: HM.MenuArgs) => {
    const color = styleColor === "white" ? null : styleColor;
    return (
      <Flex gap="1">
        <Tooltip label="Copy text" hasArrow>
          <IconButton
            aria-label="Copy to clipboard"
            colorScheme={color}
            onClick={async () => {
              setClipboard(selectedText, () => {
                alert("Copied to clipboard");
              });
            }}
            icon={<CopyIcon />}
          />
        </Tooltip>
        <Tooltip label="Search google" hasArrow>
          <IconButton
            aria-label="Search google"
            colorScheme={color}
            onClick={() => {
              window.open(
                `https://www.google.com/search?q=${encodeURIComponent(
                  selectedText
                )}`
              );
            }}
            icon={<SearchIcon />}
          />
        </Tooltip>
        <Tooltip label="Close the menu" hasArrow>
          <IconButton
            aria-label="Close menu"
            colorScheme={color}
            onClick={() => {
              setMenuOpen(false);
            }}
            icon={<CloseIcon />}
          />
        </Tooltip>
      </Flex>
    );
  };

function App() {
  const menuRef = useRef<HTMLDivElement>(null);
  const [targetClass, setTargetClass] = useState(true);
  const [styleColor, setStyleColor] = useState("black");
  const fullMenu = useGetMenu(styleColor);
  return (
    <ChakraProvider>
      <HighlightMenu
        target={targetClass ? ".highlight-menu" : menuRef}
        styles={MENU_STYLES[styleColor]}
        menu={fullMenu}
        allowedPlacements={["top", "bottom"]}
      />
      <Card
        gap={2}
        my={4}
        mx={"auto"}
        maxWidth="720"
        ref={menuRef}
        className="highlight-menu"
      >
        <CardBody display="flex" gap="4" flexDirection="column">
          <Heading size="lg">React highlight menu demos</Heading>
          <Text>
            Highlight text anywhere on the page to reveal the context menu.
          </Text>
          <Heading size="md">The target property</Heading>
          <Text>The target property supports both css-selectors and refs.</Text>
          <FormControl display="flex" alignItems="center" gap={3}>
            <Switch
              id="switch-target-1"
              size="lg"
              isChecked={targetClass}
              onChange={(e) => setTargetClass(e.target.checked)}
            />
            <FormLabel htmlFor="switch-target-1" mb="0" fontWeight="bold">
              target=".highlight-menu"
            </FormLabel>
            <Switch
              id="switch-target-2"
              size="lg"
              isChecked={!targetClass}
              onChange={(e) => setTargetClass(!e.target.checked)}
            />
            <FormLabel htmlFor="switch-target-2" mb="0" fontWeight="bold">
              {`target={ref}`}
            </FormLabel>
          </FormControl>
          <Code name="TargetExample" targetClass={targetClass} />
          <Heading size="md">The menu property</Heading>
          <Text>
            The menu property provides the state of the component through
            function arguments. A <strong>setClipboard</strong> utility function
            is also provided.
          </Text>
          <Code name="MenuExample" showMenu={true} />
          <Heading size="md">The styles property</Heading>
          <Text>
            Change the look of the popover with several style properties. Note
            that buttons are not included. We are using ChakraUI behind the
            scenes here.
          </Text>
          <FormControl display="flex" alignItems="center" gap={3}>
            {Object.entries(MENU_STYLES).map(([key]) => {
              return (
                <React.Fragment key={key}>
                  <Switch
                    id={`switch-styles-${key}`}
                    size="lg"
                    isChecked={styleColor === key}
                    onChange={() => setStyleColor(key)}
                  />
                  <FormLabel
                    htmlFor={`switch-styles-${key}`}
                    fontWeight="bold"
                    mb={0}
                  >
                    {key}
                  </FormLabel>
                </React.Fragment>
              );
            })}
          </FormControl>
          <Code
            name="StylesExample"
            showStyles={true}
            styleColor={styleColor}
          />
          <Heading size="md">Input components</Heading>
          <Text>
            The popover should also work inside of Input and TextArea
            components, but has limited support for the X,Y due to browser
            constraints.
          </Text>
          <Input defaultValue="Highlight my value" />
          <Textarea defaultValue="Highlight my text" />
        </CardBody>
      </Card>
    </ChakraProvider>
  );
}

type CodeArgs = {
  name?: string;
  targetClass?: boolean;
  showMenu?: boolean;
  showStyles?: boolean;
  styleColor?: string;
};

const Code = ({
  name,
  targetClass,
  showMenu = false,
  showStyles = false,
  styleColor = "black",
}: CodeArgs) => {
  return (
    <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
      {`const ${name} = () => {
  ${!targetClass ? "const menuRef = useRef();" : "/* Using a css selector */"}
  return (
    <HighlightMenu
      ${
        showStyles
          ? `styles={${JSON.stringify(MENU_STYLES[styleColor], null, 8).replace(
              "}",
              "      }"
            )}}`
          : "styles={{/* ...styles */}}"
      }
      target=${targetClass ? '".highlight-menu"' : "{menuRef}"}
      ${
        showMenu
          ? `menu={({
        selectedText,
        setMenuOpen,
        setClipboard, 
      }) => 
        <Flex>
          <CopyButton
            onClick={() => setClipboard(selectedText, () => {
              alert("Copied to clipboard");
            })}
          />
          <SearchButton
            onClick={() => 
              window.open("https://www.google.com/search?q="+selectedText")}
          />
          <CloseButton
            onClick={() => setMenuOpen(false)}
          />
        </Flex>`
          : "menu={()=><>Buttons go here</>}"
      }
    />
    <div ref={menuRef}>
      Selecting this text will show the menu!
    </div>
  );
};`}
    </SyntaxHighlighter>
  );
};

export default App;
