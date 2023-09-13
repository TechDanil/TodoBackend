import express from 'express';
import router from './router/router';
import bodyParser from 'body-parser';
import cors from 'cors';
import knex from 'knex';
import { Model } from 'objection';
import passport from './utils/passport';
const knexConfig = require('../knexfile');

const app = express();
app.use(passport.initialize());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const knexInstance = knex(knexConfig.development);

Model.knex(knexInstance);

app.use('/api', router);

const port = 3001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});