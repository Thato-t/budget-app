import React from 'react'

function LoadingState({ message }) {
  return (
    <>
        <div className="recent-empty-recents">
            <p className="recent-loading-state">{ !message ? 'Loading...': message }</p>
        </div>
    </>
  )
}

export default LoadingState