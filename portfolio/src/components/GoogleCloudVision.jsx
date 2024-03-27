import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Paper,
  IconButton
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const API_KEY = import.meta.env.VITE_GOOGLE_CLOUD_VISION_API_KEY

// google cloud visionを使用した画像のラベル解析
export const GoogleCloudVision = () => {
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [labels, setLabels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // response用の画像の変換
  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  // ドラッグ&ドロップで画像のセット
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
      toBase64(file).then(value => setImage(value));
    }
  }, []);

  // デフォルトの挙動の制限
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  // 画像のラベル解析
  useEffect(() => {
    (async () => {
      if (!image) return;

      try {
        setIsLoading(true)
        const response = await axios.post(
          `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`,
          {
            requests: [
              {
                image: {
                  content: image.split(",")[1]
                },
                features: [{ type: "LABEL_DETECTION" }]
              }
            ]
          },
          { headers: { "Content-Type": "application/json" } }
        );

        const _labels = response.data.responses[0].labelAnnotations.map(label => label.description);
        setLabels(_labels);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false)
      }
    })();
  }, [image]);

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
        APIを使った画像のラベル検出
      </Typography>
      <Box
        sx={{
          maxWidth: 600,
          margin: "auto"
        }}
      >
        <Paper
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          sx={{
            width: "50%",
            m: "30px auto",
            padding: 2,
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: "#fafafa",
            "&:hover": {
              backgroundColor: "#f0f0f0"
            }
          }}
        >
          <IconButton color="primary">
            <CloudUploadIcon sx={{ fontSize: 40 }} />
          </IconButton>
          <Typography>画像をドラック&ドロップ</Typography>
        </Paper>
        {imageUrl && (
          isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <CircularProgress />
            </Box>
          ): (
            <Card sx={{ mt: 2 }}>
              <CardMedia
                component="img"
                height="300"
                image={imageUrl}
              />
              <CardContent>
                <Typography
                  variant="h5"
                  component="p"
                >
                  ラベル検出
                </Typography>
                <Box
                  sx={{
                    mt: 3
                  }}
                >
                  {labels.map((label, index) => (
                    <Typography
                      key={index}
                      variant="body1"
                    >
                      {label}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
            </Card>
          )
        )}
      </Box>
    </Box>
  );
}