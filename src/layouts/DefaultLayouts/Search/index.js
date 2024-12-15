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
import { searchService } from "../../../service/searchService";
import SearchFilmItem from "../../../components/SearchfilmItem/SreachFilmItem";

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [showResult, setShowResult] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const debounce = useDebounce(searchValue, 456);

  useEffect(() => {
    if (!debounce.trim()) {
      setSearchResult([]);
      return;
    }

    setLoading(true);

    searchService(debounce, 5)
      .then((data) => {
        if (Array.isArray(data)) {
          setSearchResult(data);
        } else {
          console.error("Invalid data format", data);
          setSearchResult([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setSearchResult([]);
        setLoading(false);
      });
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
  console.log(searchResult)

  return (
    
    <div>
      <HeadlessTippy
        visible
        interactive
        render={(attrs) => (
          <div className={cx("search-result")} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              
              {Array.isArray(searchResult) &&
                searchResult.length > 0 &&
                searchResult.map((item) => (
                  <SearchFilmItem key={item.id} data={item} />
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
          {loading && (
            <FontAwesomeIcon className={cx("spinner")} icon={faSpinner} />
          )}
          <button className={cx("search-btn")}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
