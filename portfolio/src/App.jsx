import "./assets/css/base.css";
import { ThemeContextProvider } from "./theme/ThemeContextProvider";

import { TextCounter } from "./components/TextCounter";
import { ShapeController } from "./components/ShapeController";

function App() {
  return (
    <ThemeContextProvider>
      <TextCounter />
      <ShapeController />
    </ThemeContextProvider>
  )
}

export default App
