import { Button, Flex, Spinner, Text } from "@radix-ui/themes";
import Link from "next/link";

export default function Home() {
  return (
    <Flex direction="column" gap="5" align="center" justify="between" height="100vh" py="2">
      <Flex align="center" gap="4" justify="center" height="100vh">
        <Text weight="bold" size="6">
          Work In Progress
        </Text>
        <Spinner />
      </Flex>
      <Flex>
        <Link href="https://cv.santiago-lara.dev/" target="_blank" rel="noopener noreferrer">
          <Button size="1" variant="soft">
            Contact Me
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
}
