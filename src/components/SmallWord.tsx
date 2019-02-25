import * as React from "react";
import { Word } from "./Word";

interface IProps {
  word: string;
}

export function SmallWord({ word }: IProps) {
  return <Word className="small" word={word} />;
}
