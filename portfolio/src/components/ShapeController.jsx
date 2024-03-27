import { useState } from "react";
import {
  Box,
  Stack,
  Slider,
  Typography
} from "@mui/material";

// 物体の動作制御
export const ShapeController = () => {
  const [state, setState] = useState(
    {
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
    }
  );

  // スタイルの制御
  const handleChange = (type) => (e, value) => {
    setState(prev => (
      {
        ...prev,
        [type]: value
      }
    ));
  };

  return (
    <Box
      sx={{
        mt: 20
      }}
    >
      <Typography
        component="h2"
        variant="h3"
        sx={{
          textAlign: "center",
        }}
      >
        スタイル変更
      </Typography>
      <Box
        sx={{
          width: 200,
          height: 200,
          mx: "auto",
          my: 15,
          borderRadius: 5,
          backgroundColor: "primary.main",
          transform: `rotate(${state.rotation}deg) scale(${state.scale})`,
          position: "relative",
          top: `${state.y}px`,
          left: `${state.x}px`,
        }}
      />
      <Box
        sx={{
          width: "30%",
          m: "0 auto"
        }}
      >
        <Stack>
          <Typography>
            X: { state.x }px
          </Typography>
          <Slider
            min={-100}
            max={100}
            value={state.x}
            onChange={handleChange("x")}
          />
        </Stack>
        <Stack>
          <Typography>
            Y: { state.y }px
          </Typography>
          <Slider
            min={-100}
            max={100}
            value={state.y}
            onChange={handleChange("y")}
          />
        </Stack>
        <Stack>
          <Typography>
            Rotate: {state.rotation}deg
          </Typography>
          <Slider
            min={0}
            max={360}
            value={state.rotation}
            onChange={handleChange("rotation")}
          />
        </Stack>
        <Stack>
          <Typography>
            Scale: {state.scale}
          </Typography>
          <Slider
            min={0}
            max={2}
            step={0.01}
            value={state.scale}
            onChange={handleChange("scale")}
          />
        </Stack>
      </Box>
    </Box>
  );
}
