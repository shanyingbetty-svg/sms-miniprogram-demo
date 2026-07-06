import { createTheme } from '@mui/material/styles';

// 基于 Ant Design 6.0 设计色板
const blue5 = '#1677ff';
const blue4 = '#4096ff';
const blue6 = '#0958d9';

const green5 = '#52c41a';
const green4 = '#73d13d';
const green6 = '#389e0d';

const yellow5 = '#faad14';
const yellow4 = '#ffc53d';
const yellow6 = '#d48806';

const red5 = '#ff4d4f';
const red4 = '#ff7875';
const red6 = '#cf1322';

const gray1 = '#ffffff';
const gray2 = '#fafafa';
const gray3 = '#f5f5f5';
const gray4 = '#f0f0f0';
const gray5 = '#d9d9d9';
const gray6 = '#bfbfbf';
const gray7 = '#8c8c8c';
const gray8 = '#595959';
const gray9 = '#434343';
const gray10 = '#262626';
const gray11 = '#1f1f1f';
const gray12 = '#141414';
const gray13 = '#000000';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: blue4,
      main: blue5,
      dark: blue6,
      contrastText: gray1,
    },
    secondary: {
      main: gray6,
    },
    success: {
      light: green4,
      main: green5,
      dark: green6,
      contrastText: gray1,
    },
    warning: {
      light: yellow4,
      main: yellow5,
      dark: yellow6,
      contrastText: gray13,
    },
    error: {
      light: red4,
      main: red5,
      dark: red6,
      contrastText: gray1,
    },
    background: {
      default: gray3,
      paper: gray1,
    },
    text: {
      primary: gray10,
      secondary: gray7,
      disabled: gray5,
    },
    divider: gray4,
  },
  shape: {
    borderRadius: 6,
  },
  spacing: 8,
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: { fontSize: '38px', fontWeight: 600, lineHeight: 1.23 },
    h2: { fontSize: '30px', fontWeight: 600, lineHeight: 1.35 },
    h3: { fontSize: '24px', fontWeight: 600, lineHeight: 1.35 },
    h4: { fontSize: '20px', fontWeight: 600, lineHeight: 1.4 },
    h5: { fontSize: '16px', fontWeight: 600, lineHeight: 1.5 },
    h6: { fontSize: '14px', fontWeight: 600, lineHeight: 1.5 },
    body1: { fontSize: '14px', fontWeight: 400, lineHeight: 1.57 },
    body2: { fontSize: '12px', fontWeight: 400, lineHeight: 1.67 },
    button: { fontSize: '14px', fontWeight: 500, textTransform: 'none' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '14px',
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(22, 119, 255, 0.3)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'none',
          },
        },
        outlined: {
          borderColor: gray5,
          '&:hover': {
            borderColor: blue5,
            backgroundColor: blue4 + '0A',
          },
        },
        text: {
          '&:hover': {
            backgroundColor: blue4 + '0A',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
          border: '1px solid ' + gray4,
          '&:hover': {
            boxShadow: '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
      },
    },
  },
});

export default theme;