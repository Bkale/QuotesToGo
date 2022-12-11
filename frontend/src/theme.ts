import { createTheme as createMaterialTheme } from '@mui/material/styles';

export const createTheme = () =>
    createMaterialTheme(
        {
            spacing: 6,
            typography: {
                fontFamily: [
                    'Inter',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    '"Segoe UI"',
                    '"Helvetica Neue"',
                    'Arial',
                    'sans-serif',
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                ].join(','),
            },
        },
        {
            typography: {
                h1: {
                    fontSize: '32px',
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    lineHeight: '32px',
                    margin: '32px 0',
                },
                h2: {
                    fontSize: '24px',
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    lineHeight: '32px',
                    margin: '32px 0',
                },
                h3: {
                    fontSize: '20px',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    lineHeight: '24px',
                    margin: '24px 0',
                },
                h4: {
                    fontSize: '14px',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: '16px',
                    margin: '16px 0',
                },
                h5: {
                    color: 'gray',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: '16px',
                    margin: '16px 0',
                },
            },
        }
    );
