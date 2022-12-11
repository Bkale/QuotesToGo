import { BoxProps, Box } from '@mui/material';
import { ApplicationQuestion } from '../../../shared-types';
import { RadioBooleanField } from './RadioBooleanField';
import { SectionRenderer } from './SectionRenderer';
import { SelectField } from './SelectField';
import { TextField } from './TextField';

interface Props {
    question: ApplicationQuestion;
    depth: number;
}

export const QuestionRenderer: React.VFC<Props> = (props) => {
    const { question } = props;
    const FieldComponent =
        question.componentType === 'text' ? (
            <TextField question={question} />
        ) : question.componentType === 'radioBoolean' ? (
            <RadioBooleanField question={question} />
        ) : (
            <SelectField question={question} />
        );
    return (
        <Box style={{ ...questionProps, marginLeft: `${props.depth * 40}px` }}>
            {FieldComponent}
            {props.question.children?.map((child) => {
                if (child.type === 'Section') {
                    return (
                        <SectionRenderer
                            section={child}
                            depth={props.depth + 1}
                        />
                    );
                }
                return (
                    <QuestionRenderer
                        question={child}
                        depth={props.depth + 1}
                    />
                );
            })}
        </Box>
    );
};

const questionProps: BoxProps['style'] = {
    width: '400px',
    marginTop: '20px',
};
