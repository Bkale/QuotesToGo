import { MutableRefObject } from 'react';
import { Box, BoxProps, Typography } from '@mui/material';
import { ApplicationSection } from '../../../shared-types';
import { QuestionRenderer } from './QuestionRenderer';

interface Props {
    section: ApplicationSection;
    depth: number;
    onChange: (event: { target: { value: any; }; }, questionId: string) => void;
    answers: {[key: string]: string}
    reference?: MutableRefObject<(HTMLDivElement | null)[]> 
    // reference?: MutableRefObject<[]> 

}

export const SectionRenderer: React.VFC<Props> = (props) => {
    return (
        <Box style={{ ...sectionStyle, marginLeft: `${props.depth * 40}px` }}>
            {!!props.section.title ? (
                <Typography variant={`h${props.depth + 2}` as any}>
                    {props.section.title}
                </Typography>
            ) : undefined}
            {props.section.children?.map((child) => {
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

const sectionStyle: BoxProps['style'] = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
};
