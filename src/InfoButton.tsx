import * as React from "react";

interface IProps {
  onClick: () => void;
}

const InfoButton = ({ onClick }: IProps) => (
  <div onClick={onClick}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#495057"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="info-btn"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="8" />
    </svg>
  </div>
);

export { InfoButton };
