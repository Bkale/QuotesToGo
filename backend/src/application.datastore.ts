import type { Application, ApplicationSection } from '../../shared-types';
import { v4 as uuid } from 'uuid';
import {curatedApplication} from './curatedApplication';

export interface ApplicationCreateArgs {
    carriers: string[];
}

export enum ValidCarriers {
    Chubb = 'chubb',
    CNA = 'cna',
    TheHartford = 'hartford',
}

export class ApplicationDataStore {
    private data: Map<string, Application>;
    constructor() {
        this.data = new Map<string, Application>();
    }

    public create(args: ApplicationCreateArgs): Application {
        const {curatedApp, appAnswerLookup} = curatedApplication(args)
        
        const newApp = {
            id: uuid(),
            carriers: args.carriers,
            content: curatedApp as ApplicationSection[],
            answerLookup: appAnswerLookup
        };
        this.data.set(newApp.id, newApp);
        return newApp;
    }

    public submit(args: Application): Application | null{
        let {id} = args;

        this.data.set(id, args);
        return this.data.get(id) ?? null;
    }
    
    public getById(id: string): Application | null {
        return this.data.get(id) ?? null;
    }

    public getAll(): Application[] {
        return [...this.data.values()];
    }
}
