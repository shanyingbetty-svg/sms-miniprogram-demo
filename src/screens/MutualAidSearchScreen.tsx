import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Tabs,
  Tab,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import MapIcon from '@mui/icons-material/Map';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import ListIcon from '@mui/icons-material/List';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WarningIcon from '@mui/icons-material/Warning';
import BuildIcon from '@mui/icons-material/Build';

const TabPanel: React.FC<{ children: React.ReactNode; value: number; index: number }> = ({
  children,
  value,
  index,
}) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && children}
    </div>
  );
};

const SurplusCard: React.FC<{
  communityName: string;
  distance: string;
  materials: Array<{ name: string; surplus: string }>;
  onDispatch: () => void;
}> = ({ communityName, distance, materials, onDispatch }) => {
  return (
    <Card sx={{ mb: 2, borderRadius: 3, overflow: 'visible' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ 
            backgroundColor: '#1B59F8', 
            mr: 2,
            width: 48,
            height: 48
          }}>
            <LocationOnIcon />
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#2c3e50', mb: 0.5 }}>
              {communityName}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOnIcon sx={{ fontSize: 16, color: '#95a5a6', mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                距离 {distance}
              </Typography>
            </Box>
          </Box>
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, color: '#2c3e50' }}>
            富余物资
          </Typography>
          {materials.map((material, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <BuildIcon sx={{ fontSize: 16, color: '#52C41A', mr: 1 }} />
              <Typography variant="body2" sx={{ mr: 1 }}>
                {material.name}
              </Typography>
              <Chip
                label={`富余 ${material.surplus}`}
                size="small"
                sx={{
                  backgroundColor: '#F6FFED',
                  color: '#52C41A',
                  fontWeight: 500,
                  ml: 'auto',
                }}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
      
      <CardActions sx={{ px: 3, pb: 3, pt: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            size="medium"
            onClick={onDispatch}
            sx={{
              minWidth: 100,
              background: 'linear-gradient(135deg, #1B59F8 0%, #3B7AFF 100%)',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(27, 89, 248, 0.3)',
              }
            }}
          >
            发起调度
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

const MapPlaceholder: React.FC = () => {
  return (
    <Box sx={{
      height: 400,
      border: '2px dashed #d0d0d0',
      borderRadius: 3,
      backgroundColor: '#f8f9fa',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      mb: 2
    }}>
      <MapIcon sx={{ fontSize: 64, color: '#95a5a6', mb: 2 }} />
      <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
        模拟地图视图
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
        显示周边社区物资储备点位置
      </Typography>
      
      {/* Mock community pins */}
      <Box sx={{
        position: 'absolute',
        top: '20%',
        left: '25%',
      }}>
        <Avatar sx={{ backgroundColor: '#52C41A', fontSize: '12px' }}>朝</Avatar>
        <Typography variant="caption" sx={{ fontSize: '10px', display: 'block', textAlign: 'center', mt: 0.5 }}>
          朝阳社区
        </Typography>
      </Box>
      
      <Box sx={{
        position: 'absolute',
        top: '40%',
        right: '30%',
      }}>
        <Avatar sx={{ backgroundColor: '#52C41A', fontSize: '12px' }}>向</Avatar>
        <Typography variant="caption" sx={{ fontSize: '10px', display: 'block', textAlign: 'center', mt: 0.5 }}>
          向阳社区
        </Typography>
      </Box>
      
      <Box sx={{
        position: 'absolute',
        bottom: '25%',
        left: '40%',
      }}>
        <Avatar sx={{ backgroundColor: '#1B59F8', fontSize: '12px' }}>幸</Avatar>
        <Typography variant="caption" sx={{ fontSize: '10px', display: 'block', textAlign: 'center', mt: 0.5 }}>
          幸福社区
        </Typography>
      </Box>
    </Box>
  );
};

const MutualAidSearchScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1); // Default to list mode

  const needMaterials = {
    name: '抢险工具-铁锹',
    shortage: '30把',
    reason: '当前库存不足，急需补充'
  };

  const nearbyCommunities = [
    {
      id: '1',
      communityName: '朝阳社区储备点',
      distance: '1.2km',
      materials: [
        { name: '铁锹', surplus: '50把' },
        { name: '防毒面具', surplus: '20个' }
      ],
      onDispatch: () => navigate('/dispatch', { state: { targetCommunity: '朝阳社区储备点' } }),
    },
    {
      id: '2',
      communityName: '向阳社区储备点',
      distance: '2.5km',
      materials: [
        { name: '铁锹', surplus: '20把' }
      ],
      onDispatch: () => navigate('/dispatch', { state: { targetCommunity: '向阳社区储备点' } }),
    },
  ];

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
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
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
          <Typography variant="h6" sx={{ fontWeight: 600, ml: 1 }}>
            就近互助调度
          </Typography>
        </Box>
      </Box>

      <Box sx={{ p: 2 }}>
        {/* Need Banner */}
        <Card sx={{ mb: 3, borderRadius: 3, borderLeft: '4px solid #FAAD14' }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <WarningIcon sx={{ color: '#FAAD14', mr: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                当前本社区需求
              </Typography>
            </Box>
            
            <Box sx={{ pl: 4 }}>
              <Typography variant="h6" sx={{ color: '#FAAD14', fontWeight: 600, mb: 1 }}>
                {needMaterials.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                {needMaterials.reason}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#FAAD14' }}>
                  缺口：{needMaterials.shortage}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          centered
          sx={{
            mb: 2,
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '15px',
              minWidth: 120,
              px: 3,
              color: '#95a5a6',
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
          <Tab icon={<MapIcon />} iconPosition="start" label="地图模式" />
          <Tab icon={<ListIcon />} iconPosition="start" label="列表模式" />
        </Tabs>

        {/* Tab Content */}
        <TabPanel value={activeTab} index={0}>
          <MapPlaceholder />
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#2c3e50' }}>
              周边富余物资（按距离排序）
            </Typography>
            {nearbyCommunities.map(community => (
              <SurplusCard key={community.id} {...community} />
            ))}
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#2c3e50' }}>
              周边富余物资（按距离排序）
            </Typography>
            {nearbyCommunities.map(community => (
              <SurplusCard key={community.id} {...community} />
            ))}
          </Box>
        </TabPanel>
      </Box>
    </Box>
  );
};

export default MutualAidSearchScreen;