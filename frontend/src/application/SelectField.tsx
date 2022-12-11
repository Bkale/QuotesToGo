import { ApplicationQuestion } from '../../../shared-types';
import {
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    Select as MuiSelect,
    SelectProps,
} from '@mui/material';

interface Props {
    question: ApplicationQuestion;
    onChange?: () => void;
}

export const SelectField: React.VFC<Props> = ({ question, onChange }) => {
    return (
        <FormControl variant="standard" fullWidth>
            <InputLabel>{question.displayText}</InputLabel>
            <MuiSelect style={selectStyles}>
                {question.options?.map((option) => (
                    <MenuItem key={option} value={option}>
                        <ListItemText primary={option} />
                    </MenuItem>
                ))}
            </MuiSelect>
        </FormControl>
    );
};

const selectStyles: SelectProps['style'] = {
    width: '100%',
};
