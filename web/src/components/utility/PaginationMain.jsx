import React from 'react';
import { useDispatch } from "react-redux";
import { pageNumber, pageNumberRefresh } from '../../redux/action';

const PaginationMain = ({ currentPage, totalPages }) => {
    const dispatch = useDispatch();
    const handlePage=(page)=>{
        dispatch(pageNumber(page));
        dispatch(pageNumberRefresh(true));
    }
    return (
        <div className="theme-pagination text-center">
            <ul>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <li key={page} className={currentPage === page ? "active" : ""}>
                        <a onClick={() => handlePage(page)}>{page}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PaginationMain;
