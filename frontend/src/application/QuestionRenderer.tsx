import { MutableRefObject } from 'react';
import { BoxProps, Box } from '@mui/material';
import { ApplicationQuestion } from '../../../shared-types';
import { RadioBooleanField } from './RadioBooleanField';
import { SectionRenderer } from './SectionRenderer';
import { SelectField } from './SelectField';
import { TextField } from './TextField';
// REDUX
import { useAppSelector } from "src/redux/reduxHooks";
import {RootState} from 'src/redux/store';

interface Props {
    question: ApplicationQuestion;
    depth: number;
    onChange: (event: { target: { value: any; }; }, questionId: string) => void;
    answers: {[key: string]: string}
    reference?: MutableRefObject<[]> 
}

export const QuestionRenderer: React.VFC<Props> = (props) => {
    const {selectedAppId} = useAppSelector((state: RootState) => state.applications);
    const { question } = props;

    // DOES QUESTION HAVE CHILDREN? IF YES IT NEEDS TO BE TRACKED IN STATE FOR CONDITIONAL RENDER ONCHANGE
    // ELSE PASS IT A REF TO PREVENT UNNESSARY RERENDERS
    const FieldComponent = question.children ? (
        (question as ApplicationQuestion).componentType === 'text' ? (
            <TextField question={question}  onChange={props.onChange}/>
        ) : (question as ApplicationQuestion).componentType === 'radioBoolean' ? (
            <RadioBooleanField question={(question as ApplicationQuestion)} onChange={props.onChange}/>
        ) : (
            <SelectField question={question} onChange={props.onChange}/>
        )
    ) : (
        (question as ApplicationQuestion).componentType === 'text' ? (
            <TextField question={question}  reference={props.reference}/>
        ) : (question as ApplicationQuestion).componentType === 'radioBoolean' ? (
            <RadioBooleanField question={(question as ApplicationQuestion)} reference={props.reference}/>
        ) : (
            <SelectField question={question} reference={props.reference}/>
        )
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
                            onChange={props.onChange}
                            answers={props.answers}
                            reference={props.reference}
                        />
                    );
                }
                return (
                    <QuestionRenderer
                        question={child}
                        depth={props.depth + 1}
                        onChange={props.onChange}
                        answers={props.answers}
                        reference={props.reference}
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
