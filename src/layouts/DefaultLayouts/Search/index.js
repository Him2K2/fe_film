import { useState, useRef, useEffect } from "react";
import { useDebounce } from "../../../hooks";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import {
  faCircleXmark,
  faMagnifyingGlass,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import HeadlessTippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "../../../components/Popper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {searchService} from "../../../service/searchService"
import FilmItem from "../../../components/filmItem/FilmItem";

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [showResult, setShowResult] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const debounce = useDebounce(searchValue, 456);

  useEffect(() => {
    return () => {
      setShowResult(false);
    };
  }, []);

  useEffect(() => {
    if (!debounce.trim()) {
      setSearchResult([]);
      return;
    }

    setLoading(true);

    searchService(debounce)
      .then((data) => {
        setSearchResult(data);
        setLoading(false);
      })
      .catch(console.error);
  }, [debounce]);

  const inputRef = useRef();

  const handleHideResult = () => {
    setShowResult(false);
    setSearchValue("");
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (!value.startsWith(" ")) {
      setSearchValue(value);
    }
  };

  return (
    <div>
      <HeadlessTippy
        visible={showResult && searchResult.length > 0}
        interactive
        render={(attrs) => (
          <div className={cx("search-result")} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h5 className={cx("search-title")}>Accounts</h5>
              {searchResult.map((item) => (
                <FilmItem></FilmItem>
              ))}
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx("search")}>
          <input
            ref={inputRef}
            value={searchValue}
            placeholder="Search film and videos"
            spellCheck={false}
            onChange={handleChange}
            onFocus={() => setShowResult(true)}
          />
          {!!searchValue && !loading && (
            <button
              className={cx("clear")}
              onClick={() => {
                setSearchValue("");
                inputRef.current.focus();
              }}
            >
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}
          {loading && <FontAwesomeIcon className={cx("spinner")} icon={faSpinner} />}
          <button className={cx("search-btn")}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;