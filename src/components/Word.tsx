import * as React from "react";

interface IProps {
  word: string;
  className?: string;
}

export function Word({ className, word }: IProps) {
  return <h1 className={className}>{word}</h1>;
}

export { Word };
