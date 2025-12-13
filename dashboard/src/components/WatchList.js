import React from 'react'

const WatchList = () => {
    return (
        <div className='watchlist-container'>
            <div className="search-container">
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search stocks here..."
                    className="search"
                />
                <span className="counts"> {12} / 50</span>
            </div>

        </div>
    )
}

export default WatchList
