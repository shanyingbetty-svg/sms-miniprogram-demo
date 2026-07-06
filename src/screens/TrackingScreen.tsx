import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssignmentIcon from '@mui/icons-material/Assignment';
import VerifiedIcon from '@mui/icons-material/Verified';
import TimerIcon from '@mui/icons-material/Timer';
import BuildIcon from '@mui/icons-material/Build';

const TrackingScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(2); // Start at "配送中"
  const [isVerified, setIsVerified] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [canSign, setCanSign] = useState(false);

  useEffect(() => {
    // Simulate step progression after 3 seconds
    const timer = setTimeout(() => {
      setActiveStep(3);
      setCanSign(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const deliverySteps = [
    {
      label: '已发起',
      description: '幸福社区于 21:45 发起申请',
      time: '21:45',
      icon: <AssignmentIcon />,
      color: '#52C41A',
    },
    {
      label: '已接单',
      description: '朝阳社区已确认并出库',
      time: '21:52',
      icon: <CheckCircleIcon />,
      color: '#52C41A',
    },
    {
      label: '配送中',
      description: '配送员正在前往幸福社区...',
      time: '22:15',
      icon: <LocalShippingIcon />,
      color: '#1B59F8',
      isActive: true,
    },
    {
      label: '待签收',
      description: '签收核验',
      time: '',
      icon: <VerifiedIcon />,
      color: canSign ? '#1B59F8' : '#d0d0d0',
    },
  ];

  const deliveryInfo = {
    driver: '李师傅',
    vehicle: '鲁B12345',
    quantity: '30把铁锹',
    estimatedTime: '22:30',
  };

  const handleSignOff = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/');
    }, 3000);
  };

  const handleVerificationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsVerified(event.target.checked);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5',
      pb: 8
    }}>
      {/* Header */}
      <Box sx={{
        backgroundColor: '#1B59F8',
        color: 'white',
        p: 3,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton 
            onClick={() => navigate('/')}
            sx={{ 
              color: 'white',
              p: 1,
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              物资配送中
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ opacity: 0.9, textAlign: 'center' }}>
          实时跟踪您的调度申请进度
        </Typography>
      </Box>

      <Box sx={{ p: 2 }}>
        {/* Progress Steps */}
        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#2c3e50' }}>
              配送进度跟踪
            </Typography>
            
            <Stepper 
              activeStep={activeStep} 
              orientation="vertical"
              sx={{
                '& .MuiStepLabel-label': {
                  fontWeight: 600,
                },
                '& .MuiStepContent-root': {
                  borderLeftWidth: 2,
                }
              }}
            >
              {deliverySteps.map((step, index) => (
                <Step key={index} completed={index < activeStep}>
                  <StepLabel 
                    sx={{
                      '& .MuiStepLabel-label': {
                        color: step.color,
                        fontWeight: 600,
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ 
                        backgroundColor: index <= activeStep ? step.color : '#d0d0d0', 
                        width: 24, 
                        height: 24, 
                        mr: 1,
                        fontSize: 12,
                        fontWeight: 600
                      }}>
                        {index < activeStep ? '✓' : index === activeStep && step.isActive ? <TimerIcon sx={{ fontSize: 16 }} /> : index + 1}
                      </Avatar>
                      {step.label}
                    </Box>
                  </StepLabel>
                  <StepContent>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 1 }}>
                      {step.description}
                    </Typography>
                    {step.time && (
                      <Typography variant="caption" sx={{ ml: 4, color: step.color, fontWeight: 500 }}>
                        {step.time}
                      </Typography>
                    )}
                    {index === 2 && activeStep === 2 && (
                      <Box sx={{ ml: 4, mt: 1, p: 2, backgroundColor: '#f0f9ff', borderRadius: 1, border: '1px solid #e6f7ff' }}>
                        <Typography variant="caption" sx={{ color: '#1B59F8', lineHeight: 1.4 }}>
                          🚚 配送员 {deliveryInfo.driver} 正在路上 | 车牌：{deliveryInfo.vehicle}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#1B59F8', display: 'block' }}>
                          预计 {deliveryInfo.estimatedTime} 到达
                        </Typography>
                      </Box>
                    )}
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </CardContent>
        </Card>

        {/* Delivery Info */}
        {activeStep === 2 && (
          <Card sx={{ mb: 3, borderRadius: 3, borderLeft: '4px solid #1B59F8' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#2c3e50' }}>
                配送信息
              </Typography>
              
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <LocalShippingIcon sx={{ color: '#1B59F8' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="配送师傅" 
                    secondary={deliveryInfo.driver}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <AssignmentIcon sx={{ color: '#1B59F8' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="运输车辆" 
                    secondary={deliveryInfo.vehicle}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <BuildIcon sx={{ color: '#1B59F8' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="配送物资" 
                    secondary={deliveryInfo.quantity}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        )}

        {/* Sign Off Section */}
        {canSign && (
          <Card sx={{ mb: 3, borderRadius: 3, borderLeft: '4px solid #52C41A' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#2c3e50' }}>
                签收核验
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  请确认收到的物资数量和质量
                </Typography>
                
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isVerified}
                      onChange={handleVerificationChange}
                      sx={{
                        color: '#1B59F8',
                        '&.Mui-checked': {
                          color: '#1B59F8',
                        }
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      我已核验数量（{deliveryInfo.quantity}）及物资完好度
                    </Typography>
                  }
                  sx={{ ml: 0 }}
                />
              </Box>
              
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleSignOff}
                disabled={!isVerified}
                sx={{
                  height: 48,
                  borderRadius: 2,
                  fontSize: '16px',
                  fontWeight: 600,
                  background: isVerified ? 
                    'linear-gradient(135deg, #52C41A 0%, #73D13D 100%)' :
                    undefined,
                  '&:disabled': {
                    backgroundColor: '#d0d0d0',
                  },
                  '&:hover': {
                    boxShadow: isVerified ? '0 4px 12px rgba(82, 196, 26, 0.3)' : undefined,
                  }
                }}
              >
                线上确认签收
              </Button>
            </CardContent>
          </Card>
        )}
      </Box>

      {/* Success Dialog */}
      <Dialog
        open={showSuccess}
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 3,
            p: 3,
            textAlign: 'center',
            maxWidth: 400
          }
        }}
      >
        <DialogTitle sx={{ pt: 4, pb: 1 }}>
          <CheckCircleIcon sx={{ fontSize: 64, color: '#52C41A', mb: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#52C41A' }}>
            签收成功！
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ px: 4, pb: 4 }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2, fontWeight: 500 }}>
            ✓ 已完成调度闭环
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
            系统已自动生成跨社区有偿结算单据，<br />
            纳入月度费用核算
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default TrackingScreen;