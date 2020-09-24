import React from 'react'

const Header = (props) => {
    return (
        <div className="wrapper">
            <h1><img src=""/>Airline Image</h1>
            <div>
              <div className="totalReviews"></div>
              <div className="starRating"></div>
              <div className="totalOutOf"></div>  
            </div>
        </div>
    )
}

export default Header;