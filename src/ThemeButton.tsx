import * as React from "react";
import { Cloudy } from "./icons/Cloudy";
import { Night } from "./icons/Night";
import { Sunny } from "./icons/Sunny";

interface IProps {
  theme: number;
  onClick: () => void;
}

class ThemeButton extends React.Component<IProps> {
  public render() {
    const { theme, onClick } = this.props;

    return (
      <div onClick={onClick}>
        {theme === 0 && <Night />}
        {theme === 1 && <Cloudy />}
        {theme === 2 && <Sunny />}
      </div>
    );
  }
}

export { ThemeButton };
