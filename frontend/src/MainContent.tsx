import { Box, BoxProps, Typography } from '@mui/material';
import { Application } from '../../shared-types';
import { SectionRenderer } from './application/SectionRenderer';

interface Props {
    application?: Application;
    style: BoxProps['style'];
}

export const MainContent: React.VFC<Props> = ({application, style}) => {
    const rootSections = application?.content.map((section) => (
        <SectionRenderer section={section} depth={0} />
    ));
    return (
        <Box style={style}>
            <Typography variant="h1">Quotes To Go</Typography>
            <Typography variant="body1">
                Quotes You Can Take With You
            </Typography>
            <Box>{rootSections}</Box>
        </Box>
    );
};
