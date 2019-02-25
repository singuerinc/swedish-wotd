import * as React from "react";
import { useEffect, useState } from "react";
import { InfoButton } from "./components/buttons/InfoButton";
import { ReloadButton } from "./components/buttons/ReloadButton";
import { ThemeButton } from "./components/buttons/ThemeButton";
import { SmallWord } from "./components/SmallWord";
import { Word } from "./components/Word";
import { WordCounter } from "./components/WordCounter";
import { analitycs, loadTheme, loadWordCount, save } from "./utils/impure";
import { onSpacePress } from "./utils/keys";
import { words as defaultDictionary } from "./utils/words";

function openInfo() {
  return window.open("https://github.com/singuerinc/spanish-wotd");
}

const LOCAL_STORAGE_WORD_COUNT = "word_count";
const LOCAL_STORAGE_THEME = "theme";

export function App() {
  const initialTheme = loadTheme(localStorage, LOCAL_STORAGE_THEME);
  const initialCount = loadWordCount(localStorage, LOCAL_STORAGE_WORD_COUNT);

  const [theme, setTheme] = useState(initialTheme);
  const [wordCount, setWordCount] = useState(initialCount);

  const [wordInEnglish, setWordInEnglish] = useState<string>("");
  const [wordInSwedish, setWordInSwedish] = useState<string>("");
  const [wordInSpanish, setWordInSpanish] = useState<string>("");

  function cicleThemes() {
    setTheme(prevTheme => (prevTheme + 1) % 3);
  }

  function nextWord() {
    setWordCount(prevWordCount => prevWordCount + 1);
  }

  useEffect(() => {
    // Everytime the count changes a new set of words is taken
    const index = wordCount % defaultDictionary.length;
    const row = defaultDictionary[index];
    const [wordInSwedish, wordInEnglish, wordInSpanish] = row;

    setWordInSwedish(wordInSwedish);
    setWordInEnglish(wordInEnglish);
    setWordInSpanish(wordInSpanish);

    analitycs(wordCount);

    // Save the wordCount in localStorage so the next
    // time the page is loaded it does not start from 0 but from
    // the latest count
    save(localStorage, LOCAL_STORAGE_WORD_COUNT, JSON.stringify(wordCount));
  }, [wordCount]);

  useEffect(() => {
    save(localStorage, LOCAL_STORAGE_THEME, theme);
  }, [theme]);

  useEffect(() => {
    window.addEventListener("keydown", onSpacePress(() => nextWord()));
    return () =>
      window.removeEventListener("keydown", onSpacePress(() => nextWord()));
  }, []);

  return (
    <div className={`app-container theme-${theme}`}>
      <div className="word-container">
        <Word word={wordInSwedish} />
        <div className="small-words-container">
          <SmallWord word={wordInEnglish} />
          <span className="small">/</span>
          <SmallWord word={wordInSpanish} />
        </div>
        <WordCounter counter={wordCount} />
      </div>
      <ul className="settings">
        <li>
          <InfoButton onClick={() => openInfo()} />
        </li>
        <li>
          <ReloadButton onClick={() => nextWord()} />
        </li>
        <li>
          <ThemeButton theme={theme} onClick={() => cicleThemes()} />
        </li>
      </ul>
    </div>
  );
}
