import { useEffect, useRef, useState } from "react";
import { AutocompleteProps, School } from "../../types";
import CloseIcon from "../../assets/close-icon.svg";
import { useDebounce } from "../../hooks/useDebounce";
import "./style.css";
import { Highlighter } from "../Highlighter";

export const Autocomplete = ({
  dataList,
  setQueryValue,
  isFetching,
  setIsFetching,
  isError,
}: AutocompleteProps) => {
  const [showCloseIcon, setShowCloseIcon] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const debouncedOnChange = useDebounce(
    (value: string) => setQueryValue(value),
    300
  );

  useEffect(() => {
    if (!inputValue.length) {
      setShowCloseIcon(false);
    }
  }, [inputValue]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsInputFocused(false);
      }
    };

    // This addEventListener is to close the dropdown when clicking outside the component
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const optionClickHandler = (school: School) => {
    setInputValue(school.name);
    setShowCloseIcon(true);
    debouncedOnChange(school.name);
    setIsInputFocused(false);
  };

  const closeIconClickHandler = () => {
    setIsFetching(true);
    setInputValue("");
    debouncedOnChange("");
    setShowCloseIcon(false);
    setIsInputFocused(true);
  };

  const handleInputChange = (value: string) => {
    setIsFetching(true);
    setInputValue(value);
    debouncedOnChange(value);
  };

  return (
    <div className="component-container" ref={containerRef}>
      <div className={`input-container ${isInputFocused ? "focused" : ""}`}>
        <input
          className="input-search"
          placeholder="Search for a school"
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
          value={inputValue}
          title={inputValue}
        />
        {showCloseIcon && (
          <img
            className="icon"
            onClick={closeIconClickHandler}
            src={CloseIcon}
            alt="Close"
          />
        )}
      </div>
      {isInputFocused && !isError && (
        <div className="list-container">
          {isFetching ? (
            <div className="spinner" />
          ) : (
            <ul className="list">
              {dataList.length ? (
                <>
                  {dataList.map((school) => (
                    <li
                      className="list-item"
                      key={school.name}
                      onClick={() => optionClickHandler(school)}
                    >
                      <Highlighter
                        inputValue={inputValue}
                        schoolName={school.name}
                      />
                    </li>
                  ))}
                </>
              ) : (
                <p className="empty-result">No results</p>
              )}
            </ul>
          )}
        </div>
      )}
      {isError && <p className="error-message">{isError}</p>}
    </div>
  );
};
