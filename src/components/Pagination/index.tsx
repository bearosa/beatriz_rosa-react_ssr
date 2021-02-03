import cls from "classnames";
import { useState } from "react";

import st from "./pagination.module.scss";

const Pagination = (
  {
    currentPage, 
    itemsPerPage, 
    totalItems,
    pageBound,
    setCurrentPage
  }: {
    currentPage: number, 
    itemsPerPage: number, 
    totalItems: number, 
    pageBound: number,
    setCurrentPage: (page: number) => void
  }
) => {

  const [lowerPageBound, setLowerPageBound] = useState<number>(0);
  const [upperPageBound, setUpperPageBound] = useState<number>(pageBound);
  
  const handlePreviousOnClick = () => {
    if(upperPageBound - Math.floor(pageBound / 2) >= currentPage && lowerPageBound > 0) {
      setUpperPageBound(upperPageBound - 1);
      setLowerPageBound(lowerPageBound - 1);
    }
    setCurrentPage(currentPage - 1)
  }

  const handleNextOnClick = () => {
    if(lowerPageBound + Math.floor(pageBound / 2) < currentPage && upperPageBound < totalPages) {
      setUpperPageBound(upperPageBound + 1);
      setLowerPageBound(lowerPageBound + 1);
    }
    setCurrentPage(currentPage + 1);
  }

  const handlePageOnClick = (page: number) => {
    if(page + Math.floor(pageBound / 2) <= totalPages && page - Math.floor(pageBound / 2) >= 0) {
      console.log(page, page + Math.floor(pageBound / 2), page - Math.floor(pageBound / 2))
      setUpperPageBound(page + Math.floor(pageBound / 2));
      setLowerPageBound(page - Math.ceil(pageBound / 2));
    } else if(page + Math.floor(pageBound / 2) > totalPages) {
      const boundIncrease = totalPages - page;
      setUpperPageBound(page + boundIncrease);
      setLowerPageBound(page + boundIncrease - pageBound)
    } else if(page - Math.floor(pageBound / 2) < 0) {
      setUpperPageBound(pageBound);
      setLowerPageBound(0);
    }
    setCurrentPage(page)
  }

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => {
    if((number < upperPageBound + 1) && number > lowerPageBound){
        return(
          <button 
            className={cls(st.pageButton, {[st.active]: number === currentPage})} 
            key={number} 
            onClick={() => handlePageOnClick(number)}>
              {number}
          </button>
        )
    }
    return null;
  });
  
  if(totalPages > 1) {
    return (
      <div className={st.pagination}>
        <button
          disabled={currentPage === 1}
          className={cls(st.previousButton, {[st.disabled]: currentPage === 1})}
          onClick={handlePreviousOnClick}>
            Previous
        </button>
        <div>
          {
            lowerPageBound >= 1 &&
            <>
              <button 
                className={st.pageButton} 
                key={1}
                onClick={() => handlePageOnClick(1)}>
                  1
              </button>
              <span>...</span>
            </>
          }
          {renderPageNumbers}
          {
            upperPageBound < totalPages &&
            <>
              <span>...</span>
              <button 
                className={st.pageButton} 
                key={totalPages} 
                onClick={() => handlePageOnClick(totalPages)}>
                  {totalPages}
              </button>
            </>
          }
        </div>
        <button 
          disabled={currentPage === totalPages}
          className={cls(st.nextButton, {[st.disabled]: currentPage === totalPages})} 
          onClick={handleNextOnClick}>
            Next
        </button>
      </div>
    );
  }

  return null;
}

export default Pagination;