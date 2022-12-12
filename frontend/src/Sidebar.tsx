import { BoxProps, Button, Box } from '@mui/material';
import React from 'react';
import { Application } from '../../shared-types';
import axios from 'axios';
import { CarriersModal } from './CarriersModal';

// Redux
import { useAppSelector } from './redux/reduxHooks';
import { RootState } from './redux/store';
import { useAppDispatch } from "src/redux/reduxHooks";
import {addApplication, updateSelectedApp} from './redux/applications/applications.action';

interface Props {
    style?: BoxProps['style'];
}

export const Sidebar: React.VFC<Props> = ({style }) => {
    const dispatch = useAppDispatch();
    const {selectedAppId, applications} = useAppSelector((state: RootState) => state.applications);
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreate = (carriers: string[]) => {
        axios
            .post('/api/applications/new', { carriers })
            .then(({ data }) => {
                console.log(data);
                
                addApplication(data, dispatch);
                updateSelectedApp(data.id, dispatch);
            })
            .finally(handleClose);
    };

    return (
        <>
            <Box style={{ ...sidebarStyles, ...style }}>
                <Button
                    color="primary"
                    onClick={() => setOpen(true)}
                    style={{ marginBottom: '40px' }}
                >
                    Start New Application
                </Button>
                {applications.map((app: Application) => (
                    <Button
                        color="secondary"
                        onClick={() => updateSelectedApp(app.id, dispatch)}
                        style={{
                            backgroundColor:
                                app.id === selectedAppId ? 'gray' : undefined,
                        }}
                    >
                        {app.carriers.join(' + ')}
                    </Button>
                ))}
            </Box>
            <CarriersModal
                open={open}
                onClose={handleClose}
                onSubmit={handleCreate}
            />
        </>
    );
};

const sidebarStyles: BoxProps['style'] = {
    display: 'flex',
    flexDirection: 'column',
};
