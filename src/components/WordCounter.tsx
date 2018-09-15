import * as React from "react";

interface IProps {
  counter: number;
}

const WordCounter = ({ counter }: IProps) => (
  <h3 className="word-counter">{counter}</h3>
);

export { WordCounter };
