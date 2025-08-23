'use client';

import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  Chip,
  Avatar,
  IconButton,
  Divider
} from '@mui/material';
import { 
  AccountBalanceWallet, 
  TrendingUp, 
  Send, 
  GetApp, 
  MoreVert 
} from '@mui/icons-material';

const mockTransactions = [
  { id: 1, type: 'Received', amount: '+$250.00', from: 'GitHub Bounty', date: '2 hours ago', status: 'completed' },
  { id: 2, type: 'Sent', amount: '-$50.00', from: 'Team Payment', date: '1 day ago', status: 'completed' },
  { id: 3, type: 'Received', amount: '+$1,200.00', from: 'Project Milestone', date: '3 days ago', status: 'completed' },
  { id: 4, type: 'Pending', amount: '+$500.00', from: 'Hackathon Prize', date: '5 days ago', status: 'pending' },
];

export default function WalletDrawerContent() {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      {/* Balance Card */}
      <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <CardContent sx={{ color: 'white', textAlign: 'center', py: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <AccountBalanceWallet sx={{ fontSize: 32, mr: 1 }} />
            <Typography variant="h6">CoderPay Wallet</Typography>
          </Box>
          
          <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
            $2,847.50
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
            <Typography variant="body2">+$250 this week</Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<Send />}
          fullWidth
          size="large"
        >
          Send
        </Button>
        <Button
          variant="outlined"
          startIcon={<GetApp />}
          fullWidth
          size="large"
        >
          Withdraw
        </Button>
      </Box>

      {/* Recent Transactions */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Transactions
          </Typography>
          
          <List sx={{ p: 0 }}>
            {mockTransactions.map((transaction, index) => (
              <Box key={transaction.id}>
                <ListItem
                  sx={{
                    px: 0,
                    py: 2,
                  }}
                  secondaryAction={
                    <IconButton>
                      <MoreVert />
                    </IconButton>
                  }
                >
                  <Avatar
                    sx={{
                      mr: 2,
                      bgcolor: transaction.type === 'Received' ? 'success.light' : 
                               transaction.type === 'Sent' ? 'error.light' : 'warning.light',
                    }}
                  >
                    {transaction.type === 'Received' ? '+' : transaction.type === 'Sent' ? '-' : '?'}
                  </Avatar>
                  
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1" fontWeight={500}>
                          {transaction.from}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          color={
                            transaction.type === 'Received' ? 'success.main' :
                            transaction.type === 'Sent' ? 'error.main' : 'warning.main'
                          }
                        >
                          {transaction.amount}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                        <Typography variant="body2" color="text.secondary">
                          {transaction.date}
                        </Typography>
                        <Chip
                          label={transaction.status}
                          size="small"
                          color={transaction.status === 'completed' ? 'success' : 'warning'}
                          variant="outlined"
                        />
                      </Box>
                    }
                  />
                </ListItem>
                {index < mockTransactions.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}