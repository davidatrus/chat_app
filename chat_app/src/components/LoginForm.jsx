import { useState } from 'react';
import axios from 'axios';
const LoginForm = () => {
    const [ username, setUsername] = useState('');
    const [ password, setPassword] = useState('');
    const [error, setError] = useState('');

    //this handle submit is handling logging in, user gives username & password talks to chatengine to give the messages, if messages given means logged in if not give an error saying "try with new creditinals"
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const authObject = { 'Project-ID': "9665a4ff-ca24-45a7-bb18-662fc576d617", 'User-Name': username,'User-Secret': password}

        try{
         await axios.get('https://api.chatengine.io/chats', {headers: authObject});

         localStorage.setItem('username',username); //saving user and password on local storage so we dont have to log in again each time 
         localStorage.setItem('password',password);

            window.location.reload();
        } catch(error){
            setError('Invalid credentials, try again') //error message 
        } 

    }

    return(
        <div className="wrapper">
            <div className = "form">
                <h1 className="title">Chat Application</h1>
                <form onSubmit={handleSubmit}>
                    <input type= "text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />
                    <input type= "password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
                    <div align="center">
                        <button type= "submit" className="button">
                            <span> Start Chat</span>
                        </button>
                    </div>
                    <h2 className= "error">{error}</h2>
                </form>
            </div>
        </div>
    ); //styling for login form, input for user and password
}
export default LoginForm;