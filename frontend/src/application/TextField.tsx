import React, { MutableRefObject } from "react";
import { ApplicationNode, ApplicationQuestion } from '../../../shared-types';
import { TextField as MuiTextField, TextFieldProps } from '@mui/material';

interface Props {
    question: ApplicationNode | ApplicationQuestion ;
    onChange?: (e:any ,id: string) => void;
    reference?: MutableRefObject<[]> 
}

export const TextField: React.VFC<Props> = ({ question, onChange, reference }) => {
    if(onChange){
        return (
            <MuiTextField
                name={question.id}
                label={(question as ApplicationQuestion).displayText}
                variant="standard"
                style={textStyles}
                onChange={(e) => onChange(e,question.id)}
            />
        );
    }
    if(reference){
        return (
            <MuiTextField
                name={question.id}
                label={(question as ApplicationQuestion).displayText}
                variant="standard"
                style={textStyles}
                inputRef={ele => (reference.current[question.id] = ele)}
            />
        );
    }
    return <></>
};

const textStyles: TextFieldProps['style'] = {
    width: '100%',
};
