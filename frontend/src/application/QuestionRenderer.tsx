import { MutableRefObject } from 'react';
import { BoxProps, Box } from '@mui/material';
import { ApplicationNode, ApplicationQuestion, ApplicationSection } from '../../../shared-types';
import { RadioBooleanField } from './RadioBooleanField';
import { SectionRenderer } from './SectionRenderer';
import { SelectField } from './SelectField';
import { TextField } from './TextField';
// REDUX
import { useAppSelector } from "src/redux/reduxHooks";
import {RootState} from 'src/redux/store';

interface Props {
    question: ApplicationNode;
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
            <SelectField question={(question as ApplicationQuestion)} onChange={props.onChange}/>
        )
    ) : (
        (question as ApplicationQuestion).componentType === 'text' ? (
            <TextField question={question}  reference={props.reference}/>
        ) : (question as ApplicationQuestion).componentType === 'radioBoolean' ? (
            <RadioBooleanField question={(question as ApplicationQuestion)} reference={props.reference}/>
        ) : (
            <SelectField question={(question as ApplicationQuestion)} reference={props.reference}/>
        )
    );

    const getValue = (value: string) => {
        if(value){
            return value.toLowerCase() === "true" ? true
            : value.toLowerCase() === "false" ? false
            : value;    
        }
        return <></>;
    }
    return (
        <Box style={{ ...questionProps, marginLeft: `${props.depth * 40}px` }}>
            {FieldComponent}
            {props.question.children?.map((child: ApplicationNode, i: any) => {
                if(child.conditions){
                    if (child.type === 'Section') {
                            if(getValue(props.answers[child.conditions[0].subjectId]) === child.conditions[0].displayIfEquals){
                                return (
                                    <SectionRenderer
                                        section={child}
                                        depth={props.depth + 1}
                                        reference={props.reference}
                                        onChange={props.onChange}
                                        answers={props.answers}
                                    />
                                );
                            }
                    } 
    
                    if(getValue(props.answers[child.conditions[0].subjectId]) === child.conditions[0].displayIfEquals){
                        return (
                            <QuestionRenderer
                                question={child}
                                depth={props.depth + 1}
                                reference={props.reference}
                                onChange={props.onChange}
                                answers={props.answers}
                            />
                        );
                    }
                }
                return <></>;
            })}
        </Box>
    );
};

const questionProps: BoxProps['style'] = {
    width: '400px',
    marginTop: '20px',
};
