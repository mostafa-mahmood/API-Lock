import express from 'express';
import {generateKeyHandler,
        validateKeyHandler,
        revokeKeyHandler} from '../controller/keys.controller';

export const router = express.Router();

router.post('/keys', generateKeyHandler); // generate new key

router.post('/keys/validate', validateKeyHandler);

router.post('/keys/revoke', revokeKeyHandler);

