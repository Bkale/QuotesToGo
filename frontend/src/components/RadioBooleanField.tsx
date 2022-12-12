import { ApplicationQuestion } from '../../../shared-types';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { MutableRefObject } from 'react';

const OPTIONS = [
    {
        label: 'Yes',
        value: 'true',
    },
    {
        label: 'No',
        value: 'false',
    },
];

interface Props {
    question: ApplicationQuestion;
    onChange?: (e:any ,id: string) => void;
    // reference?: MutableRefObject<[]> 
    reference?: MutableRefObject<(HTMLDivElement | null)[]> 
}

export const RadioBooleanField: React.VFC<Props> = ({question, onChange, reference}) => {

    const handleChange = (event: { target: { value: any; }; }) => {
        if(reference){
            reference.current[question.id as unknown as number] = event.target.value;
        }
    }

    if(onChange){
        return (
            <FormControl component="fieldset">
                <FormLabel className="question">{question.displayText}</FormLabel>
                <RadioGroup id={question.id} row onChange={(e) => onChange(e,question.id)}>
                    {OPTIONS.map((option) => (
                        <FormControlLabel
                            key={option.label}
                            value={option.value}
                            control={<Radio required={(question as ApplicationQuestion).required}/>}
                            label={option.label}
                        />
                    ))}
                    <FormControlLabel
                        sx={{ visibility: 'hidden' }}
                        value="null"
                        control={<Radio />}
                        label="No"
                    />
                </RadioGroup>
            </FormControl>
        );
    }
    if(reference){
        return (
            <FormControl component="fieldset">
                <FormLabel className="question">{question.displayText}</FormLabel>
                <RadioGroup id={question.id} row onChange={handleChange}>
                    {OPTIONS.map((option) => (
                        <FormControlLabel
                            key={option.label}
                            value={option.value}
                            control={<Radio required={(question as ApplicationQuestion).required}/>}
                            label={option.label}
                            
                        />
                    ))}
                    <FormControlLabel
                        sx={{ visibility: 'hidden' }}
                        value="null"
                        control={<Radio />}
                        label="No"
                    />
                </RadioGroup>
            </FormControl>
        );
    }
    return <></>
};
