import React from 'react';
import { Box, Typography, Card, CardContent, Button, Avatar, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import InspectionIcon from '@mui/icons-material/Assignment';
import ConsumptionIcon from '@mui/icons-material/LocalFireDepartment';
import MutualAidIcon from '@mui/icons-material/ShareLocation';
import BillIcon from '@mui/icons-material/Receipt';
import { styled } from '@mui/material/styles';

const ModuleButton = styled(Button)(({ theme }) => ({
  flexDirection: 'column',
  height: 96,
  minHeight: 96,
  padding: '12px',
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    borderColor: theme.palette.primary.main,
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
  '&:active': {
    transform: 'translateY(-1px)',
  },
  transition: 'all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)',
}));

const DashboardCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.dark} 100%)`,
  color: theme.palette.primary.contrastText,
  border: 'none',
  boxShadow: theme.shadows[2],
}));

const StatusCard = styled(Card)<{ status: 'normal' | 'warning' | 'danger' }>(({ theme, status }) => ({
  borderLeft: `4px solid ${
    status === 'normal' ? theme.palette.success.main :
    status === 'warning' ? theme.palette.warning.main :
    theme.palette.error.main
  }`,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  '&:hover': {
    boxShadow: theme.shadows[2],
    transform: 'translateY(-1px)',
  },
  transition: 'all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)',
}));

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  const dashboardData = [
    { label: '总物资数', value: '120 件', color: 'textPrimary' },
    { label: '待巡检', value: '2 项', color: 'warning.main' },
    { label: '异常/临期', value: '1 项', color: 'error.main' },
  ];

  const modules = [
    {
      title: '日常物资巡检维护',
      icon: <InspectionIcon />,
      path: '/inspection',
      enabled: true,
    },
    {
      title: '应急物资消耗登记',
      icon: <ConsumptionIcon />,
      path: '#',
      enabled: false,
    },
    {
      title: '就近互助调度',
      icon: <MutualAidIcon />,
      path: '/mutual-aid',
      enabled: true,
    },
    {
      title: '账单结算查看',
      icon: <BillIcon />,
      path: '#',
      enabled: false,
    },
  ];

  const handleModuleClick = (path: string, enabled: boolean) => {
    if (enabled && path !== '#') {
      navigate(path);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: 'background.default',
    }}>
      {/* Header */}
      <Box sx={{
        background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        color: 'primary.contrastText',
        px: 3,
        py: 4,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
      }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ 
              bgcolor: 'rgba(255, 255, 255, 0.2)', 
              mr: 3,
              width: 56,
              height: 56,
              fontSize: '20px',
              fontWeight: 600,
            }}>
              张
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5, color: 'inherit' }}>
                社区物资管理员 - 张华
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, color: 'inherit' }}>
                幸福社区储备点
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          {/* Dashboard */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
              核心数据看板
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
              {dashboardData.map((item, index) => (
                <Box key={index} sx={{ flex: 1 }}>
                  <StatusCard status={item.label.includes('待巡检') ? 'warning' : item.label.includes('异常') ? 'danger' : 'normal'}>
                    <CardContent sx={{ px: 3, py: 3, textAlign: 'center' }}>
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          fontWeight: 600,
                          color: item.color === 'warning.main' ? 'warning.main' : 
                                 item.color === 'error.main' ? 'error.main' : 'text.primary',
                          mb: 1
                        }}
                      >
                        {item.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        {item.label}
                      </Typography>
                    </CardContent>
                  </StatusCard>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Module Grid */}
          <Box>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
              功能模块
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              {modules.map((module, index) => (
                <Box key={index} sx={{ width: 'calc(50% - 12px)' }}>
                  <ModuleButton
                    variant="outlined"
                    fullWidth
                    onClick={() => handleModuleClick(module.path, module.enabled)}
                    disabled={!module.enabled}
                    sx={{
                      height: '100%',
                      minHeight: 96,
                    }}
                  >
                    <Box sx={{ mb: 1.5, display: 'flex', justifyContent: 'center' }}>
                      <Box sx={{ 
                        color: module.enabled ? 'primary.main' : 'text.disabled',
                        '& .MuiSvgIcon-root': {
                          fontSize: 32,
                        }
                      }}>
                        {module.icon}
                      </Box>
                    </Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 500,
                        textAlign: 'center',
                        lineHeight: 1.4,
                        color: 'text.primary',
                        px: 1
                      }}
                    >
                      {module.title}
                    </Typography>
                  </ModuleButton>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeScreen;