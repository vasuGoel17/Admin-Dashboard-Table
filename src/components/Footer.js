import React, { useState, useContext, useEffect } from "react";
import Count from "../context/count";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  IoIosArrowForward,
  IoIosArrowBack,
  IoIosFastforward,
  IoIosRewind,
} from "react-icons/io";

const Footer = (props) => {
  const [currentPage, setCurrentPage] = useContext(Count);
  const [num, setnum] = useState(0);
  const nextPage = () => {
    if (props.currentPage !== props.npage) {
      setCurrentPage(props.currentPage + 1);
    }
  };

  const prevPage = () => {
    if (props.currentPage !== props.firstIndex + 1) {
      setCurrentPage(props.currentPage - 1);
    }
  };

  const lastPage = () => {
    setCurrentPage(props.npage);
  };

  const firstPage = () => {
    setCurrentPage(1);
  };

  const changeCPage = (id) => {
    setCurrentPage(id);
  };

  useEffect(() => {
    const nums = [];
    for (let i = 0; i < props.details.length; i++) {
      if (props.details[i].isChecked === true) {
        nums.push(parseInt(props.details[i].id));
      }
    }
    setnum(nums.length);
  });

  return (
    <nav className="footer">
      <div>
        <h5 className="rownos">
          {num} of {props.details.length} row(s) selected.
        </h5>
      </div>
      <div className="pagenos">
        {props.currentPage > props.npage ? (
          <h5>
            Page {props.npage} of {props.npage}
          </h5>
        ) : (
          <h5>
            Page {props.currentPage} of {props.npage}
          </h5>
        )}
        <ul className="pagination">
          <li className="page-item">
            <a
              href="#"
              className="page-link link first-page"
              onClick={firstPage}
            >
              <IoIosArrowBack />
              <IoIosArrowBack />
            </a>
          </li>
          <li className="page-item">
            <a
              href="#"
              className="page-link link previous-page"
              onClick={prevPage}
            >
              <IoIosArrowBack />
            </a>
          </li>

          {props.numbers.map((n, i) => (
            <l1
              className={`page-item ${currentPage === n ? "active" : ""}`}
              key={i}
            >
              <a
                href="#"
                onClick={() => changeCPage(n)}
                className="page-link link"
              >
                {n}
              </a>
            </l1>
          ))}

          <li className="page-item">
            <a href="#" className="page-link next-page link" onClick={nextPage}>
              <IoIosArrowForward />
            </a>
          </li>
          <li className="page-item">
            <a href="#" className="page-link link last-page" onClick={lastPage}>
              <IoIosArrowForward />
              <IoIosArrowForward />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Footer;
