import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCreateQuizSessionMutation } from "../../Redux/API/IQ.Quiz.Api";
import { resetQuiz } from "../../Redux/Slice/IQQuizSlice/IQQuizSlice";

const CustomListItem = ({ content }) => (
  <ListItem sx={{ display: "list-item" }} disablePadding>
    <ListItemText
      primary={content}
      primaryTypographyProps={{
        fontSize: { xs: "14px", md: "20px" },
        fontWeight: "600",
      }}
    />
  </ListItem>
);

const LandingContainer = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(null);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [CreateQuizSession] = useCreateQuizSessionMutation();
  
  const listItems = [
    "This test consists of 35 questions, designed to assess various cognitive skills.",
    "The assessment covers logical reasoning, verbal comprehension, working memory, and spatial reasoning.",
    
    "Each correct answer scores one point, contributing to your overall cognitive score.",
    "The test duration is approximately 25 minutes.",
  ];
  const handleQuizCreation = async () => {
    try {
      dispatch(resetQuiz());
      toast.promise(
        CreateQuizSession({Age:selectedAgeGroup}).unwrap(),
        {
          loading: "Creating Session...",
          success: (response) => {
            sessionStorage.setItem("IQSessionID",response.sessionId)
            navigate(`/IQquiz/${response.sessionId}`, { replace: true });
            return <b>Session Created</b>;
          },
          error: (e) => {
            console.error(e);
            return "Failed to create session.";
          },
        }
      );
    } catch (error) {
      console.error("Failed to create quiz session:", error);
      toast.error("Sorry, session not saved.");
    }
  };

  const ageGroups = [
    { label: "6-12", value: "children" },
    { label: "13-17", value: "adolescents" },
    { label: "18+", value: "adults" },
  ];

  return (
    <Box
      sx={{
        boxSizing: "border-box",
        mt: isSm ? "30%" : null,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* Introductory text */}
      <Typography
        sx={{
          textAlign: "center",
          px: "15px",
          py: "5px",
          color: "#02216F",
          fontSize: { xs: "40px", md: "48px", lg: "60px" },
          fontWeight: "bold",
        }}
      >
        Welcome to the <br />
        <b>IQED</b> Challenge Platform.
      </Typography>

      {/* Age selection box */}
      {!selectedAgeGroup && (
        <Box
          sx={{
            bgcolor: "#02216F",
            width: { xs: "80%", md: "55%" },
            borderRadius: "20px",
            m: "20px",
            p: "20px",
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontSize: { xs: "14px", md: "20px" },
              fontWeight: "600",
              textAlign: "center",
              my: "4%",
            }}
          >
            This IQED Challenge Platform offers a comprehensive cognitive
            assessment to evaluate key cognitive skills, such as logical
            reasoning, verbal comprehension, working memory, and spatial
            reasoning. This assessment is available for children, adolescents, and
            adults, each with age-appropriate questions to measure intelligence
            effectively.
          </Typography>

          <Divider sx={{ bgcolor: "#FFDA55", my: "4%" }} />
          {/* <Typography
            sx={{
              color: "#fff",
              fontSize: { xs: "12px", md: "16px" },
              fontWeight: "600",
              textAlign: "center",
              my: "4%",
            }}
          >
            Please select your age range to start the test
          </Typography> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <Button
                // key={ageGroup.value}
                // onClick={() => setSelectedAgeGroup(ageGroup.value)}
                variant="contained"
                // disabled
                sx={{
                  fontWeight: "bold",
                  fontSize: { md: "20px" },
                  backgroundColor: "#FFDA55",
                  color: "#02216F",
                  boxShadow: "2px 3px white",
                  borderRadius: { xs: "5px", md: "10px" },
                  textTransform: "none",
                  border: "1px solid",
                  px: "8%",
                  borderColor: "white",
                  "&:hover": {
                    color: "#fff",
                    backgroundColor: "black",
                    transform: "translateY(-5px)",
                    transition: "transform 0.3s ease-in-out",
                  },
                }}
              >
                Active Soon!
              </Button>
            {/* {ageGroups.map((ageGroup) => (
              <Button
                key={ageGroup.value}
                onClick={() => setSelectedAgeGroup(ageGroup.value)}
                variant="contained"
                sx={{
                  fontWeight: "bold",
                  fontSize: { md: "20px" },
                  backgroundColor: "#FFDA55",
                  color: "#02216F",
                  boxShadow: "2px 3px white",
                  borderRadius: { xs: "5px", md: "10px" },
                  textTransform: "none",
                  border: "1px solid",
                  px: "8%",
                  borderColor: "white",
                  "&:hover": {
                    color: "#fff",
                    backgroundColor: "black",
                    transform: "translateY(-5px)",
                    transition: "transform 0.3s ease-in-out",
                  },
                }}
              >
                {ageGroup.label}
              </Button>
            ))} */}
          </Box>
        </Box>
      )}

      {/* Dynamic Quiz Instructions - displayed after age group is selected */}
      {selectedAgeGroup && (
        <Box
          sx={{
            bgcolor: "#02216F",
            width: { xs: "80%", md: "65%" },
            borderRadius: "20px",
            m: "20px",
            p: "20px",
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontSize: { xs: "18px", md: "28px" },
              fontWeight: "bold",
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <IconButton aria-label="back" color="white" onClick={() => setSelectedAgeGroup(null)}>
              <ArrowCircleLeftIcon sx={{ fontSize: "30px", color: "white" }} />
            </IconButton>
            General test instructions:
          </Typography>
          <Divider sx={{ bgcolor: "#FFDA55", mb: "3%" }} />

          <Box sx={{ pl: { xs: "5%", md: "10%" }, color: "#fff" }}>
            <List sx={{ listStyleType: "disc" }}>
              {listItems.map((item, index) => (
                <CustomListItem key={index} content={item} />
              ))}
            </List>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "right", width: "100%" }}>
            <Button
              onClick={handleQuizCreation}
              variant="contained"
              sx={{
                fontWeight: "bold",
                fontSize: { md: "20px" },
                backgroundColor: "#FFDA55",
                color: "#02216F",
                boxShadow: "2px 3px white",
                borderRadius: { xs: "5px", md: "10px" },
                textTransform: "none",
                border: "1px solid",
                borderColor: "white",
                "&:hover": {
                  color: "#fff",
                  backgroundColor: "black",
                  transform: "translateY(-5px)",
                  transition: "transform 0.3s ease-in-out",
                },
              }}
            >
              Take the Test!
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default LandingContainer;
