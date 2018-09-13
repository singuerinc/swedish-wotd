import * as React from "react";

interface IProps {
  word: string;
  className?: string;
}

const Word = ({ className, word }: IProps) => (
  <h1 className={className}>{word}</h1>
);

export { Word };
