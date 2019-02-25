import * as React from "react";
import { Cloudy } from "../../icons/Cloudy";
import { Night } from "../../icons/Night";
import { Sunny } from "../../icons/Sunny";

interface IProps {
  theme: number;
  onClick: () => void;
}

export function ThemeButton({ theme, onClick }: IProps) {
  return (
    <div onClick={onClick}>
      {theme === 0 && <Night />}
      {theme === 1 && <Cloudy />}
      {theme === 2 && <Sunny />}
    </div>
  );
}
