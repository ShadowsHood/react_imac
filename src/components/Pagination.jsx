import React from 'react';

function Pagination({ page, onPageChange }) {
    return (
        <div className="pagination">
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page <= 1}
            >
                &lt;
            </button>
            <input
                type="number"
                id="page"
                name="page"
                min="1"
                value={page}
                onChange={(event) => {
                    const newValue = event.target.value;
                    const parsedValue = parseInt(newValue, 10);
                    if (newValue === '' || isNaN(parsedValue) || parsedValue < 1) return;
                    onPageChange(parsedValue);
                }}
            />
            <button onClick={() => onPageChange(page + 1)}>&gt;</button>
        </div>
    );
}

export default Pagination;