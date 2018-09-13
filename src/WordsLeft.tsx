import * as React from "react";

interface IProps {
  words: string[][];
}

const WordsLeft = ({ words }: IProps) => (
  <h3 className="words-left">{words.length}</h3>
);

export { WordsLeft };
