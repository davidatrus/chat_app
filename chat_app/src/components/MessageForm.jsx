import { useState } from 'react';
import { sendMessage, isTyping } from  'react-chat-engine';
import { SendOutlined, PictureOutlined } from '@ant-design/icons';

const MessageForm = (props) =>{
    const[value,setValue] = useState('');
    const {chatId,creds} = props;

    const handleSubmit = (event) =>{
        event.preventDefault();

        const text = value.trim(); //removes excess space from chat being sent

        if(text.length>0) {
            sendMessage(creds,chatId,{text});
            //handle submit hadnling when you type text then click enter or icon, using chat-egines built in send Message feature
    }
    setValue(''); //after submitting value set the message text field back to empty string
        };
    const handleChange = (event) =>{ 
        setValue(event.target.value); //event.target.value is where the input value is stored
        isTyping(props,chatId);
    } 

    const handleUpload = (event) => { //handling upload of files so instead of sending message which is text it will find the file you wish to upload
        sendMessage(creds, chatId, {files: event.target.files, text: ''})
    }

    return(
        <form className = "message-form" onSubmit={handleSubmit}>
            <input
                className= "message-input"
                placeholder= "Send a message.."
                value= {value}
                onChange= {handleChange}
                onSubmit= {handleSubmit}
            />
            <label htmlFor="upload-button">
                    <span>
                        <PictureOutlined className="picture-icon"/>
                    </span>
            </label>
            <input
                type="file"
                multiple= {false}
                id="upload-button"
                style={{display:'none'}}
                onChange={handleUpload}
            />
            <button type="submit" className="send-button">
                <SendOutlined className="send-icon"/>
            </button>
        </form>
    ); //styling for the message form, the upload button is just a picture icon, only allowing uploading one image at a time, also creating a send message button incase they dont want to press enter to send message
    
}

export default MessageForm;