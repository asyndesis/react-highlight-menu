import React, { useRef, useState } from "react";
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
  Tabs,
  TabList,
  TabPanel,
  Tab,
  TabPanels,
  FormControl,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const fullMenu = ({
  selectedHtml,
  selectedText,
  setMenuOpen,
  setClipboard,
}) => (
  <Flex gap="1">
    <Tooltip label="Copy text" hasArrow>
      <IconButton
        colorScheme="black"
        aria-label="Copy"
        onClick={() => {
          setClipboard(selectedHtml, () => {
            alert("Copied to clipboard");
          });
        }}
        icon={<CopyIcon />}
      />
    </Tooltip>
    <Tooltip label="Search google" hasArrow>
      <IconButton
        colorScheme="black"
        aria-label="Search"
        onClick={() => {
          window.open(`https://www.google.com/search?q=${selectedText}`);
        }}
        icon={<SearchIcon />}
      />
    </Tooltip>
    <Tooltip label="Close the menu" hasArrow>
      <IconButton
        colorScheme="black"
        aria-label="Search"
        onClick={() => {
          setMenuOpen(false);
        }}
        icon={<CloseIcon />}
      />
    </Tooltip>
  </Flex>
);

const htmlMenu = ({ selectedHtml, setClipboard }) => (
  <Flex gap="1">
    <Tooltip label="Copy text" hasArrow>
      <IconButton
        colorScheme="black"
        aria-label="Copy"
        onClick={() => {
          setClipboard(selectedHtml, () => {
            alert("Copied to clipboard");
          });
        }}
        icon={<CopyIcon />}
      />
    </Tooltip>
  </Flex>
);

const googleMenu = ({ selectedText, setClipboard }) => (
  <Flex gap="1">
    <Tooltip label="Search google" hasArrow>
      <IconButton
        colorScheme="black"
        aria-label="Search"
        onClick={() => {
          window.open(`https://www.google.com/search?q=${selectedText}`);
        }}
        icon={<SearchIcon />}
      />
    </Tooltip>
  </Flex>
);

function ExamplePage() {
  const menuRef = useRef();
  const [targetClass, setTargetClass] = useState(true);
  return (
    <ChakraProvider>
      <HighlightMenu
        target={targetClass ? ".highlight-menu" : menuRef}
        menu={fullMenu}
      />
      <HighlightMenu target={".highlight-menu-html"} menu={htmlMenu} />
      <HighlightMenu target={".highlight-menu-google"} menu={googleMenu} />
      <Card gap={2} my={4} mx={"auto"} maxWidth="720">
        <Tabs>
          <TabList>
            <Tab>Demo</Tab>
            <Tab>Code</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <CardBody display="flex" gap="4" flexDirection="column">
                <Heading size="lg">The menu property</Heading>
                <Text>
                  The menu property takes in a function whose parameters are an
                  object containing the inner state of react-highlight-menu.
                </Text>
                <Flex gap={4} flexDirection={["column", "column", "row"]}>
                  <Card className="highlight-menu-html">
                    <CardBody>
                      <Text fontWeight="bold" mb={3}>
                        Copy the selection
                      </Text>
                      <Flex flexDirection="column" gap="3">
                        <Text>
                          Lady Jingly answered sadly, And her tears began to
                          flow-- "Your proposal comes too late, Mr.
                          Yonghy-Bonghy-Bo! I would be your wife most gladly!"
                          (Here she twirled her fingers madly) "But in England
                          I've a mate! Yes! you've asked me far too late, For in
                          England I've a mate, Mr. Yonghy-Bonghy-Bo! Mr.
                          Yongby-Bonghy-Bo!
                        </Text>
                        <Text>
                          "Mr. Jones (his name is Handel-- Handel Jones,
                          Esquire, & Co.) Dorking fowls delights to send Mr.
                          Yonghy-Bonghy-Bo! Keep, oh, keep your chairs and
                          candle, And your jug without a handle-- I can merely
                          be your friend! Should my Jones more Dorkings send, I
                          will give you three, my friend! Mr. Yonghy-Bonghy-Bo!
                          Mr. Yonghy-Bonghy-Bo!
                        </Text>
                      </Flex>
                    </CardBody>
                  </Card>
                  <Card className="highlight-menu-google">
                    <CardBody>
                      <Text fontWeight="bold" mb={3}>
                        Menu button that searches Google
                      </Text>
                      <Flex flexDirection="column" gap="3">
                        <Text>
                          "Though you've such a tiny body, And your head so
                          large doth grow-- Though your hat may blow away Mr.
                          Yonghy-Bonghy-Bo! Though you're such a Hoddy Doddy,
                          Yet I wish that I could modi- fy the words I needs
                          must say! will you please to go away That is all I
                          have to say, Mr. Yonghy-Bonghy-Bo! Mr.
                          Yonghy-Bonghy-Bo!"
                        </Text>
                        <Text>
                          Down the slippery slopes of Myrtle, Where the early
                          pumpkins blow, To the calm and silent sea Fled the
                          Yonghy-Bonghy-Bo. There, beyond the Bay of Gurtle, Lay
                          a large and lively Turtle. "You're the Cove," he said,
                          "for me; On your back beyond the sea, Turtle, you
                          shall carry me!" Said the Yonghy-Bonghy-Bo, Said the
                          Yonghy-Bonghy-Bo.
                        </Text>
                      </Flex>
                    </CardBody>
                  </Card>
                </Flex>
              </CardBody>
              <CardBody display="flex" gap="4" flexDirection="column">
                <Heading size="lg">The target property</Heading>
                <Text>
                  The target property supports both css-selectors and refs. The
                  first box below has a className set to "highlight-menu", while
                  the other box is using a react ref. Highlight some text to
                  show the menu.
                </Text>
                <Flex gap={4} flexDirection={["column", "column", "row"]}>
                  <Card className="highlight-menu">
                    <CardBody>
                      <FormControl
                        display="flex"
                        alignItems="center"
                        mb="3"
                        gap={3}
                      >
                        <Switch
                          id="switch-a"
                          size="lg"
                          isChecked={targetClass}
                          onChange={(e) => setTargetClass(e.target.checked)}
                        />
                        <FormLabel htmlFor="switch-a" mb="0" fontWeight="bold">
                          target=".highlight-menu"
                        </FormLabel>
                      </FormControl>
                      <Flex flexDirection="column" gap="3">
                        <Text>
                          On the Coast of Coromandel Where the early pumpkins
                          blow, In the middle of the woods Lived the
                          Yonghy-Bonghy-Bo. Two old chairs, and half a candle,
                          One old jug without a handle-- These were all his
                          worldly goods, In the middle of the woods, These were
                          all his worldly goods, Of the Yonghy-Bonghy-Bo, Of the
                          Yonghy-Bonghy Bo.
                        </Text>
                        <Text>
                          Once, among the Bong-trees walking Where the early
                          pumpkins blow, To a little heap of stones Came the
                          Yonghy-Bonghy-Bo. There he heard a Lady talking, To
                          some milk-white Hens of Dorking-- "'Tis the Lady
                          Jingly Jones! On that little heap of stones Sits the
                          Lady Jingly Jones!" Said the Yonghy-Bonghy-Bo, Said
                          the Yonghy-Bonghy-Bo.
                        </Text>
                      </Flex>
                    </CardBody>
                  </Card>
                  <Card ref={menuRef}>
                    <CardBody>
                      <FormControl
                        display="flex"
                        alignItems="center"
                        mb="3"
                        gap={3}
                      >
                        <Switch
                          id="switch-b"
                          size="lg"
                          isChecked={!targetClass}
                          onChange={(e) => setTargetClass(!e.target.checked)}
                        />
                        <FormLabel htmlFor="switch-b" mb="0" fontWeight="bold">
                          target="menuRef"
                        </FormLabel>
                      </FormControl>
                      <Flex flexDirection="column" gap="3">
                        <Text>
                          "Lady Jingly! Lady Jingly! Sitting where the pumpkins
                          blow, Will you come and be my wife?" Said the
                          Yongby-Bonghy-Bo. "I am tired of living singly-- On
                          this coast so wild and shingly-- I'm a-weary of my
                          life; If you'll come and be my wife, Quite serene
                          would be my life!" Said the Yonghy-Bongby-Bo, Said the
                          Yonghy-Bonghy-Bo.
                        </Text>
                        <Text>
                          "On this Coast of Coromandel Shrimps and watercresses
                          grow, Prawns are plentiful and cheap," Said the
                          Yonghy-Bonghy-Bo. "You shall have my chairs and
                          candle, And my jug without a handle! Gaze upon the
                          rolling deep (Fish is plentiful and cheap); As the
                          sea, my love is deep!" Said the Yonghy-Bonghy-Bo, Said
                          the Yonghy-Bonghy-Bo.
                        </Text>
                      </Flex>
                    </CardBody>
                  </Card>
                </Flex>
              </CardBody>
            </TabPanel>
            <TabPanel>
              <Code targetClass={targetClass} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
    </ChakraProvider>
  );
}

const Code = ({ targetClass }) => (
  <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
    {`const Example1 = () => {
  ${
    !targetClass
      ? "const menuRef = useRef();"
      : "/* Any querySelector() value can be used */"
  }
  return (
    <div ${targetClass ? 'className="highlight-menu"' : 'ref="menuRef"'}>
      Selecting this text will show the menu!
    </div>
    <HighlightMenu
      target={${targetClass ? ".highlight-menu" : "menuRef"}}
      menu={({ selectedText, setMenuOpen, selectedHtml }) => <>Add buttons with clickEvents here.</>} />
  );
};`}
  </SyntaxHighlighter>
);

// const ExampleX = () => (
//   <Box>
//     <Text>
//       "Though you've such a tiny body, And your head so large doth grow-- Though
//       your hat may blow away Mr. Yonghy-Bonghy-Bo! Though you're such a Hoddy
//       Doddy, Yet I wish that I could modi- fy the words I needs must say! will
//       you please to go away That is all I have to say, Mr. Yonghy-Bonghy-Bo! Mr.
//       Yonghy-Bonghy-Bo!"
//     </Text>
//     <Text>
//       Down the slippery slopes of Myrtle, Where the early pumpkins blow, To the
//       calm and silent sea Fled the Yonghy-Bonghy-Bo. There, beyond the Bay of
//       Gurtle, Lay a large and lively Turtle. "You're the Cove," he said, "for
//       me; On your back beyond the sea, Turtle, you shall carry me!" Said the
//       Yonghy-Bonghy-Bo, Said the Yonghy-Bonghy-Bo.
//     </Text>
//     <Text>
//       Through the silent-roaring ocean Did the Turtle swiftly go; Holding fast
//       upon his shell Rode the Yonghy-Bonghy-Bo. With a sad primeval motion
//       Towards the sunset isles of Boshen Still the Turtle bore him well. Holding
//       fast upon his shell, "Lady Jingly Jones, farewell!" Sang the
//       Yonghy-Bonghy-Bo, Sang the Yonghy-Bonghy-Bo.
//     </Text>
//     <Text>
//       From the Coast of Coromandel Did that Lady never go; On that heap of
//       stones she mourns For the Yonghy-Bonghy-Bo. On that Coast of Coromandel,
//       In his jug without a handle Still she weeps, and daily moans; On that
//       little heap of stones To her Dorking Hens she moans, For the
//       Yonghy-Bonghy-Bo, For the Yonghy-Bonghy-Bo.
//     </Text>
//   </Box>
// );

export default ExamplePage;
