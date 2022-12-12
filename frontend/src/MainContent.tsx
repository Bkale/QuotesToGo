import { useRef, useState } from 'react';
import axios from 'axios';
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

    const handleChange = (event: { target: {
        [x: string]: any; value: any; 
}; }, questionId: string) => {
        if (event.target.value && typeof(event.target.value) === "string") {
            console.log(event.target.value)
            if (event.target.value.toLowerCase() === "true") event.target.value = true;
            if (event.target.value.toLowerCase() === "false")  event.target.value = false;
        }
        
        setAnswers(prev => {
            return {
                ...prev,
                [questionId]: event.target.value
            }
        })
    };

    const handleSubmit = () => {
        const {answerLookup} = selectedApp;
        
        for(let answer in answerLookup){
           // Populate answerlookup
           if(answer in answers) {
            if(answerLookup[answer].isRequired && (answers[answer] === undefined )) return; // VALIDATE ISREQUIRED
            answerLookup[answer].value = answers[answer];
           } else {
            if(mainRef.current[answer] === null || mainRef.current[answer].value === undefined) return; 
            if(mainRef.current[answer].value.length === 0) return; // VALIDATE ISREQUIRED
            answerLookup[answer].value = mainRef.current[answer].value;
           }
        }
        
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
