import React, { useState, useEffect, FC } from "react";
import Buttons from "../Buttons/Buttons";
import "./styles.scss";

interface Job {
  id: number;
  job_type: string;
  job_category: string;
  job_activity: string;
  // Добавьте другие поля, если они есть в ваших данных
}

export interface ResponseData {
  count: number;
  next: string | null;
  previous: string | null;
  pages: string | null;
  results: Job[];
}
interface IPagination {
  respData: number | null;
  handlePage: (number: string | number, showMore: boolean) => void;
  handleSearch: (string: string) => void;
}

const Pagination: FC<IPagination> = ({
  respData,
  handlePage,
  handleSearch,
}) => {
  const [page, setPage] = useState<number>(1);
  const [numberPages, setNumberPages] = useState<number>(1);
  const [visiblePages, setVisiblePages] = useState<number>(2);
  const [startPage, setStartPage] = useState<number>(1);
  const [endPage, setEndPage] = useState<number>(5);

  useEffect(() => {
    if (respData) {
      //@ts-ignore
      setNumberPages(respData);
    }
  }, [respData]);

  const handlePageChange = (pageNumber: number, showMore: boolean) => {
    setPage(pageNumber);
    handlePage(pageNumber, showMore);
  };

  useEffect(() => {
    if (page <= visiblePages / 2) {
      setStartPage(1);
      setEndPage(visiblePages);
    } else if (page + visiblePages / 2 >= numberPages) {
      setStartPage(numberPages - visiblePages + 1);
      setEndPage(numberPages);
    } else {
      setStartPage(page - Math.ceil(visiblePages / 2));
      setEndPage(page + Math.ceil(visiblePages / 2));
    }
  }, [page, numberPages, visiblePages]);

  console.log("endPage", endPage);
  console.log("numberPages", numberPages);

  return (
    <div>
      {numberPages !== 1 && page !== endPage && (
        <Buttons
          text={"Показать еще"}
          onClick={() => handlePageChange(page + 1, true)}
          className="buttonPagination"
        />
      )}
      <div className="conatinerPagination">
        <div className="conainerButtonPage">
          {numberPages !== 1 && page !== startPage && (
            <Buttons
              text={"Предыдущая"}
              onClick={() => handlePageChange(page - 1, false)}
              className="whiteButtonArrow"
            />
          )}
          {startPage >= 2 && (
            <Buttons
              key={0}
              onClick={() => handlePageChange(1, false)}
              text={"1"}
              className={`whiteButton ${page === 1 && "active"}`}
            ></Buttons>
          )}
          {startPage > 2 && <span>...</span>}
          {Array.from({ length: numberPages }, (_, index) => (
            <Buttons
              key={index + startPage}
              onClick={() => handlePageChange(index + startPage, false)}
              text={String(index + startPage)}
              className={`whiteButton ${
                page === index + startPage && "active"
              }`}
            ></Buttons>
          ))}
          {endPage < numberPages - 1 && <span>...</span>}

          {endPage <= numberPages - 1 && (
            <Buttons
              key={numberPages}
              onClick={() => handlePageChange(numberPages, false)}
              text={String(numberPages)}
              className={`whiteButton ${page === numberPages && "active"}`}
            ></Buttons>
          )}
          {numberPages !== 1 && page !== endPage && (
            <Buttons
              text={"Следующая"}
              onClick={() => handlePageChange(page + 1, false)}
              className="whiteButtonArrow"
            />
          )}
        </div>
        <p>{`${numberPages} страниц`}</p>
      </div>
    </div>
  );
};

export default Pagination;
