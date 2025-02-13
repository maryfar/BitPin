import { styled, Switch } from "@mui/material";
import { FC } from "react";

interface IToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disable?: boolean;
  className?: string;
}

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  direction: "rtl",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(-9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: "1.6px 14px",
    "&.Mui-checked": {
      transform: "translateX(-12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor:
          theme.palette.mode === "dark" ? "#177ddc" : "rgba(242, 207, 99, 1)",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

const SwitchButton: FC<IToggleProps> = ({
  checked,
  onChange,
  disable = false,
  className = "",
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <AntSwitch
      className={className}
      disabled={disable}
      checked={checked}
      onChange={handleChange}
    />
  );
};

export default SwitchButton;
