import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  // Text,
  // Link,
  Heading,
  InputGroup,
  InputRightElement,
  IconButton,
  useToast,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { User } from "../models";

async function login(email: string, password: string) {
  try {
    //TODO:use env variables
    const response = await fetch("http://localhost:5000/users");
    if (!response.ok) throw new Error("Failed to fetch users");

    const users = await response.json();
    return users.find(
      (user: User) => user.email === email && user.password === password,
    );
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  // Responsive box width
  const boxWidth = useBreakpointValue({ base: "90%", sm: "400px" });

  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter email and password",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    const user = await login(email, password);
    setLoading(false);

    if (user) {
      const token = uuidv4();
      localStorage.setItem("authToken", token);
      localStorage.setItem("userEmail", user.email);

      toast({
        title: "Login Successful",
        description: `Welcome, ${user.email}!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setTimeout(() => navigate("/dashboard"), 1500);
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.100">
      <Box w={boxWidth} p={6} bg="white" boxShadow="lg" borderRadius="md">
        <Heading mb={4} textAlign="center">
          Login
        </Heading>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement>
                <IconButton
                  aria-label="Toggle password visibility"
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowPassword(!showPassword)}
                  size="sm"
                  variant="ghost"
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button
            colorScheme="blue"
            width="full"
            onClick={handleLogin}
            isLoading={loading}
          >
            Login
          </Button>

          {/* <Text fontSize="sm">
            Forgot your password?{" "}
            <Link color="blue.500" href="#">
              Reset here
            </Link>
          </Text> */}
        </VStack>
      </Box>
    </Flex>
  );
}
