import {
  Avatar,
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { GemsBox, LogoIcon, MenuBox, StreakBox } from "../General";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../../Redux/API/User.Api";

const UserCard = () => {
  const UserData = useSelector((state) => state.UserState);
  const [anchorEl, setAnchorEl] = useState(null);
  const [Profile, setProfile] = useState("");
  const { isLoading } = useGetUserQuery();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    if (UserData?.profileImage) {
      setProfile(UserData.profileImage);
    } else {
      setProfile("https://avatarfiles.alphacoders.com/374/374848.png");
    }
  }, [UserData]);
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      {!isLoading && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            position: isSm ? "fixed" : "static",
            justifyContent: isSm ? "space-between" : "space-around",
            top: 0,
            alignItems: "center",
            height: isSm ? "50px" : "60px",
            boxSizing: "border-box",
            borderRadius: isSm ? "none" : "10px",
            boxShadow: isSm ? "none" : "3px 3px #02216F",
            p: "10px",
            overflow: "hidden",
            backgroundColor: "#FFDA55",
          }}
          gap={1}
        >
          {isSm && <LogoIcon widthCus={"34px"} />}
          <GemsBox count={UserData?.earnings.iqGems} />
          <StreakBox count={UserData?.earnings.streak?.count} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            gap={1}
          >
            <Box
              sx={{
                overflow: "hidden",
              }}
              maxWidth={80}
            >
              <Typography
                sx={{
                  fontWeight: "700",
                }}
              >
                {UserData?.userName}
              </Typography>
            </Box>
            <IconButton onClick={handleClick}>
              <Avatar
                width={44}
                height={44}
                alt={UserData?.name}
                src={Profile}
                sx={{
                  bgcolor: "white",
                }}
              />
            </IconButton>
            <MenuBox
              open={open}
              anchorEl={anchorEl}
              handleClose={handleClose}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default UserCard;
