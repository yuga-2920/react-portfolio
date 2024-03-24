import "./assets/css/base.css";
import { ThemeContextProvider } from "./theme/ThemeContextProvider";

import { TextCounter } from "./components/TextCounter";

function App() {
  return (
    <ThemeContextProvider>
      <TextCounter />
    </ThemeContextProvider>
  )
}

export default App
