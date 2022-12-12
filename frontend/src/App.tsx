import { Box, BoxProps, CssBaseline, ThemeProvider } from '@mui/material';
import { Application } from '../../shared-types';
import { MainContent } from './MainContent';
import { Sidebar } from './Sidebar';
import React from 'react';
import axios from 'axios';
import { createTheme } from './theme';

//REDUX
import { useAppSelector } from './redux/reduxHooks';
import { RootState } from './redux/store';

export default function App() {
    const {selectedAppId} = useAppSelector((state: RootState) => state.applications);

    const [applications, setApplications] = React.useState<Application[]>([]);
    const selectedApp = applications.find((app) => app.id === selectedAppId);

    React.useEffect(() => {
        axios
            .get('/api/applications/all')
            .then(({ data }) => setApplications(data));
    }, []);

    return (
        <ThemeProvider theme={createTheme()}>
            <CssBaseline />
            <Box id="layout-root" style={rootStyles}>
                <Sidebar style={sidebarStyles} />
                <MainContent
                    key={selectedAppId}
                    style={mainContentStyles}
                    application={selectedApp}
                />
            </Box>
        </ThemeProvider>
    );
}

const SIDEBAR_WIDTH = 300;

const sidebarStyles: BoxProps['style'] = {
    backgroundColor: 'lightgrey',
    height: '100%',
    padding: '40px',
    maxWidth: SIDEBAR_WIDTH,
};

const mainContentStyles: BoxProps['style'] = {
    height: '100%',
    padding: '40px',
    overflowY: 'auto',
    flexGrow: 1
};

const rootStyles: BoxProps['style'] = {
    overflow: 'hidden',
    display: 'flex',
    height: '100%'
}
