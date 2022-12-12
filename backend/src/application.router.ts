import type { Application } from '../../shared-types';
import express, { Request, Response } from 'express';
import {
    ApplicationCreateArgs,
    ApplicationDataStore,
} from './application.datastore';

export const applicationRouter = express.Router();

export const datastore = new ApplicationDataStore();

applicationRouter.get('/all', async (_req, res: Response<Application[]>) => {
    try {
        const allApplications = datastore.getAll();
        res.status(200).send(allApplications);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

applicationRouter.get(
    '/:id',
    async (req: Request<{ id: string }>, res: Response<Application | null>) => {
        try {
            const app = datastore.getById(req.params.id);
            res.status(200).send(app);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    }
);

applicationRouter.post(
    '/new',
    async (
        req: Request<any, any, ApplicationCreateArgs>,
        res: Response<Application>
    ) => {
        try {
            const args = req.body;
            const newApplication = datastore.create(args);

            res.status(200).send(newApplication);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    }
);

applicationRouter.post(
    '/submit',
    async (
        req: Request<Application>,
        res: Response<Application[]>
    ) => {
        try {
            const args = req.body;
            console.log(args);
            
            // console.log("ARGS: ",args)
            datastore.submit(args);
            const allApplications = datastore.getAll();
            res.status(200).send(allApplications);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    }
);
