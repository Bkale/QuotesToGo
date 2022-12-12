/*
  The basic shape of our simplified Application:

  We read in config data from Portals, PDFs and other sources to compile a set of Questions to ask our users.
  These Questions are organized into an arbitrarily nested set of Sections. Both Questions and Sections are considered Nodes in our Application.

  Feel free to alter this data structure as you see fit

*/
export interface Application {
    id: string;

    carriers: string[];

    content: ApplicationSection[];

    answerLookup: {[key: string]: string}
}

/* 
  An ApplicationSection is essentially a bucket with a header (label) and an array of children underneath it
*/
export interface ApplicationSection {
    id: string;

    type: 'Section';

    title?: string;

    children?: ApplicationNode[];

    // An array of ApplicationConditions is considered to be an AND filter
    conditions?: ApplicationCondition[];
}

/*
  An ApplicationQuestion is 
*/
export interface ApplicationQuestion {
    id: string;

    type: 'Question';

    displayText: string;

    componentType?: ApplicationComponentType;

    options?: string[];

    // Questions may have children too - can be useful to organize chains of dependent questions
    children?: ApplicationNode[];

    // An array of ApplicationConditions is considered to be an AND filter
    conditions?: ApplicationCondition[];
}

// Union type of Section and Question
export type ApplicationNode = ApplicationQuestion | ApplicationSection;

/*
  Conditions are present on both questions and sections, and tell us whether or not to render that section or question based on the answers provided by the user
  The expectation is that if a Question or Section either has no conditions, or ALL of its conditions evaluate to "true" 
  (meaning the answer to the referenced question equals the expected value)
  then the Question/Section should be displayed
*/
export interface ApplicationCondition {
    subjectId: string;

    displayIfEquals: string | boolean;
}

/*
  Right now, we can slim down the number of front-end components we support to Text, Radio and Selects
*/
export enum ApplicationComponentType {
    Text = 'text',
    RadioBoolean = 'radioBoolean',
    Select = 'select',
}
