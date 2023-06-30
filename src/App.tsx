import React, { useRef, useState, CSSProperties } from "react";
import { HighlightMenu } from ".";
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
  Box,
} from "@chakra-ui/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import { MenuArgs } from "./types";

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
  ({ selectedText = "", setMenuOpen, setClipboard }: MenuArgs) => {
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

const GithubCorner = () => {
  return (
    <a
      href="https://github.com/asyndesis/react-highlight-menu"
      className="github-corner"
      aria-label="View source on GitHub"
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 250 250"
        style={{
          fill: "#151513",
          color: "#fff",
          position: "fixed",
          top: 0,
          border: 0,
          right: 0,
          zIndex: 100,
        }}
        aria-hidden="true"
      >
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
        <path
          d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
          fill="currentColor"
          style={{ transformOrigin: "130px 106px" }}
          className="octo-arm"
        ></path>
        <path
          d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
          fill="currentColor"
          className="octo-body"
        ></path>
      </svg>
    </a>
  );
};

function App() {
  const menuRef = useRef<HTMLDivElement>(null);
  const [targetClass, setTargetClass] = useState(true);
  const [styleColor, setStyleColor] = useState("black");
  const fullMenu = useGetMenu(styleColor);
  return (
    <ChakraProvider>
      <GithubCorner />
      <HighlightMenu
        target={targetClass ? ".highlight-menu" : menuRef}
        styles={MENU_STYLES[styleColor]}
        menu={fullMenu}
        allowedPlacements={["top", "bottom"]}
      />
      <Box py={4}>
        <Card
          gap={2}
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
            <Text>
              The target property supports both css-selectors and refs.
            </Text>
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
              function arguments. A <strong>setClipboard</strong> utility
              function is also provided.
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
      </Box>
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
