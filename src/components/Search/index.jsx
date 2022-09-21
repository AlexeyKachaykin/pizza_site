import React from "react";
import debounce from "lodash.debounce";
import { SearchContext } from "../../App";
import styles from "./Search.module.scss";

const Search = () => {
  const [value, setValue] = React.useState("");
  const { setSearchValue } = React.useContext(SearchContext);

  const inputRef = React.useRef();
  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 250),
    []
  );
  const onClikClear = () => {
    setSearchValue("");
    setValue("");
    inputRef.current.focus();
  };
  /*   const onChangeInput = (event) => {
    setSearchValue(event.target.value);
    testDobouce();
  }; */
  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };
  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title />
        <g id="search">
          <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
        </g>
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск Пиццы...."
      />
      {value && (
        <svg
          onClick={() => onClikClear("")}
          className={styles.clearIcon}
          height="48"
          viewBox="0 0 48 48"
          width="48"
        >
          <path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z" />
          <path d="M0 0h48v48H0z" fill="none" />
        </svg>
      )}
    </div>
  );
};
export default Search;
