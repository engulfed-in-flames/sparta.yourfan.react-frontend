import { Divider, Grid, GridItem, Skeleton } from "@chakra-ui/react";

export default function PostListSkeleton() {
  return (
    <>
      <Grid userSelect={"none"} gridAutoFlow={"row"} gridAutoRows={"1fr"} p={8}>
        {Array.from({ length: 15 }, (_, i) => i + 1).map((v, i) => (
          <GridItem key={i}>
            <Grid
              gridAutoFlow={"column"}
              templateColumns={"0.5fr 3fr 1fr 1fr"}
              gap={4}
              fontSize={"xl"}
              py={2}
            >
              <Skeleton h={8} borderRadius={"md"} my={1} />
              <Skeleton h={8} borderRadius={"md"} my={1} />
              <Skeleton h={8} borderRadius={"md"} my={1} />
              <Skeleton h={8} borderRadius={"md"} my={1} />
            </Grid>
            <Divider />
          </GridItem>
        ))}
      </Grid>
    </>
  );
}
