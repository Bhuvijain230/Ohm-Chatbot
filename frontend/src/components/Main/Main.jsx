import { useState, useRef, useEffect } from "react"
import "./Main.css"
// import { assets } from "../../assets/assets"
import {assets} from '../../assets/assets.js'
import BreathingModel from "../BreathingModel/BreathingModel"
import { ActivityIcon as Exercise, MessageSquare, BookOpen, Apple, CoffeeIcon, Coffee } from "lucide-react"

const Main = () => {
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState([])
  const [showModal, setShowModal] = useState(false)
  const chatContainerRef = useRef(null)

  const handleModalShow = () => setShowModal(true)
  const handleModalHide = () => setShowModal(false)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatHistory])

  const handleSubmit = async () => {
    if (!message.trim()) return

    const newUserMessage = { type: "user", content: message, id: Date.now() }
    setChatHistory((prev) => [newUserMessage, ...prev])

    try {
      const botResponse = "This is the bot response based on your message."
      const newBotMessage = { type: "bot", content: botResponse, id: Date.now() + 1 }

      setTimeout(() => {
        setChatHistory((prev) => [newBotMessage, ...prev])
      }, 500)
    } catch (error) {
      console.error("Error:", error)
      const errorMessage = { type: "bot", content: "Sorry, I encountered an error.", id: Date.now() + 1 }
      setChatHistory((prev) => [errorMessage, ...prev])
    }

    setMessage("")
  }

  return (
    <div className="Main">
      <div className="nav">
        <p>Ohm</p>
        <div className="icon-container flex space-x-4">
          <Exercise onClick={handleModalShow} className="w-6 h-6 cursor-pointer" />
          <MessageSquare className="w-6 h-6 cursor-pointer" />
          <BookOpen className="w-6 h-6 cursor-pointer" />
          <Apple className="w-6 h-6 cursor-pointer" />
        </div>
        <img src={assets.coffeeIcon || "/placeholder.svg"} alt="" className="ml-auto" />
      </div>
      <div className="main-container">
        {chatHistory.length === 0 && (
          <div className="greet">
            <p>
              <span>Hello!</span>
            </p>
            <p>Let's know each other</p>
          </div>
        )}

        {/* <div
          ref={chatContainerRef}
          className="chat-history flex flex-col-reverse flex-1 overflow-y-auto p-4 space-y-reverse space-y-8"
        > */}
        <div
  ref={chatContainerRef}
  className="chat-history flex flex-col overflow-y-auto p-4 space-y-4 max-h-[80vh]"
>
          {chatHistory.map((chat) => (
            <div
              key={chat.id}
              className={`flex items-start space-x-4 ${
                chat.type === "user" ? "justify-end" : "justify-start"
              } animate-fade-in`}
            >
              {chat.type === "bot" && (
                <div className="w-18 h-18 rounded-full style  flex items-center justify-center "
                >
                  <img src={assets.ohm} alt="Bot Icon" className="w-18 h-18" />
                </div>
              )}
              <div
                className={`max-w-[70%] p-4 rounded-lg bg-white shadow-md ${
                  chat.type === "user" ? "order-1" : "order-2"
                }`}
              >
                {chat.content}
              </div>
              {chat.type === "user" && (
                <div className="w-18 h-18 rounded-full flex items-center justify-center text-white">
                <img src={assets.fluffy} alt="Bot Icon" className="w-18 h-18" />
                </div>
              )}
            </div>
          ))}
        </div>

        <BreathingModel show={showModal} onHide={handleModalHide} />

        <div className="Main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter prompt here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit()
                }
              }}
            />
            <div>
              <img src={assets.doc || "/placeholder.svg"} alt="" />
              <img src={assets.mic || "/placeholder.svg"} alt="" />
              <img src={assets.arrow || "/placeholder.svg"} alt="Send" onClick={handleSubmit} />
            </div>
          </div>
          <p className="bottom-info">Always Double check your responses!</p>
        </div>
      </div>
    </div>
  )
}

export default Main

