import { Box, IconButton, useTheme, Menu, MenuItem } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import CancelIcon from "@mui/icons-material/Cancel"; // New CancelIcon

const Topbar = ({ onLogout }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term
  const [isSearching, setIsSearching] = useState(false); // State for search status
  const navigate = useNavigate(); // Initialize useNavigate
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleLogout = () => {
    // Call logout handler passed from App.js
    onLogout();
    // Redirect to authentication page
    navigate("/");
  };

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    localStorage.clear();
    setAnchorEl(null);
    // navigate("/");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") return;

    // Function to recursively remove existing highlights
    const removeHighlights = (node) => {
      if (
        node.nodeType === Node.ELEMENT_NODE &&
        node.classList.contains("highlight")
      ) {
        const parent = node.parentNode;
        while (node.firstChild) {
          parent.insertBefore(node.firstChild, node);
        }
        parent.removeChild(node);
        return; // Stop further processing
      }
      if (
        node.nodeType === Node.ELEMENT_NODE ||
        node.nodeType === Node.TEXT_NODE
      ) {
        for (let i = node.childNodes.length - 1; i >= 0; i--) {
          removeHighlights(node.childNodes[i]);
        }
      }
    };

    // Remove existing highlights
    removeHighlights(document.body);

    // Function to recursively search and highlight text nodes
    const searchAndHighlight = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const regex = new RegExp(`(${searchTerm})`, "gi");
        const matchText = node.textContent;
        if (regex.test(matchText)) {
          const newHtml = matchText.replace(
            regex,
            `<span class="highlight" style="background-color: #FE9900;">$1</span>`
          );
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = newHtml;
          while (tempDiv.firstChild) {
            node.parentNode.insertBefore(tempDiv.firstChild, node);
          }
          node.parentNode.removeChild(node);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        for (let i = 0; i < node.childNodes.length; i++) {
          searchAndHighlight(node.childNodes[i]);
        }
      }
    };

    // Start searching from the body element
    searchAndHighlight(document.body);
    setIsSearching(true); // Set isSearching to true after search starts
  };
  const handleCancelSearch = () => {
    setIsSearching(false); // Reset search status
    setSearchTerm(""); // Clear search term if needed
    const removeHighlights = (node) => {
      if (
        node.nodeType === Node.ELEMENT_NODE &&
        node.classList.contains("highlight")
      ) {
        const parent = node.parentNode;
        while (node.firstChild) {
          parent.insertBefore(node.firstChild, node);
        }
        parent.removeChild(node);
        return;
      }
      if (
        node.nodeType === Node.ELEMENT_NODE ||
        node.nodeType === Node.TEXT_NODE
      ) {
        for (let i = node.childNodes.length - 1; i >= 0; i--) {
          removeHighlights(node.childNodes[i]);
        }
      }
    };
    removeHighlights(document.body);
    window.location.reload("false");
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {isSearching ? (
          <IconButton type="button" sx={{ p: 1 }} onClick={handleCancelSearch}>
            <CancelIcon />
          </IconButton>
        ) : (
          <IconButton type="button" sx={{ p: 1 }} onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        )}
        {/* <IconButton type="button" sx={{ p: 1 }} onClick={handleSearch}>
          <SearchIcon />
        </IconButton> */}
      </Box>
      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        {/* Menu Button */}
        <IconButton onClick={handleMenuClick}>
          <PersonOutlinedIcon />
        </IconButton>
        {/* Menu */}
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              navigate("/");
            }}
          >
            Log Out
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
