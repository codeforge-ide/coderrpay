'use client';

import {
  Box,
  Typography,
  Avatar,
  TextField,
  IconButton,
  Card,
  Container,
  CardContent
} from '@mui/material';
import {
  Send,
  Image,
} from '@mui/icons-material';
import { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function MessagesPage() {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    // Placeholder for send message logic
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <ProtectedRoute requireAuth>
      <Container maxWidth="xl" sx={{ py: 3, height: 'calc(100vh - 100px)' }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: 'text.primary' }}>
          Messages
        </Typography>

        <Box sx={{ display: 'flex', height: '100%', gap: 3 }}>
          {/* Conversations List */}
          <Card sx={{ width: 320, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                Active Conversations
              </Typography>
              <Typography sx={{ color: 'text.secondary', mt: 2 }}>
                No active conversations.
              </Typography>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                Select a conversation
              </Typography>
            </Box>

            <Box sx={{ flex: 1, p: 2, overflow: 'auto', textAlign: 'center' }}>
              <Typography sx={{ color: 'text.secondary', mt: 4 }}>
                No messages to display.
              </Typography>
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
          </Card>
        </Box>
      </Container>
    </ProtectedRoute>
  );
}