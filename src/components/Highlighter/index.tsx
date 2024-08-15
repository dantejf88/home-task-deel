import { HighlighterProps } from "../../types";
import "./style.css";

export const Highlighter = ({ inputValue, schoolName }: HighlighterProps) => {
  const regex = new RegExp(`\\b\\w*${inputValue}\\w*\\b`, "i");
  const match = schoolName.match(regex);
  if (match && inputValue.length) {
    const highlightedText = schoolName.replace(
      match[0],
      `<span class="highlight" >${match[0]}</span>`
    );
    return (
      <p
        dangerouslySetInnerHTML={{ __html: highlightedText }}
        className="list-option"
      ></p>
    );
  }

  return <p className="list-option">{schoolName}</p>;
};
