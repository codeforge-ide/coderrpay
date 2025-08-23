'use client';

import { 
  Box, 
  List, 
  ListItem, 
  ListItemButton,
  ListItemAvatar, 
  ListItemText, 
  Avatar, 
  Typography, 
  Divider, 
  TextField, 
  IconButton, 
  Paper,
  InputAdornment
} from '@mui/material';
import { Send, AttachFile } from '@mui/icons-material';
import { useState } from 'react';

const mockConversations = [
  {
    id: 1,
    name: 'Sarah Chen',
    lastMessage: 'Thanks for the feedback on the proposal!',
    time: '2m',
    avatar: 'https://i.pravatar.cc/150?img=1',
    unread: true,
  },
  {
    id: 2,
    name: 'Dev Team',
    lastMessage: 'Meeting scheduled for tomorrow at 3 PM',
    time: '1h',
    avatar: 'https://i.pravatar.cc/150?img=2',
    unread: false,
  },
  {
    id: 3,
    name: 'Alex Rodriguez',
    lastMessage: 'Great work on the latest update!',
    time: '3h',
    avatar: 'https://i.pravatar.cc/150?img=3',
    unread: true,
  },
];

const mockMessages = [
  {
    id: 1,
    text: 'Hey! How\'s the project coming along?',
    time: '10:30 AM',
    isOwn: false,
  },
  {
    id: 2,
    text: 'It\'s going well! Just finished the authentication module.',
    time: '10:32 AM',
    isOwn: true,
  },
  {
    id: 3,
    text: 'That\'s awesome! Can you share a demo?',
    time: '10:33 AM',
    isOwn: false,
  },
];

export default function MessagesDrawerContent() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 120px)' }}>
      {/* Conversations List */}
      <Box
        sx={{
          width: 320,
          borderRight: 1,
          borderColor: 'divider',
          overflow: 'auto',
        }}
      >
        <List sx={{ p: 0 }}>
          {mockConversations.map((conversation, index) => (
            <Box key={conversation.id}>
              <ListItem
                disablePadding
                sx={{ '&:hover': { backgroundColor: 'action.hover' } }}
              >
                <ListItemButton
                  selected={selectedConversation.id === conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  sx={{ px: 2, py: 1.5 }}
                >
                  <ListItemAvatar>
                    <Avatar src={conversation.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" fontWeight={conversation.unread ? 600 : 400}>
                        {conversation.name}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: 180,
                          }}
                        >
                          {conversation.lastMessage}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {conversation.time}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItemButton>
              </ListItem>
              {index < mockConversations.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Box>

      {/* Chat Area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Chat Header */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderBottom: 1,
            borderColor: 'divider',
            backgroundColor: 'background.paper',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={selectedConversation.avatar} sx={{ mr: 2 }} />
            <Typography variant="h6" fontWeight={600}>
              {selectedConversation.name}
            </Typography>
          </Box>
        </Paper>

        {/* Messages */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 2, backgroundColor: 'background.default' }}>
          {mockMessages.map((message) => (
            <Box
              key={message.id}
              sx={{
                display: 'flex',
                justifyContent: message.isOwn ? 'flex-end' : 'flex-start',
                mb: 1,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 1.5,
                  maxWidth: '70%',
                  backgroundColor: message.isOwn ? 'primary.main' : 'background.paper',
                  color: message.isOwn ? 'primary.contrastText' : 'text.primary',
                  borderRadius: message.isOwn
                    ? '16px 16px 4px 16px'
                    : '16px 16px 16px 4px',
                }}
              >
                <Typography variant="body2">{message.text}</Typography>
                <Typography variant="caption" sx={{ opacity: 0.7, mt: 0.5, display: 'block' }}>
                  {message.time}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Box>

        {/* Message Input */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderTop: 1,
            borderColor: 'divider',
          }}
        >
          <TextField
            fullWidth
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton size="small">
                    <AttachFile />
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSendMessage} color="primary">
                    <Send />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '24px',
              },
            }}
          />
        </Paper>
      </Box>
    </Box>
  );
}