import { BoxProps, Button, Box } from '@mui/material';
import React from 'react';
import { Application } from '../../shared-types';
import axios from 'axios';
import { CarriersModal } from './CarriersModal';

interface Props {
    onCreate: (application: Application) => void;
    onSelect: (id: string) => void;
    applications: Application[];
    selectedAppId?: string;
    style?: BoxProps['style'];
}

export const Sidebar: React.VFC<Props> = ({ onCreate, onSelect, applications, selectedAppId, style }) => {
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreate = (carriers: string[]) => {
        axios
            .post('/api/applications/new', { carriers })
            .then(({ data }) => onCreate(data))
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
                {applications.map((app) => (
                    <Button
                        color="secondary"
                        onClick={() => onSelect(app.id)}
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
