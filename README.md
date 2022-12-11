# QuoteWell - Quotes To Go - Take Home Project

Welcome to the Quotes To Go, the QuoteWell take-home project.

## Overview

The goal of this take-home exercise is to allow you to showcase your strengths by improving this bare-bones application. This project is intended to resemble a heavily simplified version of what QuoteWell's Agent Portal does: allow Insurance Agents to fill out one centralized form and submit it to multiple Carriers.

This app (Quotes to Go) compiles and runs in its current state but has many deficiencies, and needs a lot of improvement before it could be put in front of a user. Your task is to improve it in the ways you are best suited. We have created a "Feature Requests" section below with ideas for improvements, should you want any ideas or inspiration, but ultimately how you choose to improve the project is up to you.

If you'd like to include any kind of writeup on any decisions you made, feel free, but this is not a strict requirement.

### Timeline

You will have a week to work on the take-home - we suggest spending around 4-6 hours over that time to make improvements.

# Dev Setup

## Contents

You are likely downloading this from an email attachment. In this case, first, unzip the file.

### !! Important !!

It's helpful for us in reviewing your submission to view a commit history. Please run `git init` inside your new directory and attempt to commit your changes as you go, so we can review your changes as a set of diffs. (See submission instructions below)

### Layout

This repository consists of three directories:

-   /backend
    -   The self-contained web-server for the Quotes To Go App
-   /frontend
    -   The React frontend application
-   /shared-types
    -   For a simplest-possible way of sharing types that are sent over the wire
    -   This directory only exports types, no code that is used at runtime

## Pre-Requisites

You'll want to have yarn and node installed on your computer

-   Docs (Node): https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-installer-to-install-node-js-and-npm
-   Docs (Yarn): https://yarnpkg.com/getting-started/install

## Running the App

To run the backend

1. cd `backend`
2. Run `yarn`
3. Run `yarn dev`
   You should see a message that says `"Listening on Port 5001"...`

To run the frontend

1. cd `frontend`
2. `yarn`
3. `yarn dev`
   This should open up a browser tab at `localhost:3001` in your default browser.

# User Story

Quotes To Go (this project) and QuoteWell (our real application) both strive to allow users (Insurance Agents) to fill out forms (Applications) in order to make submissions to multiple carriers. Our goal is to index insurance carriers’ requirements (the data they require in order to provide a quote) then display as few form fields as required to the agent, based on the carriers they have selected.

# Implementation

In Quotes To Go (and QuoteWell), we curate a centralized "Curation Application" for each insurance product that we offer. This Curation Application is a superset of questions that we have found across carriers, written in our preferred wording and mapped many->one from source carriers.

Right now, in the Quotes To Go backend, we simply return our entire Curation Application whenever a user starts a new Application in the frontend, and do nothing with the carriers that they provided. In an ideal world, we would return some subset of that Curation Application based on the carriers that were selected.

On the backend, our application instances are stored in an in-memory Map. This means they get wiped on server restart, but for the purposes of this take-home project (and even demoing to a user) this is acceptable.

# Feature Requests

### Ability to persist the values that users add for an application.

-   Right now users can create applications, load questions, and enter data into the components, but that data is not stored anywhere. It is crucial for users to be able to save these values so that an application can be submitted or resumed/loaded at a later point in time.
-   Requirements:
    -   Implement a Submit button and endpoint for user-entered data
    -   Store the user-entered data in the backend
        -   OK to store values in-memory
    -   Ability to load an application with previously entered data in the frontend

### Filter down the set of questions asked to only those which are present in the mapping files for the selected carrier(s)

-   Right now our app returns the entire Curation Application, no matter which carriers have been specified. In reality, based on the carriers that a user selects, we may be able to ask them fewer questions (only those which appear in the carrier(s) they selected)
-   Requirements:
    -   Use the `*.mapping.json` files in the `backend/data` directory to filter down the curation application to only questions that need to be asked.

### Calculate the requiredness of each field based on the requiredness (isRequired:true/false) specified in its mapped carrier question(s)

-   Right now our applications have no concept of required/unrequired. But the carrier questions in the mapping files tell us which questions are required in the carrier form(s).
-   Requirements:
    -   Enforce required fields in the frontend, with `required: true/false` calculated by the requiredness of the questions defined in `*.mapping.json` for the carriers selected on the application

### Implement conditionally shown/hidden fields based on the `conditions` present in the curation-application.json

-   Right now our application shows every field, all the time. But there is data in the curation-application.json that tells us the conditions under which a question can be shown or hidden.
-   Requirements:
    -   Use the `conditions` values present in curation-application.json to hide/show certain fields based on the current values of other fields in the current application.

### Persist Application Instance data in a database (rather than in memory)

-   Right now our application stores all data in-memory, but this could be persisted across server restarts if it were stored in a proper database.
-   Requirements:
    -   Replace the in-memory Map in `application.datastore.ts` with something more persistant

### Better styling for the frontend

-   Right now our application looks quite spartan, and is not particularly mature design-wise
-   Requirements:
    -   Replace the existing components with something that is more pleasant to use and makes clear to the user what the intended workflow is

# Submission

## How to Submit

-   Make sure you have run `git init` in the root folder
-   `git bundle create <your-name>.bundle --all` and submit to the Greenhouse link
