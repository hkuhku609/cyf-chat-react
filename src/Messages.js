import React from 'react';

const Messages = ({ messages, callData, handleEdit, handleCancelEditMode }) => {
  const handleDelete = async (id) => {
    await fetch(`https://susan-chat-server.glitch.me/messages/${id}`, {
      method: 'DELETE'
    });
    callData();
    handleCancelEditMode();
  };

  return (
    <div className='messages-container'>
      {messages.map(({ id, from, text, timeSent }) => (
        <div key={id} className='message-container'>
          <div className='message-title'>
            <span>{from}:</span>
            <div className='message-btns'>
              <button
                className='message-btn edit-btn'
                onClick={() => handleEdit(id, from, text)}
              >
                Edit
              </button>
              <button
                className='message-btn close-btn'
                onClick={() => handleDelete(id)}
              >
                X
              </button>
            </div>
          </div>
          <div className='message-text'>{text}</div>
          <div className='message-info'>
            {timeSent} #{id}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
