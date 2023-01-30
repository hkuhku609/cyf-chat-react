import React, { useState, useEffect } from 'react';

const Input = ({
  callData,
  fromMessageForEdit,
  setFromMessageForEdit,
  msg,
  setMsg
}) => {
  const [editId, setEditId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (fromMessageForEdit.hasOwnProperty('id')) {
      setEditId(fromMessageForEdit.id);
      setMsg({ from: fromMessageForEdit.from, text: fromMessageForEdit.text });
    }
  }, [fromMessageForEdit]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = 'https://susan-chat-server.glitch.me/messages/';
      let method = 'POST';
      if (fromMessageForEdit.hasOwnProperty('id')) {
        url += `${editId}`;
        method = 'PUT';
      }
      const res = await fetch(url, {
        method,
        body: JSON.stringify(msg),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (!res.ok) return setError(data);
      reset();
    } catch (err) {
      console.error(err);
    }
  };
  const reset = () => {
    clearInputs();
    callData();
    setError('');
    setFromMessageForEdit({});
  };

  const clearInputs = () => {
    setMsg((prev) => ({ ...prev, from: '', text: '' }));
  };

  return (
    <div className='input-container'>
      <form onSubmit={handlePostSubmit}>
        {error && <div className='input-error'>{error}</div>}
        <input
          type='text'
          name='from'
          placeholder='Your Name'
          value={msg.from}
          onChange={(e) =>
            setMsg((prev) => ({ ...prev, from: e.target.value }))
          }
        />
        <br />
        <input
          type='text'
          name='text'
          placeholder='The message...'
          value={msg.text}
          onChange={(e) =>
            setMsg((prev) => ({ ...prev, text: e.target.value }))
          }
        />
        <br />
        <button>
          {fromMessageForEdit.hasOwnProperty('id') ? 'Update' : 'Send'}
        </button>
        <button type='button' onClick={clearInputs}>
          Clear
        </button>
        {fromMessageForEdit.hasOwnProperty('id') && (
          <button type='button' onClick={reset}>
            Cancel Edit
          </button>
        )}
      </form>
    </div>
  );
};

export default Input;
