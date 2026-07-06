import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import HomeScreen from './screens/HomeScreen';
import InspectionListScreen from './screens/InspectionListScreen';
import InspectionFormScreen from './screens/InspectionFormScreen';
import MaintenanceScreen from './screens/MaintenanceScreen';
import MutualAidSearchScreen from './screens/MutualAidSearchScreen';
import DispatchRequestScreen from './screens/DispatchRequestScreen';
import TrackingScreen from './screens/TrackingScreen';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/inspection" element={<InspectionListScreen />} />
            <Route path="/inspection/form" element={<InspectionFormScreen />} />
            <Route path="/maintenance" element={<MaintenanceScreen />} />
            <Route path="/mutual-aid" element={<MutualAidSearchScreen />} />
            <Route path="/dispatch" element={<DispatchRequestScreen />} />
            <Route path="/tracking" element={<TrackingScreen />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;