import React from 'react'

const Loading = () => {
    return(
        <div className='container text-center mt-3'>
            <div className="spinner-grow text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default Loading
