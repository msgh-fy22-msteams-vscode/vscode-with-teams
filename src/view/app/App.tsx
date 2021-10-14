import * as React from 'react';
import { Avatar, Button, Chat,Flex, FlexItem, TextArea } from '@fluentui/react-northstar';
import { AcceptIcon } from '@fluentui/react-icons-northstar';
import { Send24Regular } from '@fluentui/react-icons';

import './app.css';

const janeAvatar = {
  name: 'Jane Doe',
  status: { color: 'green', icon: <AcceptIcon />, title: 'Available' },
};

// const items: ShorthandCollection<ChatItemProps> = [
//   {
//     message: <Chat.Message content="Hello" author="John Doe" timestamp="Yesterday, 10:15 PM" mine />,
//     contentPosition: 'end',
//     attached: 'top',
//     key: 'message-id-1',
//   },
//   {
//     message: <Chat.Message content="I'm back!" author="John Doe" timestamp="Yesterday, 10:15 PM" mine />,
//     contentPosition: 'end',
//     attached: true,
//     key: 'message-id-2',
//   },
//   {
//     message: (
//       <Chat.Message
//         content={{
//           content: (
//             <div>
//               What do you think about <a href="#">www.goodFood.com</a>?
//             </div>
//           ),
//         }}
//         author="John Doe"
//         timestamp="Yesterday, 10:15 PM"
//         mine
//       />
//     ),
//     contentPosition: 'end',
//     attached: 'bottom',
//     key: 'message-id-3',
//   },
//   {
//     gutter: <Avatar {...janeAvatar} />,
//     message: <Chat.Message content="Hi" author="Jane Doe" timestamp="Yesterday, 10:15 PM" />,
//     attached: 'top',
//     key: 'message-id-4',
//   },
//   {
//     gutter: <Avatar {...janeAvatar} />,
//     message: <Chat.Message content="Looks good!" author="Jane Doe" timestamp="Yesterday, 10:15 PM" />,
//     attached: true,
//     key: 'message-id-5',
//   },
//   {
//     gutter: <Avatar {...janeAvatar} />,
//     message: (
//       <Chat.Message
//         content={
//           <div>
//             I also like <a href="#">www.goodFood2.com</a>.
//           </div>
//         }
//         author="Jane Doe"
//         timestamp="Yesterday, 10:15 PM"
//       />
//     ),
//     attached: 'bottom',
//     key: 'message-id-6',
//   },
//   {
//     message: (
//       <Chat.Message
//         content="Would you like to grab lunch there?"
//         author="John Doe"
//         timestamp="Yesterday, 10:16 PM"
//         mine
//       />
//     ),
//     contentPosition: 'end',
//     key: 'message-id-7',
//   },
//   {
//     gutter: <Avatar {...janeAvatar} />,
//     message: <Chat.Message content="Sure! Let's try it." author="Jane Doe" timestamp="Yesterday, 10:15 PM" />,
//     key: 'message-id-8',
//   },
//   {
//     children: <Divider content="Today" color="brand" important />,
//     key: 'message-id-9',
//   },
//   {
//     message: <Chat.Message content="Ok, let's go." author="John Doe" timestamp="Today, 11:15 PM" mine />,
//     contentPosition: 'end',
//     key: 'message-id-10',
//   },
// ];

const _chats = [];

const chatContent = () => {
  const [value, setValue] = React.useState('');
  const [chats, setChats] = React.useState([]);
  const [msgId, setMessageId] = React.useState(1);

  const submitMessage = (e: any) => {
    if (e.keyCode === 13 && e.shiftKey === false){
      e.preventDefault();
      setMessageId(msgId + 1);
      const author = 'Jane Doe';
      _chats.push({
        gutter: <Avatar {...janeAvatar} />,
        message: <Chat.Message content={e.target.value} author={author} timestamp={new Date().toLocaleTimeString()} />,
        attached: chats[chats.length - 1]?.author === 'Jane Doe' ? true : 'top',
        key: `message-id-${msgId}`,
        author,
      });
      setChats([..._chats]);
      setValue('');

      setTimeout(async () => {
        try {
          setMessageId(msgId + 1);
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
        } catch(err) {
          console.error(err.message || err);
        }
      }, 3000);
    }
  };

  const onChange = (event, val) => {
    setValue(event.target.value);
  };

  return <>
    <Chat items={chats} />
    <TextArea fluid placeholder="Type here..." value={value} className="chat-box" onKeyDown={submitMessage} onChange={onChange} />
    <Flex gap="gap.small">
      <FlexItem push>
        <Button className="submit-button">
          <Send24Regular />
        </Button>
      </FlexItem>
    </Flex>
  </>;
};

export default chatContent;
