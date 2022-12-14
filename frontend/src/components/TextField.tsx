import React, { MutableRefObject } from "react";
import { ApplicationNode, ApplicationQuestion } from '../../../shared-types';
import { TextField as MuiTextField, TextFieldProps } from '@mui/material';

interface Props {
    question: ApplicationNode | ApplicationQuestion ;
    onChange?: (e:any ,id: string) => void;
    // reference?: MutableRefObject<[]> 
    reference?: MutableRefObject<(HTMLDivElement | null)[]> 
}

export const TextField: React.VFC<Props> = ({ question, onChange, reference }) => {
    if(onChange){
        return (
            <MuiTextField
                name={question.id}
                label={(question as ApplicationQuestion).displayText}
                variant="standard"
                style={textStyles}
                required={(question as ApplicationQuestion).required}
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
                required={(question as ApplicationQuestion).required}
                inputRef={ele => (reference.current[(question as ApplicationQuestion).id as unknown as number] = ele)}
            />
        );
    }
    return <></>
};

const textStyles: TextFieldProps['style'] = {
    width: '100%',
};
