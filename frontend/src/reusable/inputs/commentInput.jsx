import React from 'react'

function CommentInput({onChange}) {
  return (
    <>
        <div className="add-transaction-comment-wrapper">
          <textarea 
           id="add-transaction-comment" 
           placeholder="Enter comment"
           onChange={onChange}
           ></textarea>
        </div>
    </>
  )
}

export default CommentInput