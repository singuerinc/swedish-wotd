import * as React from "react";

interface IProps {
  counter: number;
}

export function WordCounter({ counter }: IProps) {
  return <h3 className="word-counter">{counter}</h3>;
}
