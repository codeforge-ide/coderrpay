'use client';

import React, { useState } from 'react';
import { Box, Container, Typography, Button, Tab, Tabs, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Search, Code, Home, AccountBalanceWallet, CurrencyExchange } from '@mui/icons-material';

const DarkContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#171411',
  minHeight: '100vh',
  color: 'white',
  fontFamily: 'Manrope, "Noto Sans", sans-serif',
}));

const Sidebar = styled(Box)(({ theme }) => ({
  backgroundColor: '#171411',
  width: '320px',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
}));

const NavItem = styled(Box)<{ active?: boolean }>(({ theme, active }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '8px 12px',
  borderRadius: '8px',
  backgroundColor: active ? '#382f29' : 'transparent',
  color: 'white',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: active ? '#382f29' : 'rgba(56, 47, 41, 0.5)',
  },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: '1px solid #52463d',
  '& .MuiTabs-indicator': {
    backgroundColor: 'white',
    height: '3px',
  },
  '& .MuiTab-root': {
    color: '#b7a99e',
    fontWeight: 'bold',
    fontSize: '14px',
    textTransform: 'none',
    '&.Mui-selected': {
      color: 'white',
    },
  },
}));

const EmptyStateCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'transparent',
  boxShadow: 'none',
  border: 'none',
}));

const EmptyStateImage = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '360px',
  aspectRatio: '16/9',
  borderRadius: '8px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}));

const BrowseButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#382f29',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '14px',
  textTransform: 'none',
  padding: '8px 16px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: '#4a3d35',
  },
}));

export default function GrantsPage() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <DarkContainer>
      <Box display="flex" height="100vh">
        {/* Sidebar */}
        <Sidebar>
          <Box display="flex" alignItems="center" gap="12px" mb={2}>
            <Box
              width="40px"
              height="40px"
              borderRadius="50%"
              sx={{
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDZVsK91VUcPGBXUXIpjsKCWm1pBEgEdVsExirRjRprTX3jx_-3-Z0gwVDXXceEVpGnZXfeL9NuJk8TVSJNoNurYkKmFnIQ45wwzU0jwnb81n6Jg8jJfopPIW8R1Ffz95f79bH_pEhItT9MnolDeY03RQKIxvPSIvrDkMEyCfI6OBjZoIXVvpNogc-OH3AyQG3tpKUmY6R2KFZy4u2FGuDBARntMyg9pIKIUFGvzfxIcUrV_urxHBhpue6shao_GgUTcD3EQS1ZCxU")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <Typography variant="h6" fontWeight="medium">
              CoderPay
            </Typography>
          </Box>

          <Box display="flex" flexDirection="column" gap="8px">
            <NavItem>
              <Home />
              <Typography variant="body2" fontWeight="medium">
                Home
              </Typography>
            </NavItem>
            <NavItem>
              <Search />
              <Typography variant="body2" fontWeight="medium">
                Explore
              </Typography>
            </NavItem>
            <NavItem active>
              <CurrencyExchange />
              <Typography variant="body2" fontWeight="medium">
                My Grants
              </Typography>
            </NavItem>
            <NavItem>
              <Code />
              <Typography variant="body2" fontWeight="medium">
                Hackathons
              </Typography>
            </NavItem>
            <NavItem>
              <AccountBalanceWallet />
              <Typography variant="body2" fontWeight="medium">
                Web3
              </Typography>
            </NavItem>
          </Box>
        </Sidebar>

        {/* Main Content */}
        <Box flex={1} maxWidth="960px">
          {/* Header */}
          <Box p={4} pb={3}>
            <Typography
              variant="h3"
              fontWeight="bold"
              fontSize="32px"
              lineHeight="tight"
              mb={1}
            >
              My Grants
            </Typography>
            <Typography
              variant="body2"
              color="#b7a99e"
              fontSize="14px"
            >
              Manage your grant applications and funding
            </Typography>
          </Box>

          {/* Tabs */}
          <Box px={4} pb={3}>
            <StyledTabs value={activeTab} onChange={handleTabChange}>
              <Tab label="Applications" />
              <Tab label="Funding Opportunities" />
              <Tab label="Received Funds" />
            </StyledTabs>
          </Box>

          {/* Active Applications Section */}
          <Box px={4} py={2}>
            <Typography
              variant="h6"
              fontWeight="bold"
              fontSize="18px"
              mb={2}
            >
              Active Applications
            </Typography>
            
            <Box py={6}>
              <Box display="flex" flexDirection="column" alignItems="center" gap={6}>
                <EmptyStateImage
                  sx={{
                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD4ddciIYxJbrNIf5ymRmMaBRat3MWh1bVZ2VwLvT_6RMowFR97x9N4HcGd2wT4u-xU7V1SAFmYN8R2NzU7Qtj_9QEsrEvrVBKinXNqZKwLFukvHZmynN4Jt3TJ549vwL1woBxINZsoe7A_ChWemv70yRfUkqgqBrTSQ-dRx1hOp8fuDn7utyGDFgHaawXN08GjzQUC7zVk1IzHmDi-Q_see3oG8Dg7CccMDLforntaigpVardWAXP7pQKl2PNgjPxb346KLxg-uUU")',
                  }}
                />
                <Box maxWidth="480px" textAlign="center">
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    fontSize="18px"
                    mb={1}
                  >
                    No active applications
                  </Typography>
                  <Typography
                    variant="body2"
                    fontSize="14px"
                    mb={3}
                  >
                    You haven't submitted any grant applications yet. Browse funding opportunities to get started.
                  </Typography>
                  <BrowseButton>
                    Browse Opportunities
                  </BrowseButton>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Past Applications Section */}
          <Box px={4} py={2}>
            <Typography
              variant="h6"
              fontWeight="bold"
              fontSize="18px"
              mb={2}
            >
              Past Applications
            </Typography>
            
            <Box py={6}>
              <Box display="flex" flexDirection="column" alignItems="center" gap={6}>
                <EmptyStateImage
                  sx={{
                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBy2YeywRe6rI_HzSU5nsOEYUjPkU9lEyBYJrI7nR__CYBCC79vbPLiaoMpURCZo7Q2RbtnOtlbiF8RQh6vownRMV4vbMyQTa57rMdiWvFBclRVBVx10svS2yL_JwtMH9FdVS7OV-tjJqbf3_YA_J8wkBB0-fpVarn6cmtXsPpr0_AytpSfmjFvkX5dws7cKiGjwTMKtcYMAeINGaqvLY1s5JW4pMKXExq2o4XgGkxnr4CgGUb1EcKxczajoq7QIV7G2TYz4FTxD1g")',
                  }}
                />
                <Box maxWidth="480px" textAlign="center">
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    fontSize="18px"
                    mb={1}
                  >
                    No past applications
                  </Typography>
                  <Typography
                    variant="body2"
                    fontSize="14px"
                    mb={3}
                  >
                    You haven't submitted any grant applications yet. Browse funding opportunities to get started.
                  </Typography>
                  <BrowseButton>
                    Browse Opportunities
                  </BrowseButton>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </DarkContainer>
  );
}