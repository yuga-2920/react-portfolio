import "./assets/css/base.css";
import { ThemeContextProvider } from "./theme/ThemeContextProvider";

import { TextCounter } from "./components/TextCounter";
import { ShapeController } from "./components/ShapeController";
import { GoogleCloudVision } from "./components/GoogleCloudVision";
import { ScrollEffect } from "./components/ScrollEffect";
import { MouseImage } from "./components/MouseImage";

function App() {
  return (
    <ThemeContextProvider>
      <TextCounter />
      <ShapeController />
      <GoogleCloudVision />
      <ScrollEffect />
      <MouseImage />
    </ThemeContextProvider>
  )
}

export default App
