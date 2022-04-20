import React from "react";

const Pagination = ({ total, current, onClick }) => {
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                    <a className="page-link">Sida {current} av {total}</a>
                </li>
                <li className={"page-item" + (current - 1 === 0 ? " disabled" : "")}>
                    <span className="page-link" role="button" onClick={event => { if (current - 1 === 0) return; onClick(current - 1); }}>Tidigare</span>
                </li>
                <li className="page-item active">
                    <span className="page-link">{current}</span>
                </li>
                <li className={"page-item" + (current + 1 > total ? " disabled" : "")}>
                    <span className="page-link" role="button" onClick={event => { if (current + 1 > total) return; onClick(current + 1); }}>Nästa</span>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination;