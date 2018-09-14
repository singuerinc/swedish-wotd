import * as React from "react";

interface IProps {
  onClick: () => void;
}

const withBaseButton = function withTranslator(
  Component: React.StatelessComponent
) {
  return ({ onClick }: IProps) => (
    <div onClick={onClick}>
      <Component />
    </div>
  );
};

export { withBaseButton };
