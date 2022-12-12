import { useRef, useState } from 'react';
import { Box, BoxProps, Typography } from '@mui/material';
import { ApplicationSection } from '../../shared-types';
import { SectionRenderer } from './application/SectionRenderer';
//Redux
import { RootState } from './redux/rootReducer';
import { useAppSelector } from './redux/reduxHooks';

export const MainContent = () => {
    const { selectedAppId, applications } = useAppSelector((state: RootState) => state.applications);
    let selectedApp = applications.find((app: { id: string; carriers: any[]; }) => app.id === selectedAppId);
    const [answers, setAnswers] = useState<{[key: string]: string}>({});
    const mainRef = useRef([]);

    // TODO: CONVERT ALL INPUT FIELDS EXEPT CONDITIONALS TO USEREF
    const handleChange = (event: { target: {
        [x: string]: any; value: any; 
}; }, questionId: string) => {
        
        setAnswers(prev => {
            return {
                ...prev,
                [questionId]: event.target.value
            }
        })
    };
    console.log(answers);
    
    const handleSubmit = () => {
        console.log(mainRef);
        
    }


    const rootSections = selectedApp?.content.map((section: ApplicationSection) => (
            <SectionRenderer 
                key={section.id}
                section={section} 
                depth={0} 
                onChange={handleChange} 
                answers={answers}
                reference={mainRef} />
    ));
    return (
        <Box style={mainContentStyles}>
            <Typography variant="h1">Quotes To Go</Typography>
            <Typography variant="body1">
                Quotes You Can Take With You
            </Typography>
            <Box>{rootSections}</Box>
            <button onClick={handleSubmit}>Save</button>
            <button onClick={handleSubmit}>Submit</button>
        </Box>
    );
}


const mainContentStyles: BoxProps['style'] = {
    height: '100%',
    padding: '40px',
    overflowY: 'auto',
    flexGrow: 1
};
