import BaseCurationApplication from './data/curation-application.json';
import CnaQuestions from './data/cna.mapping.json';
import ChubbQuestions from './data/chubb.mapping.json';
import HartfordQuestions from './data/hartford.mapping.json';
import { ApplicationQuestion } from '../../shared-types';

export interface ApplicationCreateArgs {
  carriers: string[];
};
export interface CarrierQuestionsArgs {
  id: string;
  displayText: string, 
  mappedCurationQuestion: string, 
  required: boolean | {if: string, eq: boolean} 
};

const filterSubSections = (subSecs: any[], curatedQuestions: {[key: string] : CarrierQuestionsArgs}) => {
  let newsubArr: any[] = [];

  subSecs.map((item, i) => {
    let questionsArr = item.children;
    let newSec = {};

    if(item.type === "Question" && curatedQuestions[item.id]) {
      let filteredQues: any[] = []
      item["required"] = curatedQuestions[item.id].required;
      filteredQues.push(item)
      newSec = item;
      if(filteredQues.length > 0) newsubArr.push(newSec)
    }

    if(item.type === "Section"){
      let filteredQues: any[] = []
      questionsArr.map((question: ApplicationQuestion)  => {
        if(curatedQuestions[question.id]){
          question["required"] = curatedQuestions[question.id].required;
          filteredQues.push(question);
        }
      })
      newSec = {...item, children: filteredQues}
      if(filteredQues.length > 0) newsubArr.push(newSec)
    }
  });

  return newsubArr;
}



export const curatedApplication = (arg:ApplicationCreateArgs) => {
  const carriersArr = arg.carriers;
  let curatedQuestions: {[key: string] : CarrierQuestionsArgs} = {}
  let appAnswerLookup:{[key: string]: {}} = {}

  carriersArr.map(carrier => {
    switch (carrier) {
      case "cna":
        CnaQuestions.questions.map(ques => {
          if(!Object.keys(curatedQuestions).some(el => el === ques.mappedCurationQuestion)){
            let key = ques.mappedCurationQuestion;
            curatedQuestions[key as keyof typeof curatedQuestions] = ques;
            appAnswerLookup[key as keyof typeof curatedQuestions] = {
              isRequired: ques.required,
              value: null
            };
          }
        })
        break;
      case "hartford":
        HartfordQuestions.questions.map(ques => {
          if(!Object.keys(curatedQuestions).some(el => el === ques.mappedCurationQuestion)){
            let key = ques.mappedCurationQuestion;
            curatedQuestions[key as keyof typeof curatedQuestions] = ques;
            appAnswerLookup[key as keyof typeof curatedQuestions] = {
              isRequired: ques.required,
              value: null
            };

            if (typeof(ques.required) !== 'boolean'){
              appAnswerLookup[key as keyof typeof curatedQuestions] = {
                isRequired: ques.required.eq,
                value: null
              };
            } 
          }
        })
        break;
      case "chubb":
        ChubbQuestions.questions.map(ques => {
          if(!Object.keys(curatedQuestions).some(el => el === ques.mappedCurationQuestion)){
            let key = ques.mappedCurationQuestion;
            curatedQuestions[key as keyof typeof curatedQuestions] = ques;
            appAnswerLookup[key as keyof typeof curatedQuestions] = {
              isRequired: ques.required,
              value: null
            };

            if (typeof(ques.required) !== 'boolean'){
              appAnswerLookup[key as keyof typeof curatedQuestions] = {
                isRequired: ques.required.eq,
                value: null
              };
            } 
          }
        })
        break;
      default:
        break;
    }
  });

  let curatedApp: any[] = [];
  BaseCurationApplication.map((mainSections, i) => {
    let filterSubSection = filterSubSections(mainSections.children, curatedQuestions);
    curatedApp.push({...mainSections, children: filterSubSection})
  })
  return {curatedApp, appAnswerLookup};
}