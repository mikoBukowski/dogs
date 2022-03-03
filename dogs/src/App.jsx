import { RandomDogsView } from "./pages/main-page";
import { ChakraProvider } from "@chakra-ui/react";

export const App = () => {
  return (
      <main>
        <ChakraProvider>
          <RandomDogsView />
        </ChakraProvider>
      </main>
  );
}

export default App;