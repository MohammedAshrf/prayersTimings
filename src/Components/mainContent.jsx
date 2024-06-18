import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import "../App.css";
import Divider from "@mui/material/Divider";
import Card from "./Card";
import {
  CssBaseline,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  createTheme,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/dist/locale/ar-dz";
import { ThemeProvider } from "@emotion/react";
moment.locale("ar");

/* 
===> More features to add:
1- CSS: Add Light and Dark mode.
2- Done === Material UI: Make it responible.
3- Done === JS: The possibility to add more cities in different countries, 
  and this is by the object value way., and add some Egyption cities spicially.
4- 
*/

export default function MainContent() {
  const [mode, setMode] = useState(false);
  console.log(mode);
  const [ramianingTime, setRemaingTime] = useState("");
  const [newtPrayerIndex, setNewtPrayerIndex] = useState(3);
  const [timings, setTimings] = useState([]);
  const [today, setToday] = useState();
  const [selectedCity, setSelectedCity] = useState({
    id: "1",
    displayName: "مكة المكرمة",
    apiName: "Makkah al Mukarramah",
    counrty: "SAU",
  });

  const darkTheme = createTheme({
    palette: {
      mode: mode ? "dark" : "light",
    },
  });

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
      width: 32,
      height: 32,
      "&::before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      borderRadius: 20 / 2,
    },
  }));

  let Alfajr = timings.Fajr;
  let Dhuhr = timings.Dhuhr;
  let Asr = timings.Asr;
  let Maghrib = timings.Maghrib;
  let Isha = timings.Isha;

  const handleChange = (event) => {
    setSelectedCity(
      avialableCities.find((city) => {
        return city.apiName === event.target.value;
      })
    );
  };

  useEffect(() => {
    fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${selectedCity.apiName}
       &country=${selectedCity.counrty}&method=8`
    )
      .then((res) => res.json())
      .then((data) => {
        setTimings(data.data.timings);
      })
      .catch((error) => console.log(error));
  }, [selectedCity, today]);

  useEffect(() => {
    const t = moment();
    setToday(t.format("MMM Do Y | h:mm"));
    let interval = setInterval(() => {
      setupCountDownTimer();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timings]);

  const setupCountDownTimer = () => {
    const momentNow = moment();
    let prayerIndex = 2;

    if (
      momentNow.isAfter(moment(timings.Fajr, "hh:mm")) &&
      momentNow.isBefore(moment(timings.Dhuhr, "hh:mm"))
    ) {
      prayerIndex = 1;
    } else if (
      momentNow.isAfter(moment(timings.Dhuhr, "hh:mm")) &&
      momentNow.isBefore(moment(timings.Asr, "hh:mm"))
    ) {
      prayerIndex = 2;
    } else if (
      momentNow.isAfter(moment(timings.Asr, "hh:mm")) &&
      momentNow.isBefore(moment(timings.Sunset, "hh:mm"))
    ) {
      prayerIndex = 3;
    } else if (
      momentNow.isAfter(moment(timings.Sunset, "hh:mm")) &&
      momentNow.isBefore(moment(timings.Isha, "hh:mm"))
    ) {
      prayerIndex = 4;
    } else if (momentNow.isBefore(moment(timings.Fajr, "hh:mm"))) {
      prayerIndex = 0;
    }

    setNewtPrayerIndex(prayerIndex);

    // Now after knowing what the next prayer is,
    // we can setup the countdown timer by getting the prayer's time.
    const nextPrayerObject = prayersArray[prayerIndex];
    const nextPrayerTime = timings[nextPrayerObject.key];
    const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");

    let remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);

    if (remainingTime < 0) {
      const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
      const fajrToMidnightDiff = nextPrayerTimeMoment.diff(
        moment("00:00:00", "hh:mm:ss")
      );

      const totalDifference = midnightDiff + fajrToMidnightDiff;
      remainingTime = totalDifference;
    }

    const durationRemainingTime = moment.duration(remainingTime);
    setRemaingTime(
      `${durationRemainingTime.seconds()} : ${durationRemainingTime.minutes()} 
      : ${durationRemainingTime.hours()}`
    );
  };

  const avialableCities = [
    {
      id: "1",
      displayName: "مكة المكرمة",
      apiName: "Makkah al Mukarramah",
      counrty: "SAU",
    },
    {
      id: "2",
      displayName: "الرياض",
      apiName: "Riyadh",
      counrty: "SAU",
    },
    {
      id: "3",
      displayName: "المدينة المنورة",
      apiName: "Medina",
    },
    {
      id: "4",
      displayName: "القاهرة",
      apiName: "Al Qāhirah",
      counrty: "EGY",
    },
    {
      id: "5",
      displayName: "شمال سيناء",
      apiName: "Shamāl Sīnā'",
      counrty: "EGY",
    },
  ];

  const prayersArray = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Sunset", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];

  return (
    <>
      <div>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Box sx={{ flexGrow: 1 }} mb={2}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <div className="content-header">
                  <h2>{today}</h2>

                  <h1>{selectedCity.displayName}</h1>
                  <FormControlLabel
                    control={<MaterialUISwitch sx={{ m: 1 }} />}
                    onChange={() => setMode((pre) => !pre)}
                    checked={mode}
                    // label="MUI switch"
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="content-header">
                  <h2>
                    متبقي حتى صلاة {prayersArray[newtPrayerIndex].displayName}
                  </h2>
                  <h1>{ramianingTime}</h1>
                </div>
              </Grid>
            </Grid>
          </Box>
        </ThemeProvider>
        <Divider />
        <Grid container spacing={2} columns={20} mt={3}>
          <Grid xs={10} md={4}>
            <Card prayer={"الفجر"} time={Alfajr} />
          </Grid>
          <Grid xs={10} md={4}>
            <Card prayer={"الظهر"} time={Dhuhr} />
          </Grid>
          <Grid xs={10} md={4}>
            <Card prayer={"العصر"} time={Asr} />
          </Grid>
          <Grid xs={10} md={4}>
            <Card prayer={"المغرب"} time={Maghrib} />
          </Grid>
          <Grid xs={20} md={4}>
            <Card prayer={"العشاء"} time={Isha} />
          </Grid>
        </Grid>
        <div className="selector">
          <Box sx={{ minWidth: 120 }} bgcolor={mode ? "black" : "white"}>
            <FormControl fullWidth style={{ width: "130px" }}>
              <InputLabel
                id="demo-simple-select-label"
                style={
                  mode
                    ? {
                        color: "white",
                      }
                    : {}
                }
              >
                City
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedCity.apiName}
                label="City"
                onChange={handleChange}
                style={
                  mode
                    ? {
                        backgroundColor: "black",
                        color: "white",
                        border: "6px",
                        width: "120px",
                      }
                    : { width: "120px" }
                }
              >
                {avialableCities.map((city) => {
                  return (
                    <MenuItem key={city.id} value={city.apiName}>
                      {city.displayName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
    </>
  );
}
