import { useState } from "react";
import {
  Box,
  Typography,
  TextField
} from "@mui/material";

export const TextCounter = () => {
  const [text, setText] = useState('')

  const handleChange = (e) => {
    setText(e.target.value)
  }

  return (
    <Box>
      <Typography
        component="h2"
        variant="h3"
        sx={{
          textAlign: "center",
        }}
      >
        文字数カウンター
      </Typography>
      <Box
        sx={{
          mt: 5,
        }}
      >
        <Box>
          <Typography
            component="p"
            variant="h4"
            sx={{
              py: 3,
              textAlign: "center",
              color: "#fff",
              backgroundColor: "#605c56",
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              letterSpacing: 1.5,
              '& strong': {
                color: "#ffd371",
                px: 2,
                fontSize: 50
              }
            }}
          >
            ただいまの文字数は
            <strong>
              {text.length}
            </strong>
            字
          </Typography>
        </Box>
        <TextField
          multiline
          minRows={5}
          placeholder="カウントする文章を入力"
          onChange={handleChange}
          sx={{
            width: "100%",
            boxSizing: "border-box",
            border: "2px solid #605c56",
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            backgroundColor: "#fff",
            "& .MuiInputBase-root": {
              fontSize: 30
            }
          }}
        />
      </Box>
    </Box>
  )
}