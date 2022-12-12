import { Box, BoxProps, CssBaseline, ThemeProvider } from '@mui/material';
import { MainContent } from './layout/MainContent';
import { Sidebar } from './layout/Sidebar';
import React from 'react';
import axios from 'axios';
import { createTheme } from './theme';

//Redux
import { RootState } from './redux/rootReducer';
import { useAppSelector, useAppDispatch } from './redux/reduxHooks';
import {setApplications} from './redux/applications/applications.action';

export default function App() {
    const dispatch = useAppDispatch()
    const {selectedAppId} = useAppSelector((state: RootState) => state.applications);

    React.useEffect(() => {
        axios
            .get('/api/applications/all')
            .then(({ data }) => {
                setApplications(data, dispatch)
                // TODO clear application data from persist if !Auth | no data from backend
            });
    }, []);


    return (
        <ThemeProvider theme={createTheme()}>
            <CssBaseline />
            <Box id="layout-root" style={rootStyles}>
                <Sidebar style={sidebarStyles} />
                <MainContent key={selectedAppId} />
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

const rootStyles: BoxProps['style'] = {
    overflow: 'hidden',
    display: 'flex',
    height: '100%'
}
