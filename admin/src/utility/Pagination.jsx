import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  paginationPageNumberAction,
  paginationRefreshAction,
} from "../redux/action";

const Pagination = ({ paginationData }) => {
  const totalPages = paginationData ? paginationData?.totalPages : 0;
  const pageNumber = useSelector((state) => state.paginationPageNumberReducer);
  const dispatch = useDispatch();

  const handlePageClick = (page) => {
    dispatch(paginationPageNumberAction(page));
    dispatch(paginationRefreshAction(true));
  };

  const handleNextClick = () => {
    if (pageNumber < totalPages) {
      dispatch(paginationPageNumberAction(pageNumber + 1));
      dispatch(paginationRefreshAction(true));
    }
  };

  const handlePreviousClick = () => {
    if (pageNumber > 1) {
      dispatch(paginationPageNumberAction(pageNumber - 1));
      dispatch(paginationRefreshAction(true));
    }
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const getPageNumbersToShow = () => {
    const maxButtonsToShow = 3;
    if (totalPages <= maxButtonsToShow) {
      return pageNumbers;
    } else if (pageNumber <= maxButtonsToShow - 1) {
      return [...pageNumbers.slice(0, maxButtonsToShow), "...", totalPages];
    } else if (pageNumber >= totalPages - (maxButtonsToShow - 1)) {
      return [1, "...", ...pageNumbers.slice(-maxButtonsToShow)];
    } else {
      return [
        1,
        "...",
        pageNumber - 1,
        pageNumber,
        pageNumber + 1,
        "...",
        totalPages,
      ];
    }
  };

  useEffect(() => {}, [pageNumber, pageNumbers]);

  return (
    <div className="block-section text-right">
      <ul className="pagination remove-margin">
        <li className={` ${pageNumber === 1 ? "disabled" : ""}`}>
          <a  onClick={handlePreviousClick}>
            <i className="fa fa-chevron-left" />
          </a>
        </li>
        {getPageNumbersToShow().map((page, index) => (
          <li key={index} className={` ${pageNumber === page ? "active" : ""}`}>
            {page === "..." ? (
              <span>{page}</span>
            ) : (
              <a  onClick={() => handlePageClick(page)}>
                {page}
              </a>
            )}
          </li>
        ))}
        <li className={` ${pageNumber === totalPages ? "disabled" : ""}`}>
          <a  onClick={handleNextClick}>
            <i className="fa fa-chevron-right" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
