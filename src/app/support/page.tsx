'use client';

import { useState } from 'react';
import {
  Container,
  Toolbar,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Button,
  Grid,
  Chip,
  IconButton,
} from '@mui/material';
import {
  GitHub,
  Twitter,
  Language,
  ContentCopy,
  MonetizationOn,
} from '@mui/icons-material';
import { SupportModal, useTurnkey } from '@/integrations/turnkey';
import { formatAddress } from '@/integrations/turnkey/lib/stacks';

// Mock developer data
const DEVELOPERS = [
  {
    id: '1',
    name: 'Sarah Chen',
    username: '@sarahdev',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'Full-stack developer passionate about Web3 and decentralization. Building the future of open source.',
    stacksAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    github: 'sarahdev',
    twitter: 'sarahdev',
    website: 'https://sarahchen.dev',
    projects: ['DeFi Protocol', 'NFT Marketplace', 'DAO Governance'],
    contributions: 250,
    supporters: 42,
  },
  {
    id: '2',
    name: 'Alex Kumar',
    username: '@alexk',
    avatar: 'https://i.pravatar.cc/150?img=2',
    bio: 'Security researcher and blockchain developer. Contributor to major open source projects.',
    stacksAddress: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
    github: 'alexkumar',
    twitter: 'alexk_dev',
    projects: ['Smart Contract Auditor', 'Security Tools', 'Blockchain SDK'],
    contributions: 180,
    supporters: 35,
  },
  {
    id: '3',
    name: 'Jordan Lee',
    username: '@jordanl',
    avatar: 'https://i.pravatar.cc/150?img=3',
    bio: 'UI/UX designer and frontend developer. Creating beautiful and accessible Web3 experiences.',
    stacksAddress: 'ST39MJ145BR6S8C315AG2BD61SJ16E208P1FDK3AK',
    github: 'jordanlee',
    projects: ['Design System', 'dApp UI Kit', 'Web3 Components'],
    contributions: 320,
    supporters: 58,
  },
];

interface DeveloperCardProps {
  developer: typeof DEVELOPERS[0];
  onSupport: () => void;
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({ developer, onSupport }) => {
  const { wallet } = useTurnkey();
  
  const handleCopy = () => {
    navigator.clipboard.writeText(developer.stacksAddress);
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'start', mb: 2 }}>
          <Avatar
            src={developer.avatar}
            sx={{ width: 64, height: 64, mr: 2 }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {developer.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {developer.username}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              {developer.github && (
                <IconButton
                  size="small"
                  href={`https://github.com/${developer.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHub fontSize="small" />
                </IconButton>
              )}
              {developer.twitter && (
                <IconButton
                  size="small"
                  href={`https://twitter.com/${developer.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter fontSize="small" />
                </IconButton>
              )}
              {developer.website && (
                <IconButton
                  size="small"
                  href={developer.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Language fontSize="small" />
                </IconButton>
              )}
            </Box>
          </Box>
        </Box>

        <Typography variant="body2" sx={{ mb: 2 }}>
          {developer.bio}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
            Stacks Address:
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'monospace',
                flex: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {formatAddress(developer.stacksAddress, 10)}
            </Typography>
            <IconButton size="small" onClick={handleCopy}>
              <ContentCopy fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          {developer.projects.slice(0, 3).map((project) => (
            <Chip key={project} label={project} size="small" variant="outlined" />
          ))}
        </Box>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          mb: 2,
          p: 1.5,
          bgcolor: 'action.hover',
          borderRadius: 1
        }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {developer.contributions}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Contributions
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {developer.supporters}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Supporters
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          fullWidth
          startIcon={<MonetizationOn />}
          onClick={onSupport}
          disabled={!wallet}
        >
          Support with sBTC
        </Button>
        {!wallet && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
            Create a wallet to support this developer
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default function SupportPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDeveloper, setSelectedDeveloper] = useState<typeof DEVELOPERS[0] | null>(null);

  const handleSupport = (developer: typeof DEVELOPERS[0]) => {
    setSelectedDeveloper(developer);
    setModalOpen(true);
  };

  return (
    <Container maxWidth="lg">
      <Toolbar />

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontSize: '2.5rem',
            fontWeight: 700,
            color: 'text.primary',
            letterSpacing: '-0.02em',
            mb: 1,
          }}
        >
          Support Developers
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover amazing developers and support their work with sBTC micropayments
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {DEVELOPERS.map((developer) => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={developer.id}>
            <DeveloperCard
              developer={developer}
              onSupport={() => handleSupport(developer)}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ 
        mt: 6, 
        p: 4, 
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        borderRadius: 2,
        textAlign: 'center'
      }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
          Are you a developer?
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
          Join CoderrPay to receive support from the community
        </Typography>
        <Button variant="contained" color="inherit" size="large">
          Get Started
        </Button>
      </Box>

      {selectedDeveloper && (
        <SupportModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          recipientName={selectedDeveloper.name}
          recipientAddress={selectedDeveloper.stacksAddress}
          recipientAvatar={selectedDeveloper.avatar}
        />
      )}
    </Container>
  );
}
