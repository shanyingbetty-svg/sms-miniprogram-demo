import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Tabs,
  Tab,
  Chip,
  IconButton,
  Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const TabPanel: React.FC<{ children: React.ReactNode; value: number; index: number }> = ({
  children,
  value,
  index,
}) => {
  return (
    <div role="tabpanel" hidden={value !== index} style={{ marginTop: 16 }}>
      {value === index && children}
    </div>
  );
};

const MaterialCard: React.FC<{
  title: string;
  spec: string;
  location: string;
  status: 'pending' | 'expired' | 'normal';
  statusText: string;
  actionText: string;
  onAction: () => void;
  extraInfo?: string;
}> = ({ title, spec, location, status, statusText, actionText, onAction, extraInfo }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'expired':
        return 'error';
      case 'normal':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusBgColor = () => {
    switch (status) {
      case 'pending':
        return '#FFF7E6';
      case 'expired':
        return '#FFF1F0';
      case 'normal':
        return '#F6FFED';
      default:
        return '#f5f5f5';
    }
  };

  return (
    <Card sx={{ mb: 2, borderRadius: 3, overflow: 'visible' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#2c3e50', flex: 1 }}>
            {title}
          </Typography>
          <Chip
            label={statusText}
            size="small"
            sx={{
              backgroundColor: getStatusBgColor(),
              color: status === 'pending' ? '#FAAD14' : status === 'expired' ? '#FF4D4F' : '#52C41A',
              fontWeight: 500,
              ml: 1,
            }}
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {spec}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          存放位置：{location}
        </Typography>
        
        {extraInfo && (
          <Typography variant="body2" sx={{ color: '#FF4D4F', fontWeight: 500 }}>
            {extraInfo}
          </Typography>
        )}
      </CardContent>
      
      <CardActions sx={{ px: 3, pb: 3, pt: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            size="medium"
            onClick={onAction}
            sx={{
              minWidth: 120,
              background: status === 'pending' ? 
                'linear-gradient(135deg, #FAAD14 0%, #FFC53D 100%)' :
                'linear-gradient(135deg, #FF4D4F 0%, #FF7875 100%)',
              '&:hover': {
                background: status === 'pending' ? 
                  'linear-gradient(135deg, #FAAD14 0%, #FFC53D 100%)' :
                  'linear-gradient(135deg, #FF4D4F 0%, #FF7875 100%)',
                boxShadow: status === 'pending' ? 
                  '0 4px 12px rgba(250, 173, 20, 0.3)' :
                  '0 4px 12px rgba(255, 77, 79, 0.3)',
              }
            }}
          >
            {actionText}
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

const InspectionListScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1); // Default to "待巡检"
  const [searchTerm, setSearchTerm] = useState('');

  const materials = [
    {
      id: '1',
      title: '防汛物资 - 便携式抽水泵',
      spec: '50L/min | 共 2 台',
      location: '1 号储备柜',
      status: 'pending' as const,
      statusText: '待巡检',
      actionText: '去巡检打卡',
      category: 'pending',
      onAction: () => navigate('/inspection/form'),
    },
    {
      id: '2',
      title: '消防物资 - ABC干粉灭火器',
      spec: '4kg | 共 15 瓶',
      location: '消防物资间',
      status: 'expired' as const,
      statusText: '临期预警',
      actionText: '一键维护',
      category: 'expired',
      extraInfo: '2026-08到期',
      onAction: () => navigate('/maintenance'),
    },
    {
      id: '3',
      title: '防护物资 - 防毒面具',
      spec: '标准型 | 共 30 个',
      location: '2 号储备柜',
      status: 'normal' as const,
      statusText: '正常',
      actionText: '查看记录',
      category: 'normal',
      onAction: () => {},
    },
  ];

  const filteredMaterials = materials.filter(material => {
    if (activeTab === 0) return true; // 全部台账
    if (activeTab === 1) return material.category === 'pending'; // 待巡检
    if (activeTab === 2) return material.category === 'expired'; // 临期/异常
    return true;
  }).filter(material => 
    material.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabLabels = ['全部台账', `待巡检 (${materials.filter(m => m.category === 'pending').length})`, `临期/异常 (${materials.filter(m => m.category === 'expired').length})`];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5'
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
          onClick={() => navigate('/')}
          sx={{ color: 'white', mr: 1 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          物资台账与巡检
        </Typography>
      </Box>

      <Box sx={{ p: 2 }}>
        {/* Search */}
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            placeholder="搜索物资名称"
            variant="outlined"
            size="medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            slotProps={{
              input: {
                startAdornment: <SearchIcon sx={{ color: '#95a5a6', mr: 1 }} />,
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'white',
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

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '14px',
              minWidth: 'auto',
              px: 2,
            },
            '& .Mui-selected': {
              color: '#1B59F8 !important',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#1B59F8',
              height: 3,
              borderRadius: 2,
            },
          }}
        >
          {tabLabels.map((label, index) => (
            <Tab key={index} label={label} />
          ))}
        </Tabs>

        {/* Tab Content */}
        {[
          <Box key="all">
            {filteredMaterials.map(material => (
              <MaterialCard key={material.id} {...material} />
            ))}
          </Box>,
          <Box key="pending">
            {filteredMaterials.map(material => (
              <MaterialCard key={material.id} {...material} />
            ))}
          </Box>,
          <Box key="expired">
            {filteredMaterials.map(material => (
              <MaterialCard key={material.id} {...material} />
            ))}
          </Box>
        ].map((content, index) => (
          <TabPanel key={index} value={activeTab} index={index}>
            {content}
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
};

export default InspectionListScreen;