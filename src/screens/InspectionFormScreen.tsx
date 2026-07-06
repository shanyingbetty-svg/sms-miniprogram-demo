import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  IconButton,
  Avatar,
  Alert,
  Snackbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ImageIcon from '@mui/icons-material/Image';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const InspectionFormScreen: React.FC = () => {
  const navigate = useNavigate();
  const [inspectionResult, setInspectionResult] = useState('完好');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [remark, setRemark] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const materialInfo = {
    name: '便携式抽水泵',
    spec: '50L/min',
    quantity: '2 台',
    location: '1 号储备柜',
  };

  const inspectionOptions = [
    { value: '完好', label: '完好' },
    { value: '破损', label: '破损' },
    { value: '受潮', label: '受潮' },
    { value: '过期', label: '过期' },
  ];

  const handlePhotoUpload = () => {
    // Simulate photo upload
    setHasPhoto(true);
    // In a real app, this would open the camera or photo picker
  };

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/inspection');
    }, 2000);
  };

  const isFormValid = inspectionResult && (hasPhoto || remark.trim());

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
          物资巡检打卡 - {materialInfo.name}
        </Typography>
      </Box>

      <Box sx={{ p: 2 }}>
        {/* Material Info */}
        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#2c3e50' }}>
              物资基础信息
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">名称：</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>{materialInfo.name}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">规格：</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>{materialInfo.spec}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">当前库存：</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>{materialInfo.quantity}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">存放位置：</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>{materialInfo.location}</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Inspection Result */}
        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#2c3e50' }}>
              巡检结果选择
            </Typography>
            <RadioGroup
              value={inspectionResult}
              onChange={(e) => setInspectionResult(e.target.value)}
            >
              {inspectionOptions.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={
                    <Radio 
                      sx={{ 
                        color: '#1B59F8',
                        '&.Mui-checked': {
                          color: '#1B59F8',
                        }
                      }} 
                    />
                  }
                  label={option.label}
                  sx={{
                    mb: 1,
                    '& .MuiFormControlLabel-label': {
                      fontSize: '15px',
                      fontWeight: 500,
                    }
                  }}
                />
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Photo Upload */}
        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#2c3e50' }}>
              现场照片上传
            </Typography>
            <Box
              sx={{
                border: '2px dashed #d0d0d0',
                borderRadius: 2,
                p: 3,
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: hasPhoto ? '#f0f9ff' : '#fafafa',
                borderColor: hasPhoto ? '#1B59F8' : '#d0d0d0',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: '#1B59F8',
                  backgroundColor: '#f0f9ff',
                }
              }}
              onClick={handlePhotoUpload}
            >
              {hasPhoto ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  <CheckCircleIcon sx={{ fontSize: 40, color: '#52C41A', mb: 1 }} />
                  <Typography variant="body2" sx={{ color: '#52C41A', fontWeight: 500 }}>
                    抽水泵在库房的现场照片已上传
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  <AddPhotoAlternateIcon sx={{ fontSize: 48, color: '#95a5a6', mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    点击上传现场照片
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    可以选择相册或拍照
                  </Typography>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Remark */}
        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#2c3e50' }}>
              备注说明
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="请输入物资现状补充描述"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
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
          一键提交巡检记录
        </Button>
      </Box>

      {/* Success Toast */}
      <Snackbar
        open={showSuccess}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ mt: 8 }}
      >
        <Alert
          icon={<CheckCircleIcon fontSize="inherit" />}
          severity="success"
          sx={{
            backgroundColor: '#f6ffed',
            border: '1px solid #b7eb8f',
            color: '#52c41a',
            fontSize: '15px',
            fontWeight: 500,
          }}
        >
          提交成功，已自动生成维护台账！
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default InspectionFormScreen;