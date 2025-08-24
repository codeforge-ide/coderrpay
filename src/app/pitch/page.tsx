'use client';

import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper,
  IconButton,
  useTheme,
  Fade,
  Chip,
  Stack
} from '@mui/material';
import { 
  ArrowBack, 
  ArrowForward, 
  GitHub, 
  AccountBalanceWallet,
  Code,
  MonetizationOn,
  RocketLaunch,
  Business,
  Security,
  Speed
} from '@mui/icons-material';

const slides = [
  {
    title: "Coderrpay",
    subtitle: "Connect your GitHub and get paid in crypto",
    content: "The future of developer monetization is here",
    bgGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    icon: RocketLaunch
  },
  {
    title: "The Problem",
    subtitle: "Developers struggle to monetize their skills",
    content: "Traditional payment systems are slow, expensive, and exclude global talent",
    points: [
      "🏦 Bank transfers take days",
      "💸 High fees eat into earnings", 
      "🌍 Geographic payment barriers",
      "📋 Complex invoicing processes"
    ],
    bgGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    icon: Code
  },
  {
    title: "Our Solution",
    subtitle: "Seamless crypto payments for developers",
    content: "Connect GitHub, showcase skills, get paid instantly in cryptocurrency",
    points: [
      "⚡ Instant global payments",
      "🔐 Blockchain security",
      "💰 Low transaction fees",
      "🎯 Merit-based matching"
    ],
    bgGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    icon: AccountBalanceWallet
  },
  {
    title: "Key Features",
    subtitle: "Everything you need in one platform",
    content: "From discovery to payment, we've got you covered",
    features: [
      { icon: GitHub, text: "GitHub Integration", desc: "Automatic skill verification" },
      { icon: MonetizationOn, text: "Crypto Payments", desc: "Instant global transactions" },
      { icon: Business, text: "Project Matching", desc: "AI-powered opportunities" },
      { icon: Security, text: "Secure Escrow", desc: "Protected transactions" }
    ],
    bgGradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    icon: Speed
  },
  {
    title: "Market Opportunity",
    subtitle: "A massive and growing market",
    content: "The freelance economy is exploding globally",
    stats: [
      { number: "50M+", label: "Global Developers" },
      { number: "$400B", label: "Freelance Market" },
      { number: "73%", label: "Want Crypto Payments" },
      { number: "2025", label: "Web3 Adoption Year" }
    ],
    bgGradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    icon: RocketLaunch
  },
  {
    title: "Get Started Today",
    subtitle: "Join the future of developer payments",
    content: "Ready to transform how you get paid for your code?",
    cta: true,
    bgGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    icon: RocketLaunch
  }
];

export default function PitchPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const theme = useTheme();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: currentSlideData.bgGradient,
        display: 'flex',
        flexDirection: 'column',
        transition: 'background 0.5s ease-in-out',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Navigation */}
      <Box sx={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
        <Button 
          variant="outlined" 
          href="/" 
          sx={{ 
            color: 'white', 
            borderColor: 'rgba(255,255,255,0.3)',
            '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' }
          }}
        >
          ← Back to App
        </Button>
      </Box>

      {/* Slide Counter */}
      <Box sx={{ position: 'absolute', top: 20, right: 20, zIndex: 10 }}>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
          {currentSlide + 1} / {slides.length}
        </Typography>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ flex: 1, display: 'flex', alignItems: 'center', py: 4 }}>
        <Fade in={true} timeout={500} key={currentSlide}>
          <Box sx={{ width: '100%', textAlign: 'center', color: 'white' }}>
            {/* Icon */}
            <currentSlideData.icon sx={{ fontSize: 80, mb: 3, opacity: 0.9 }} />
            
            {/* Title */}
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: '3rem', md: '4rem' }, 
                fontWeight: 800, 
                mb: 2,
                textShadow: '0 2px 10px rgba(0,0,0,0.3)'
              }}
            >
              {currentSlideData.title}
            </Typography>

            {/* Subtitle */}
            <Typography 
              variant="h4" 
              sx={{ 
                fontSize: { xs: '1.5rem', md: '2rem' }, 
                fontWeight: 400, 
                mb: 4, 
                opacity: 0.9,
                textShadow: '0 1px 5px rgba(0,0,0,0.3)'
              }}
            >
              {currentSlideData.subtitle}
            </Typography>

            {/* Content */}
            <Typography 
              variant="h6" 
              sx={{ 
                fontSize: { xs: '1rem', md: '1.25rem' }, 
                mb: 4, 
                opacity: 0.8,
                maxWidth: '800px',
                mx: 'auto'
              }}
            >
              {currentSlideData.content}
            </Typography>

            {/* Points */}
            {currentSlideData.points && (
              <Stack spacing={2} sx={{ maxWidth: '600px', mx: 'auto', mb: 4 }}>
                {currentSlideData.points.map((point, index) => (
                  <Paper
                    key={index}
                    sx={{
                      p: 2,
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 2,
                      textAlign: 'left'
                    }}
                  >
                    <Typography variant="body1" sx={{ color: 'white', fontWeight: 500 }}>
                      {point}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            )}

            {/* Features */}
            {currentSlideData.features && (
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, maxWidth: '800px', mx: 'auto', mb: 4 }}>
                {currentSlideData.features.map((feature, index) => (
                  <Paper
                    key={index}
                    sx={{
                      p: 3,
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 3,
                      textAlign: 'center'
                    }}
                  >
                    <feature.icon sx={{ fontSize: 40, mb: 2, color: 'white' }} />
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                      {feature.text}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                      {feature.desc}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            )}

            {/* Stats */}
            {currentSlideData.stats && (
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 3, maxWidth: '800px', mx: 'auto', mb: 4 }}>
                {currentSlideData.stats.map((stat, index) => (
                  <Box key={index} sx={{ textAlign: 'center' }}>
                    <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 800, color: 'white', mb: 1 }}>
                      {stat.number}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}

            {/* CTA */}
            {currentSlideData.cta && (
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center" sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  href="/"
                  sx={{
                    py: 2,
                    px: 4,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    backgroundColor: 'white',
                    color: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Launch App
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  href="/feed"
                  sx={{
                    py: 2,
                    px: 4,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Explore Feed
                </Button>
              </Stack>
            )}
          </Box>
        </Fade>
      </Container>

      {/* Navigation Controls */}
      <Box sx={{ 
        position: 'absolute', 
        bottom: 30, 
        left: '50%', 
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        zIndex: 10
      }}>
        <IconButton 
          onClick={prevSlide}
          sx={{ 
            color: 'white', 
            backgroundColor: 'rgba(255,255,255,0.1)',
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
          }}
        >
          <ArrowBack />
        </IconButton>

        {/* Slide Indicators */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          {slides.map((_, index) => (
            <Box
              key={index}
              onClick={() => goToSlide(index)}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.7)' }
              }}
            />
          ))}
        </Box>

        <IconButton 
          onClick={nextSlide}
          sx={{ 
            color: 'white', 
            backgroundColor: 'rgba(255,255,255,0.1)',
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
          }}
        >
          <ArrowForward />
        </IconButton>
      </Box>

      {/* Keyboard Navigation */}
      <Box
        sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') prevSlide();
          if (e.key === 'ArrowRight') nextSlide();
        }}
        tabIndex={0}
      />
    </Box>
  );
}