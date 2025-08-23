'use client';

import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  TextField,
  IconButton,
  Paper,
  Divider,
  Container
} from '@mui/material';
import {
  Send,
  Image,
  Message as MessageIcon
} from '@mui/icons-material';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';

// Mock data for conversations
const conversations = [
  {
    id: 1,
    name: 'User A',
    avatar: '/path/to/avatar1.png',
    lastMessage: 'Last message snippet...',
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    name: 'User B',
    avatar: '/path/to/avatar2.png',
    lastMessage: 'Last message snippet...',
    timestamp: '1 day ago'
  },
  {
    id: 3,
    name: 'User C',
    avatar: '/path/to/avatar3.png',
    lastMessage: 'Last message snippet...',
    timestamp: '3 days ago'
  }
];

// Mock data for messages
const mockMessages = [
  {
    id: 1,
    senderId: 1,
    senderName: 'User A',
    avatar: '/path/to/avatar1.png',
    content: "Hello! How's the project going?",
    timestamp: '10:30 AM',
    isOwn: false
  },
  {
    id: 2,
    senderId: 'me',
    senderName: 'Me',
    avatar: '/path/to/my-avatar.png',
    content: "It's progressing well, thanks for asking!",
    timestamp: '10:35 AM',
    isOwn: true
  },
  {
    id: 3,
    senderId: 1,
    senderName: 'User A',
    avatar: '/path/to/avatar1.png',
    content: 'Great to hear! Let me know if you need any help.',
    timestamp: '10:40 AM',
    isOwn: false
  }
];

export default function MessagesPage() {
  const theme = useTheme();
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        senderId: 'me',
        senderName: 'Me',
        avatar: '/path/to/my-avatar.png',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3, height: 'calc(100vh - 100px)' }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Messages
      </Typography>

      <Box sx={{ display: 'flex', height: '100%', gap: 3 }}>
        {/* Conversations List */}
        <Paper sx={{ width: 320, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Active Conversations
            </Typography>
          </Box>
          <Divider />
          <List sx={{ flex: 1, p: 0 }}>
            {conversations.map((conversation) => (
              <ListItem key={conversation.id} disablePadding>
                <ListItemButton
                  selected={selectedConversation.id === conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  sx={{ px: 2, py: 1.5 }}
                >
                  <ListItemAvatar>
                    <Avatar src={conversation.avatar} sx={{ width: 48, height: 48 }}>
                      {conversation.name[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={conversation.name}
                    secondary={conversation.lastMessage}
                    primaryTypographyProps={{
                      fontWeight: 'medium',
                      fontSize: '1rem'
                    }}
                    secondaryTypographyProps={{
                      sx: {
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Chat Area */}
        <Paper sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Chat Header */}
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {selectedConversation.name}
            </Typography>
          </Box>

          {/* Messages */}
          <Box sx={{ flex: 1, p: 2, overflow: 'auto' }}>
            {messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  justifyContent: message.isOwn ? 'flex-end' : 'flex-start',
                  mb: 2,
                  alignItems: 'flex-end',
                  gap: 1
                }}
              >
                {!message.isOwn && (
                  <Avatar src={message.avatar} sx={{ width: 32, height: 32 }}>
                    {message.senderName[0]}
                  </Avatar>
                )}
                <Box
                  sx={{
                    maxWidth: '60%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: message.isOwn ? 'flex-end' : 'flex-start'
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      mb: 0.5,
                      px: 1
                    }}
                  >
                    {message.senderName}
                  </Typography>
                  <Paper
                    sx={{
                      px: 2,
                      py: 1.5,
                      backgroundColor: message.isOwn ? 'primary.main' : theme.palette.mode === 'dark' ? 'grey.800' : 'grey.100',
                      color: message.isOwn ? 'primary.contrastText' : 'text.primary'
                    }}
                  >
                    <Typography variant="body1">
                      {message.content}
                    </Typography>
                  </Paper>
                </Box>
                {message.isOwn && (
                  <Avatar src={message.avatar} sx={{ width: 32, height: 32 }}>
                    {message.senderName[0]}
                  </Avatar>
                )}
              </Box>
            ))}
          </Box>

          {/* Message Input */}
          <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
              <Avatar sx={{ width: 32, height: 32, mb: 1 }}>
                Me
              </Avatar>
              <TextField
                fullWidth
                multiline
                maxRows={4}
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                variant="outlined"
                size="small"
                sx={{ flex: 1 }}
              />
              <IconButton
                color="primary"
                sx={{ mb: 1 }}
              >
                <Image />
              </IconButton>
              <IconButton
                color="primary"
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                sx={{ mb: 1 }}
              >
                <Send />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}