import { IconButton, Tooltip } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

interface Props {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function ThemeToggleButton({ darkMode, toggleDarkMode }: Props) {
  return (
    <Tooltip title={`Cambiar a modo ${darkMode ? "claro" : "oscuro"}`}>
      <IconButton onClick={toggleDarkMode} color="inherit" size="large">
        {darkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
}
