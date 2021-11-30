import {ChatEngine} from 'react-chat-engine';
import LoginForm from './components/LoginForm'
import ChatFeed from './components/ChatFeed';
import './App.css';

const App = () => {
    if(!localStorage.getItem('username')) return <LoginForm/> //if person isnt logged in send them to login form

    return(
        <ChatEngine
            height = "100vh"
            projectID="9665a4ff-ca24-45a7-bb18-662fc576d617"
            userName={localStorage.getItem('username')}
            userSecret={localStorage.getItem('password')}
            renderChatFeed={(chatAppProps) => <ChatFeed {... chatAppProps} />} //code to add Chat Engine to application
        />
    );
}

export default App;