import {
    Box,
    BoxProps,
    Button,
    Dialog,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import React from 'react';

const CARRIERS = ['chubb', 'cna', 'hartford'];

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (carriers: string[]) => void;
}

export const CarriersModal: React.VFC<Props> = ({ open, onClose, onSubmit } ) => {
    const [selectedCarriers, setSelectedCarriers] = React.useState<string[]>([]);

    return (
        <Dialog open={open} onClose={onClose}>
            <Box style={dialogStyle}>
                <Typography>Select Carriers for this Application</Typography>
                <Box style={selectRowStyle}>
                    <Select
                        multiple={true}
                        onChange={(e) =>
                            setSelectedCarriers(e.target.value as any)
                        }
                        value={selectedCarriers}
                        style={selectStyle}
                    >
                        {CARRIERS.map((carrier) => (
                            <MenuItem key={carrier} value={carrier}>
                                {carrier}
                            </MenuItem>
                        ))}
                    </Select>
                    <Button
                        disabled={selectedCarriers.length === 0}
                        onClick={() => onSubmit(selectedCarriers)}
                    >
                        Create
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
};

const dialogStyle: BoxProps['style'] = {
    padding: '40px',
    minWidth: '400px',
    minHeight: '200px',
};

const selectRowStyle: BoxProps['style'] = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '40px',
};

const selectStyle = {
    minWidth: '300px',
};
