import * as React from 'react';
import { Avatar, Button, Chat, TextArea } from '@fluentui/react-northstar';
import { AcceptIcon } from '@fluentui/react-icons-northstar';
import { Send24Regular } from '@fluentui/react-icons';

import './app.css';

const janeAvatar = {
  name: 'Jane Doe',
  status: { color: 'green', icon: <AcceptIcon />, title: 'Available' },
};

const _chats = [];

const chatContent = () => {
  const [value, setValue] = React.useState('');
  const [chats, setChats] = React.useState([]);
  const [msgId, setMessageId] = React.useState(1);

  const submitMessage = () => {
    setMessageId(msgId + 1);
    const author = 'Jane Doe';
    _chats.push({
      gutter: <Avatar {...janeAvatar} />,
      message: <Chat.Message content={value} author={author} timestamp={new Date().toLocaleTimeString()} />,
      attached: chats[chats.length - 1]?.author === 'Jane Doe' ? true : 'top',
      key: `message-id-${msgId}`,
      author,
    });
    setChats([..._chats]);
    setValue('');
    window.scrollTo(0, document.body.scrollHeight);

    setTimeout(async () => {
      try {
        setMessageId(msgId + 2);
        const data = await (await fetch('https://random-data-api.com/api/lorem_ipsum/random_lorem_ipsum')).json();
        const message = data.long_sentence;
        _chats.push({
          message: <Chat.Message content={message} author="John Doe" timestamp={new Date().toLocaleTimeString()} />,
          attached: chats[chats.length - 1]?.author === 'John Doe' ? true : 'top',
          contentPosition: 'end',
          key: `message-id-${msgId}`,
          author: 'John Doe',
        });
        setChats([..._chats]);
        window.scrollTo(0, document.body.scrollHeight);
      } catch(err) {
        console.error(err.message || err);
      }
    }, 3000);
  };

  const submitMessageEnter = (e: any) => {
    if (e.keyCode === 13 && e.shiftKey === false && e.target.value.length){
      e.preventDefault();
      submitMessage();
    }
  };

  const onChange = (event, val) => {
    setValue(event.target.value);
  };

  const submitMessageClick = (e: any) => {
    e.preventDefault();
    submitMessage();
  };

  return <>
    <Chat items={chats} />
    <TextArea fluid placeholder="Type a new message" value={value} className="chat-box" onKeyDown={submitMessageEnter} onChange={onChange} />
    <Button className="submit-button" onClick={submitMessageClick}>
      <Send24Regular />
    </Button>
  </>;
};

export default chatContent;
