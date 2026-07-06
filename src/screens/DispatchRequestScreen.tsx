import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Typography as MuiTypography,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AssignmentIcon from '@mui/icons-material/Assignment';

const DispatchRequestScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [quantity, setQuantity] = useState(30);
  const [urgency, setUrgency] = useState('紧急');
  const [reason, setReason] = useState('应对今晚突发强降雨抢险');
  const [showLoading, setShowLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock data based on the routing
  const dispatchData = {
    sourceCommunity: '幸福社区储备点',
    targetCommunity: location.state?.targetCommunity || '朝阳社区储备点',
    distance: '1.2km',
    material: {
      name: '铁锹',
      surplus: 50
    }
  };

  const urgencyOptions = [
    { value: '特急', label: '特急', color: '#FF4D4F' },
    { value: '紧急', label: '紧急', color: '#FAAD14' },
    { value: '一般', label: '一般', color: '#1B59F8' },
  ];

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, Math.min(dispatchData.material.surplus, quantity + delta));
    setQuantity(newQuantity);
  };

  const handleSubmit = () => {
    setShowLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      setShowLoading(false);
      setShowSuccess(true);
      
      // Auto navigate after showing success
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/tracking');
      }, 3000);
    }, 2000);
  };

  const isFormValid = quantity > 0 && reason.trim();

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
        p: 2,
        display: 'flex',
        alignItems: 'center',
      }}>
        <IconButton
          onClick={() => navigate('/mutual-aid')}
          sx={{ color: 'white', mr: 1 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          发起跨社区调度申请
        </Typography>
      </Box>

      <Box sx={{ p: 2 }}>
        {/* Request Info */}
        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <AssignmentIcon sx={{ color: '#1B59F8', mr: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                调度申请信息
              </Typography>
            </Box>
            
            {/* Communities */}
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="subtitle2" color="success.main" sx={{ fontWeight: 600 }}>
                  {dispatchData.sourceCommunity}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  → 距离 {dispatchData.distance}
                </Typography>
                <Typography variant="subtitle2" color="primary.main" sx={{ fontWeight: 600 }}>
                  {dispatchData.targetCommunity}
                </Typography>
              </Box>
            </Box>
            
            {/* Material Info */}
            <Box sx={{ 
              backgroundColor: '#f8f9fa', 
              p: 2, 
              borderRadius: 2,
              border: '1px solid #e9ecef'
            }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#2c3e50' }}>
                申请物资详情
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">
                  物资名称：<span style={{ fontWeight: 600 }}>{dispatchData.material.name}</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  当前富余：{dispatchData.material.surplus}把
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Quantity Selection */}
        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#2c3e50' }}>
              申请数量
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: '#f8f9fa',
              borderRadius: 2,
              p: 2,
              mb: 2
            }}>
              <IconButton
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                sx={{
                  backgroundColor: 'white',
                  border: '1px solid #d0d0d0',
                  mr: 2,
                  '&:disabled': {
                    backgroundColor: '#f5f5f5',
                    color: '#d0d0d0'
                  }
                }}
              >
                <RemoveIcon />
              </IconButton>
              
              <Box sx={{ textAlign: 'center', mx: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1B59F8' }}>
                  {quantity}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  把铁锹
                </Typography>
              </Box>
              
              <IconButton
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= dispatchData.material.surplus}
                sx={{
                  backgroundColor: 'white',
                  border: '1px solid #d0d0d0',
                  ml: 2,
                  '&:disabled': {
                    backgroundColor: '#f5f5f5',
                    color: '#d0d0d0'
                  }
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>
            
            <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', display: 'block' }}>
              可申请数量：1 - {dispatchData.material.surplus} 把
            </Typography>
          </CardContent>
        </Card>

        {/* Urgency Selection */}
        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#2c3e50' }}>
              紧急程度
            </Typography>
            
            <RadioGroup
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              sx={{ gap: 1 }}
            >
              {urgencyOptions.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={
                    <Radio 
                      sx={{ 
                        color: option.color,
                        '&.Mui-checked': {
                          color: option.color,
                        }
                      }} 
                    />
                  }
                  label={
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontWeight: 500,
                        color: option.color
                      }}
                    >
                      {option.label}
                    </Typography>
                  }
                  sx={{
                    border: `1px solid ${option.color}20`,
                    borderRadius: 2,
                    p: 2,
                    backgroundColor: `${option.color}08`,
                    mb: 1
                  }}
                />
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Reason */}
        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#2c3e50' }}>
              调度原因
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="请输入调度申请原因"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: '#e0e0e0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#1B59F8',
                  },
                },
              }}
            />
          </CardContent>
        </Card>
      </Box>

      {/* Submit Button */}
      <Box sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        p: 2,
        backgroundColor: 'white',
        borderTop: '1px solid #e0e0e0',
        boxShadow: '0 -2px 8px rgba(0,0,0,0.1)'
      }}>
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleSubmit}
          disabled={!isFormValid}
          sx={{
            height: 48,
            borderRadius: 2,
            fontSize: '16px',
            fontWeight: 600,
            background: isFormValid ? 
              'linear-gradient(135deg, #1B59F8 0%, #3B7AFF 100%)' :
              undefined,
            '&:disabled': {
              backgroundColor: '#d0d0d0',
            },
            '&:hover': {
              boxShadow: '0 4px 12px rgba(27, 89, 248, 0.3)',
            }
          }}
        >
          确认发起调度申请
        </Button>
      </Box>

      {/* Loading Dialog */}
      <Dialog
        open={showLoading}
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 3,
            p: 3,
            textAlign: 'center'
          }
        }}
      >
        <DialogContent sx={{ py: 4 }}>
          <CircularProgress 
            size={60} 
            sx={{ color: '#1B59F8', mb: 3 }}
          />
          <MuiTypography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#2c3e50' }}>
            智能调度中...
          </MuiTypography>
          <MuiTypography variant="body2" color="text.secondary">
            平台正在智能测算最优运输路径...
          </MuiTypography>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog
        open={showSuccess}
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 3,
            p: 2
          }
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', pt: 4, pb: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: '#52C41A' }}>
            ✓ 申请已发送
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ textAlign: 'center', px: 4, pb: 4 }}>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
            等待对方社区接单<br />
            系统正在为您寻找最优解决方案
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DispatchRequestScreen;