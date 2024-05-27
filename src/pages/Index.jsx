import { useState } from "react";
import { Container, VStack, HStack, Text, Button, Input, Box, IconButton } from "@chakra-ui/react";
import { FaThumbsUp, FaHeart, FaLaugh } from "react-icons/fa";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = () => {
    if (newPost.trim() !== "") {
      setPosts([...posts, { content: newPost, reactions: { thumbsUp: 0, heart: 0, laugh: 0 } }]);
      setNewPost("");
    }
  };

  const handleReaction = (index, reaction) => {
    const updatedPosts = [...posts];
    updatedPosts[index].reactions[reaction]++;
    setPosts(updatedPosts);
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl" fontWeight="bold">Public Postboard</Text>
        <HStack width="100%">
          <Input
            placeholder="Write a new post..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <Button onClick={handlePostSubmit} colorScheme="blue">Post</Button>
        </HStack>
        <VStack spacing={4} width="100%">
          {posts.map((post, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="md" width="100%">
              <Text mb={2}>{post.content}</Text>
              <HStack spacing={4}>
                <IconButton
                  aria-label="Thumbs Up"
                  icon={<FaThumbsUp />}
                  onClick={() => handleReaction(index, "thumbsUp")}
                />
                <Text>{post.reactions.thumbsUp}</Text>
                <IconButton
                  aria-label="Heart"
                  icon={<FaHeart />}
                  onClick={() => handleReaction(index, "heart")}
                />
                <Text>{post.reactions.heart}</Text>
                <IconButton
                  aria-label="Laugh"
                  icon={<FaLaugh />}
                  onClick={() => handleReaction(index, "laugh")}
                />
                <Text>{post.reactions.laugh}</Text>
              </HStack>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;