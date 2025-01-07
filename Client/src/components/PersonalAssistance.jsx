import React, { useState, useRef, useEffect } from 'react';
import { TextField, Typography, Box, IconButton } from '@mui/material';
import { ChatBubbleOutline, Send, Close, CookieSharp } from '@mui/icons-material';
import Draggable from 'react-draggable';
import Cookies from 'js-cookie'
const PersonalAssistant = ({ update, setUpdate }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [open, setOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);
    const draggableRef = useRef(null);

    // Generate or retrieve session ID
    useEffect(() => {
        if (!localStorage.getItem("sessionId")) {
            localStorage.setItem("sessionId", Date.now().toString());
        }
    }, []);

    // Auto-scroll to the latest message
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleClick = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Send message to the backend
    const handleSendMessage = async () => {
        if (input.trim()) {
            const userMessage = { text: input, sender: 'user' };
            setMessages((prev) => [...prev, userMessage]);
            setInput('');
            setIsTyping(true);

            try {
                const token = Cookies.get('token');
                const response = await fetch('http://localhost:5000/generate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        prompt: input,
                        sessionId: localStorage.getItem("sessionId")
                    })
                });
                const data = await response.json();
                console.log(data);
                const user = JSON.parse(localStorage.getItem("user"));
                user.credit = data.credit;
                localStorage.setItem('user', JSON.stringify(user));
                setUpdate(!update);
                setIsTyping(false);
                const assistantMessage = { text: data.response, sender: 'assistant' };
                setMessages((prev) => [...prev, assistantMessage]);
            } catch (error) {
                console.error("Error:", error);
                setIsTyping(false);
                setMessages((prev) => [...prev, { text: "Error generating response", sender: 'assistant' }]);
            }
        }
    };

    return (
        <div>
            <IconButton
                onClick={handleClick}
                sx={{ position: 'fixed', bottom: 20, right: 20, bgcolor: 'primary.main', color: 'white', zIndex: 1001 }}
            >
                <ChatBubbleOutline />
            </IconButton>

            {open && (
                <Draggable nodeRef={draggableRef} handle=".drag-handle" bounds="body">
                    <Box
                        ref={draggableRef}
                        sx={{
                            position: 'fixed',
                            bottom: 100,
                            right: 20,
                            width: 350,
                            height: 500,
                            bgcolor: 'white',
                            borderRadius: '10px',
                            boxShadow: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            overflow: 'hidden',
                            zIndex: 1002
                        }}
                    >
                        {/* Header */}
                        <Box
                            className="drag-handle"
                            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'move', p: 2, bgcolor: 'primary.main', color: 'white' }}
                        >
                            <Typography variant="h6">👋 FitMentor Assistant</Typography>
                            <IconButton onClick={handleClose} sx={{ color: 'white' }}>
                                <Close />
                            </IconButton>
                        </Box>

                        {/* Messages Section */}
                        <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: '10px' }}>
                            {messages.map((msg, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                                        justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                        bgcolor: msg.sender === 'user' ? '#DCF8C6' : '#ECE5DD',
                                        borderRadius: '10px',
                                        padding: '8px 12px',
                                        mb: 1,
                                        maxWidth: '80%',
                                    }}
                                >
                                    <Typography>{msg.text}</Typography>
                                </Box>
                            ))}
                            {isTyping && (
                                <Typography sx={{ fontStyle: 'italic', color: 'grey.500', textAlign: 'center' }}>
                                    Assistant is typing...
                                </Typography>
                            )}
                            <div ref={chatEndRef}></div>
                        </Box>

                        {/* Input Section */}
                        <Box sx={{ display: 'flex', gap: 1, p: 2 }}>
                            <TextField
                                fullWidth
                                size="small"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type a message..."
                                multiline
                                minRows={1}
                                maxRows={4}
                            />
                            <IconButton onClick={handleSendMessage} color="primary" disabled={isTyping}>
                                <Send />
                            </IconButton>
                        </Box>
                    </Box>
                </Draggable>
            )}
        </div>
    );
};

export default PersonalAssistant;
