import React, { useState, useEffect, useCallback } from 'react';
import Messages from './Messages';
import Input from './Input';
import Title from './Title';
import DisplayStyle from './DisplayStyle';
import CountDown from './CountDown';
import Loading from './Loading';
import './App.css';

function App() {
  const [msg, setMsg] = useState({ from: '', text: '' });

  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [state, setState] = useState({ isLoading: true, isError: false });

  const [fromMessageComponent, setFromMessageComponent] = useState({});
  const [display, setDisplay] = useState('latest');
  const fetchedData = useCallback(async () => {
    try {
      const res = await fetch(
        `https://susan-chat-server.glitch.me/messages/${display}`
      );
      if (!res.ok) throw Error('Did not receive expected data');
      const data = await res.json();
      setState((prev) => ({ ...prev, isError: false }));
      setMessages(data);
      setFilteredMessages(data);
    } catch (err) {
      setState((prev) => ({ ...prev, isError: err.message }));
      console.error(err);
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [display]);
  useEffect(() => {
    fetchedData();
  }, [fetchedData]);

  const handleEdit = (id, from, text) => {
    setFromMessageComponent({ id, from, text });
  };

  const searchFromApp = (word) => {
    if (!word.trim()) return setFilteredMessages(messages);
    const filtered = messages.filter(
      ({ from, text }) =>
        from.toLowerCase().includes(word) || text.toLowerCase().includes(word)
    );
    setFilteredMessages(filtered);
  };

  const changeDisplay = (radioValue) => {
    if (radioValue === 'all') {
      setDisplay('');
    } else {
      setDisplay(radioValue);
    }
  };

  const handleCancelEditMode = () => {
    setMsg((prev) => ({ ...prev, from: '', text: '' }));
    setFromMessageComponent({});
  };

  return (
    <div className='App'>
      <Title />
      {state.isError && (
        <div className='messages-container'>{state.isError}</div>
      )}
      {state.isLoading && <Loading />}
      {!state.isLoading && !state.isError && (
        <Messages
          messages={filteredMessages}
          callData={fetchedData}
          handleEdit={handleEdit}
          handleCancelEditMode={handleCancelEditMode}
        />
      )}
      <CountDown callData={fetchedData} />
      <DisplayStyle
        searchFromApp={searchFromApp}
        changeDisplay={changeDisplay}
      />
      <Input
        callData={fetchedData}
        fromMessageForEdit={fromMessageComponent}
        setFromMessageForEdit={setFromMessageComponent}
        msg={msg}
        setMsg={setMsg}
        handleCancelEditMode={handleCancelEditMode}
      />
    </div>
  );
}

export default App;
