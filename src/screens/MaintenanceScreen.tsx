import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WarningIcon from '@mui/icons-material/Warning';

const MaintenanceScreen: React.FC = () => {
  const navigate = useNavigate();
  const [maintenanceType, setMaintenanceType] = useState('');
  const [responsiblePerson, setResponsiblePerson] = useState('张华');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const maintenanceOptions = [
    { value: '更换气瓶/药剂', label: '更换气瓶/药剂' },
    { value: '外观除锈', label: '外观除锈' },
    { value: '移位防潮', label: '移位防潮' },
  ];

  const handleSubmit = () => {
    setShowSuccessDialog(true);
  };

  const handleCloseDialog = () => {
    setShowSuccessDialog(false);
    navigate('/inspection');
  };

  const isFormValid = maintenanceType && responsiblePerson.trim();

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
          onClick={() => navigate('/inspection')}
          sx={{ color: 'white', mr: 1 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          临期/异常物资维护
        </Typography>
      </Box>

      <Box sx={{ p: 2 }}>
        {/* Warning Banner */}
        <Alert 
          severity="error" 
          icon={<WarningIcon />}
          sx={{ 
            mb: 3, 
            borderRadius: 2,
            '& .MuiAlert-message': {
              fontSize: '15px',
              fontWeight: 500,
            }
          }}
        >
          当前有物资处于异常状态，请立即进行处理
        </Alert>

        {/* Material Info */}
        <Card sx={{ mb: 3, borderRadius: 3, borderLeft: '4px solid #FF4D4F' }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <WarningIcon sx={{ color: '#FF4D4F', mr: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                待维护物资
              </Typography>
            </Box>
            
            <Box sx={{ pl: 4 }}>
              <Typography variant="h6" sx={{ color: '#FF4D4F', fontWeight: 600, mb: 1 }}>
                ABC干粉灭火器
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                规格：4kg | 共 15 瓶
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                存放位置：消防物资间
              </Typography>
              <Typography variant="body2" sx={{ color: '#FF4D4F', fontWeight: 500 }}>
                ⚠️ 临期预警：2026-08到期
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Maintenance Form */}
        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#2c3e50' }}>
              维护登记信息
            </Typography>
            
            {/* Maintenance Type */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#2c3e50' }}>
                维护方式选择 <span style={{ color: '#FF4D4F' }}>*</span>
              </Typography>
              <TextField
                select
                fullWidth
                value={maintenanceType}
                onChange={(e) => setMaintenanceType(e.target.value)}
                placeholder="请选择维护方式"
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
              >
                {maintenanceOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            {/* Responsible Person */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#2c3e50' }}>
                责任人 <span style={{ color: '#FF4D4F' }}>*</span>
              </Typography>
              <TextField
                fullWidth
                value={responsiblePerson}
                onChange={(e) => setResponsiblePerson(e.target.value)}
                placeholder="请输入责任人姓名"
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
            </Box>

            {/* Additional Info */}
            <Alert 
              severity="info" 
              sx={{ 
                borderRadius: 2,
                backgroundColor: '#f0f9ff',
                '& .MuiAlert-message': {
                  fontSize: '14px',
                }
              }}
            >
              维护完成后，系统将自动更新物资状态并生成维护记录台账
            </Alert>
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
              'linear-gradient(135deg, #FF4D4F 0%, #FF7875 100%)' :
              undefined,
            '&:disabled': {
              backgroundColor: '#d0d0d0',
            },
            '&:hover': {
              background: isFormValid ? 
                'linear-gradient(135deg, #FF4D4F 0%, #FF7875 100%)' :
                undefined,
              boxShadow: isFormValid ? '0 4px 12px rgba(255, 77, 79, 0.3)' : undefined,
            }
          }}
        >
          登记维护记录
        </Button>
      </Box>

      {/* Success Dialog */}
      <Dialog
        open={showSuccessDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 3,
            p: 2
          }
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', pt: 3, pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#2c3e50' }}>
            维护台账登记成功
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ textAlign: 'center', px: 4, pb: 3 }}>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
            维护台账已自动生成并登记成功，<br />
            已上报镇级管理端督办。
          </Typography>
        </DialogContent>
        
        <DialogActions sx={{ justifyContent: 'center', pb: 3, px: 4 }}>
          <Button
            variant="contained"
            onClick={handleCloseDialog}
            sx={{
              minWidth: 120,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #1B59F8 0%, #3B7AFF 100%)',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(27, 89, 248, 0.3)',
              }
            }}
          >
            确定
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MaintenanceScreen;