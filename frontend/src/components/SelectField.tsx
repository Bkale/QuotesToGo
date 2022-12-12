import { ApplicationQuestion } from '../../../shared-types';
import {
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    Select as MuiSelect,
    SelectProps,
} from '@mui/material';
import { MutableRefObject } from 'react';

interface Props {
    question: ApplicationQuestion;
    onChange?: (e:any ,id: string) => void;
    // reference?: MutableRefObject<[]> 
    reference?: MutableRefObject<(HTMLDivElement | null)[]> 
}

export const SelectField: React.VFC<Props> = ({ question, onChange, reference}) => {
    if(onChange){
        return (
            <FormControl required={(question as ApplicationQuestion).required} variant="standard" fullWidth>
               { question.displayText? <InputLabel>{question.displayText}</InputLabel> : <InputLabel>{question.text}</InputLabel> }
                <MuiSelect  style={selectStyles} onChange={(e) => onChange(e,question.id)}>
                    {question.options?.map((option) => (
                        <MenuItem key={option} value={option}>
                            <ListItemText primary={option} />
                        </MenuItem>
                    ))}
                </MuiSelect>
            </FormControl>
        );
    }
    if(reference){
        return (
            <FormControl required={(question as ApplicationQuestion).required} variant="standard" fullWidth>
               { question.displayText? <InputLabel>{question.displayText}</InputLabel> : <InputLabel>{question.text}</InputLabel> }
                <MuiSelect required={(question as ApplicationQuestion).required} style={selectStyles} inputRef={ele => (reference.current[question.id as unknown as number] = ele)}>
                    {question.options?.map((option) => (
                        <MenuItem key={option} value={option}>
                            <ListItemText primary={option} />
                        </MenuItem>
                    ))}
                </MuiSelect>
            </FormControl>
        );
    }
    return <></>
};

const selectStyles: SelectProps['style'] = {
    width: '100%',
};
