import { HighlightMenu } from "./lib";
import { CopyIcon, SearchIcon } from "@chakra-ui/icons";
import {
  ChakraProvider,
  IconButton,
  Flex,
  Box,
  Heading,
  Text,
  Card,
  CardBody,
  CardHeader,
} from "@chakra-ui/react";

function ExamplePage() {
  return (
    <ChakraProvider>
      <Lorem />
    </ChakraProvider>
  );
}

const Lorem = (props) => (
  <Box {...props}>
    <HighlightMenu
      target={".highlight-menu"}
      menu={({ clientRect, selectedHtml, selectedText }) => (
        <Flex gap="2">
          <IconButton
            aria-label="Copy"
            onClick={() => {
              console.log(selectedHtml);
            }}
            icon={<CopyIcon />}
          />
          <IconButton aria-label="Search" icon={<SearchIcon />} />
        </Flex>
      )}
    />
    <Card>
      <CardHeader>
        <Heading size="md">Client Report</Heading>
      </CardHeader>
      <CardBody className="highlight-menu">
        <Heading size="xs" textTransform="uppercase">
          Target is a className
        </Heading>
        <Text pt="2">
          On the Coast of Coromandel Where the early pumpkins blow, In the
          middle of the woods Lived the Yonghy-Bonghy-Bo. Two old chairs, and
          half a candle, One old jug without a handle-- These were all his
          worldly goods, In the middle of the woods, These were all his worldly
          goods, Of the Yonghy-Bonghy-Bo, Of the Yonghy-Bonghy Bo.
        </Text>
      </CardBody>
    </Card>
    <Card className="highlight-menu2">
      <CardBody className="highlight-menu2">
        <Heading size="xs" textTransform="uppercase">
          Target a REF
        </Heading>
        <Text pt="2">
          Once, among the Bong-trees walking Where the early pumpkins blow, To a
          little heap of stones Came the Yonghy-Bonghy-Bo. There he heard a Lady
          talking, To some milk-white Hens of Dorking-- "'Tis the Lady Jingly
          Jones! On that little heap of stones Sits the Lady Jingly Jones!" Said
          the Yonghy-Bonghy-Bo, Said the Yonghy-Bonghy-Bo.
        </Text>
      </CardBody>
    </Card>
    <Text>
      "Lady Jingly! Lady Jingly! Sitting where the pumpkins blow, Will you come
      and be my wife?" Said the Yongby-Bonghy-Bo. "I am tired of living singly--
      On this coast so wild and shingly-- I'm a-weary of my life; If you'll come
      and be my wife, Quite serene would be my life!" Said the Yonghy-Bongby-Bo,
      Said the Yonghy-Bonghy-Bo.
    </Text>
    <Text>
      "On this Coast of Coromandel Shrimps and watercresses grow, Prawns are
      plentiful and cheap," Said the Yonghy-Bonghy-Bo. "You shall have my chairs
      and candle, And my jug without a handle! Gaze upon the rolling deep (Fish
      is plentiful and cheap); As the sea, my love is deep!" Said the
      Yonghy-Bonghy-Bo, Said the Yonghy-Bonghy-Bo.
    </Text>
    <Text>
      Lady Jingly answered sadly, And her tears began to flow-- "Your proposal
      comes too late, Mr. Yonghy-Bonghy-Bo! I would be your wife most gladly!"
      (Here she twirled her fingers madly) "But in England I've a mate! Yes!
      you've asked me far too late, For in England I've a mate, Mr.
      Yonghy-Bonghy-Bo! Mr. Yongby-Bonghy-Bo!
    </Text>
    <Text>
      "Mr. Jones (his name is Handel-- Handel Jones, Esquire, & Co.) Dorking
      fowls delights to send Mr. Yonghy-Bonghy-Bo! Keep, oh, keep your chairs
      and candle, And your jug without a handle-- I can merely be your friend!
      Should my Jones more Dorkings send, I will give you three, my friend! Mr.
      Yonghy-Bonghy-Bo! Mr. Yonghy-Bonghy-Bo!
    </Text>
    <Text>
      "Though you've such a tiny body, And your head so large doth grow-- Though
      your hat may blow away Mr. Yonghy-Bonghy-Bo! Though you're such a Hoddy
      Doddy, Yet I wish that I could modi- fy the words I needs must say! will
      you please to go away That is all I have to say, Mr. Yonghy-Bonghy-Bo! Mr.
      Yonghy-Bonghy-Bo!"
    </Text>
    <Text>
      Down the slippery slopes of Myrtle, Where the early pumpkins blow, To the
      calm and silent sea Fled the Yonghy-Bonghy-Bo. There, beyond the Bay of
      Gurtle, Lay a large and lively Turtle. "You're the Cove," he said, "for
      me; On your back beyond the sea, Turtle, you shall carry me!" Said the
      Yonghy-Bonghy-Bo, Said the Yonghy-Bonghy-Bo.
    </Text>
    <Text>
      Through the silent-roaring ocean Did the Turtle swiftly go; Holding fast
      upon his shell Rode the Yonghy-Bonghy-Bo. With a sad primeval motion
      Towards the sunset isles of Boshen Still the Turtle bore him well. Holding
      fast upon his shell, "Lady Jingly Jones, farewell!" Sang the
      Yonghy-Bonghy-Bo, Sang the Yonghy-Bonghy-Bo.
    </Text>
    <Text>
      From the Coast of Coromandel Did that Lady never go; On that heap of
      stones she mourns For the Yonghy-Bonghy-Bo. On that Coast of Coromandel,
      In his jug without a handle Still she weeps, and daily moans; On that
      little heap of stones To her Dorking Hens she moans, For the
      Yonghy-Bonghy-Bo, For the Yonghy-Bonghy-Bo.
    </Text>
  </Box>
);

export default ExamplePage;
