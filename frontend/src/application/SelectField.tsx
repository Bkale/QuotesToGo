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
    reference?: MutableRefObject<[]> 
}

export const SelectField: React.VFC<Props> = ({ question, onChange, reference}) => {
    if(onChange){
        return (
            <FormControl variant="standard" fullWidth>
                <InputLabel>{question.displayText}</InputLabel>
                <MuiSelect style={selectStyles} onChange={(e) => onChange(e,question.id)}>
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
            <FormControl variant="standard" fullWidth>
                <InputLabel>{question.displayText}</InputLabel>
                <MuiSelect style={selectStyles} inputRef={ele => (reference.current[question.id] = ele)} onChange={(e) => onChange(e,question.id)}>
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
