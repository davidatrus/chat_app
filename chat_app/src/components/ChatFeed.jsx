import MessageForm  from './MessageForm';
import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';


const ChatFeed = (props) => {
    const { chats, activeChat, userName, messages } = props;

    const chat = chats && chats[activeChat]; //if chat exists find the active chats 

    //console.log(chat,userName,messages);

    const renderReadReceipts= (message, isMyMessage) =>{
       return  chat.people.map((person,index)=> person.last_read === message.id && (
            <div
                key={`read_${index}`}
                className = "read-receipt"
                style = {{
                    float: isMyMessage? 'right' : 'left',
                    backgroundImage: person.person.avatar && `url(${person.person.avatar})`
                }}      
            />
        )); //see whos read the messages, traverses everyone whos read message then returns thier icon underneath the message
    }

    const renderMessages = () =>{
        const keys = Object.keys(messages); // getting id of specfic messages

        return keys.map((key,index) => {
            const message = messages[key]; // taking that specific key and returning as a message
            const lastMessageKey = index === 0 ? null: keys[index - 1]; //if messages find the last message
            const isMyMessage = userName === message.sender.username; // is this your message 

            return(
                <div key= {`msg_${index}`} style={{width:'100%'}}>
                    <div className = "message-block" >{
                        isMyMessage
                        ? <MyMessage message= {message} /> 
                        : <TheirMessage message = {message} lastMessage= {messages[lastMessageKey]} />
                        }
                        </div>
                        <div className="read-receipts" style={{ marginRight: isMyMessage? '18px' : '0px', marginLeft: isMyMessage? '0px' : '60px'}}>
                            {renderReadReceipts(message, isMyMessage)}
                        </div>
                    </div>
            ); //styling for rendering of messages, if message is your message make message appear from right if not margin to left
        })
    }

    if(!chat) return 'Loading Chats ...'; //just checking if theres a chat 

    return (
        <div className="chat-feed">
         <div className= "chat-title-container">
            <div className = "chat-title">{chat.title} </div> 
            <div className = "chat-subtitle">
                {chat.people.map((person)=> ` ${person.person.username}`)} 
            </div> 
        </div>
          {renderMessages()}
          <div style={{height: '100px'}}/>
          <div className="message-form-container">
              <MessageForm {... props} chatId={activeChat} />
          </div>
        </div>
    ); //scucture of chat feed, 57 getting all users in that chat and displaying them under chat title
}

export default ChatFeed;