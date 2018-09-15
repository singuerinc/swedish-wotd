import * as React from "react";
import { Word } from "./Word";

const SmallWord = ({ word }: { word: string }) => (
  <Word className="small" word={word} />
);

export { SmallWord };
