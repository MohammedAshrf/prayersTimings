import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import FajrImage from "../assets/fajr-prayer.png";

// eslint-disable-next-line react/prop-types
export default function ActionAreaCard({ prayer, time }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={FajrImage}
          alt="Prayer Image"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{
              textAlign: "right",
              fontSize: "15px",
              color: "gray",
              fontWeight: "600",
            }}
          >
            {prayer}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{
              textAlign: "right",
              fontSize: "25px",
              color: "black",
              fontWeight: "600",
            }}
          >
            {time}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
