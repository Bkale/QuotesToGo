import { ApplicationQuestion } from '../../../shared-types';
import { TextField as MuiTextField, TextFieldProps } from '@mui/material';

interface Props {
    question: ApplicationQuestion;
    onChange?: () => void;
}

export const TextField: React.VFC<Props> = ({ question, onChange }) => {
    return (
        <MuiTextField
            name={question.id}
            label={question.displayText}
            variant="standard"
            style={textStyles}
        />
    );
};

const textStyles: TextFieldProps['style'] = {
    width: '100%',
};
