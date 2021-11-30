const TheirMessage = ({lastMessage,message}) =>{

    const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username; //checks to make sure its not first message by the user and since its not styling for how their message should appear
    return(
        <div className= "message-row">
            {isFirstMessageByUser &&(
                <div
                    className="message-avatar"
                    style = {{backgroundImage:`url(${message?.sender?.avatar})` }}
                /> // if we have first message by user set the background image to the avatar of the message sender

            )}
            {message?.attachments?.length>0
         ? (
            <img 
                src={message.attachments[0].file}
                alt ="message-attachment"
                className= "message-image"
                style= {{marginLeft: isFirstMessageByUser ? '4px': '48px'}}
            />
        ) : (
            <div className = "message" style={{float: 'left', backgroundColor:'#CABCDC',marginLeft: isFirstMessageByUser ? '4px': '48px'}}>
                {message.text}
            </div>
        )
    
            }
        </div> //styling for their message along with checking if message sent was an image
    );
}

export default TheirMessage;