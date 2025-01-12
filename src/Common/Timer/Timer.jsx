import { Box, Typography } from "@mui/material";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import toast from "react-hot-toast";
import { tick, tickLast5 } from "../../assets";

// Assuming you have a beep sound file in your project directory
const beepSound = new Audio(tick);
const beepLast5Sound = new Audio(tickLast5);

const Timer = forwardRef(({ start, initialTime, isMP = false, handleQuit, handlesubmit }, ref) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (start) setIsRunning(true);
  }, [start]);

  useEffect(() => {
    if (!isRunning) return;

    const timerId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 1) {
          if (prevTime <= 30) {
            beepSound.play().catch(() => console.log("Error playing sound"));
          }
          if (prevTime <= 5) {
            beepLast5Sound.play().catch(() => console.log("Error playing sound"));
          }
          return prevTime - 1;
        } else {
          clearInterval(timerId);
          toast.error("Time up!");
          handlesubmit();
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [isRunning, handlesubmit]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const formattedTime = formatTime(time);

  useImperativeHandle(ref, () => ({
    pauseTimer: () => setIsRunning(false),
    resetTimer: () => setTime(initialTime),
    startTimer: () => setIsRunning(true),
    getCurrentTime: () => time,
  }));

  const isLast30Seconds = time <= 30;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        position: "fixed",
        top: isMP ? { lg: "0%", xs: "10%", sm: "10%" } : "0%",
        right: "0%",
        bgcolor: "#02216F 60", 
        width: { lg: "250px", xs: "150px", sm: "150px" },
        height: { lg: "80px", xs: "50px", sm: "50px" },
        justifyContent: "center",
        alignItems: "center",
        borderRadius: isMP
          ? { lg: "0 0 0 20px", xs: "20px 0 0 20px", sm: "20px 0 0 20px" }
          : "0 0 0 20px",
        borderLeft: "2px solid #FFDA55",
        borderBottom: "2px solid #FFDA55",
        ...(isMP && {
          borderTop: {
            lg: "0px solid #FFDA55",
            xs: "2px solid #FFDA55",
            sm: "2px solid #FFDA55",
          },
        }),
      }}
      gap={1}
    >
      <Box display="flex" justifyContent="center" gap={0.5}>
        {formattedTime.split("").map((char, index) => (
          <Box
            key={index}
            sx={{
              width: { lg: "40px", xs: "20px", sm: "20px" },
              height: { lg: "40px", xs: "20px", sm: "20px" },
              bgcolor: char === ":" ? "transparent" : (isLast30Seconds ? "red" : "#FFDA55"),
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "4px",
              marginX: char === ":" ? "2px" : "0",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: { lg: "18px", xs: "12px", sm: "12px" },
                color: char === ":" ? "white" : (isLast30Seconds ? "white" : "#02216F"),
              }}
            >
              {char}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
});

Timer.displayName = "Timer";

export default Timer;
