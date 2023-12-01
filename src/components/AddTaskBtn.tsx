import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ColorPalette, pulseAnimation } from "../styles";
import { Button, Tooltip } from "@mui/material";
import { User } from "../types/user";
import { useResponsiveDisplay } from "../hooks/useResponsiveDisplay";

interface AddTaskBtnProps {
  animate: boolean;
  user: User;
}

export const AddTaskBtn = ({ animate, user }: AddTaskBtnProps): JSX.Element | null => {
  const n = useNavigate();
  const isMobile = useResponsiveDisplay();

  // If it's a mobile device, don't render the button.
  if (isMobile) {
    return null;
  }

  return (
    <Tooltip title={user.tasks.length > 0 ? "Add New Task" : "Add Task"} placement="left">
      <Btn
        animate={animate}
        glow={user.settings[0].enableGlow}
        onClick={() => n("add")}
        aria-label="Add Task"
      >
        <Add style={{ fontSize: "38px" }} />
      </Btn>
    </Tooltip>
  );
};

const Btn = styled(Button) <{ animate: boolean; glow: boolean }>`
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 10px;
  right: 7px;
  width: 72px;
  height: 72px;
  border-radius: 100%;
  background-color: ${ColorPalette.purple};
  color: white;
  box-shadow: ${({ glow }) => (glow ? `0px 0px 32px -8px ${ColorPalette.purple}` : "none")};
  transition: background-color 0.3s, backdrop-filter 0.3s, box-shadow 0.3s;

  &:hover {
    box-shadow: none;
    background-color: #b624ffd0;
    backdrop-filter: blur(6px);
  }

  ${({ animate }) =>
    animate &&
    css`
      animation: ${pulseAnimation} 1.2s infinite;
    `}

  @media (max-width: 1024px) {
    bottom:24px;
    right: 7px;
  }
`;