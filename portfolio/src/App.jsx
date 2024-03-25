import "./assets/css/base.css";
import { ThemeContextProvider } from "./theme/ThemeContextProvider";

import { TextCounter } from "./components/TextCounter";
import { ShapeController } from "./components/ShapeController";
import { GoogleCloudVision } from "./components/GoogleCloudVision";

function App() {
  return (
    <ThemeContextProvider>
      <TextCounter />
      <ShapeController />
      <GoogleCloudVision />
    </ThemeContextProvider>
  )
}

export default App
