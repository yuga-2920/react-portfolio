import "./assets/css/base.css";
import { ThemeContextProvider } from "./theme/ThemeContextProvider";

import { TextCounter } from "./components/TextCounter";
import { ShapeController } from "./components/ShapeController";
import { GoogleCloudVision } from "./components/GoogleCloudVision";
import { ScrollEffect } from "./components/ScrollEffect";

function App() {
  return (
    <ThemeContextProvider>
      <TextCounter />
      <ShapeController />
      <GoogleCloudVision />
      <ScrollEffect />
    </ThemeContextProvider>
  )
}

export default App
