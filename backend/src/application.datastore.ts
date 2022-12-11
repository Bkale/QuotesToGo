import type { Application, ApplicationSection } from '../../shared-types';
import { v4 as uuid } from 'uuid';
import BaseCurationApplication from './data/curation-application.json';

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
        const newApp = {
            id: uuid(),
            carriers: args.carriers,
            content: BaseCurationApplication as ApplicationSection[],
        };
        this.data.set(newApp.id, newApp);
        return newApp;
    }

    public getById(id: string): Application | null {
        return this.data.get(id) ?? null;
    }

    public getAll(): Application[] {
        return [...this.data.values()];
    }
}
