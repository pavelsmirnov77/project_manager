import MenuBar from '../components/MenuBar';
import ChatItem from "../components/ChatItem";

const ChatPage = () => {
    return (
        <div>
            <MenuBar/>
            <div
                style={{
                    position: "absolute",
                    top: "120px",
                    left: "50%",
                    transform: "translateX(-50%)",
                }}
            >
                <ChatItem/>
            </div>
        </div>
    )
};

export default ChatPage;