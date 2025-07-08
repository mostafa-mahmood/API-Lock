import { Request, Response, RequestHandler } from "express";
import { generateRequestSchema } from "../../schemas/key.schema";
import { generateKeyObject } from "../../services/key-generator";
import { validateKey } from "../../services/key-validator";
import { insertKey } from "../../db/key-insert.repository";
import { updateLastUsed } from "../../db/update-last-used.repository";
import { keyRevoker } from "../../services/key-revoker";
import { sha256Hash } from "../../utils/common-utils";

export const generateKeyHandler: RequestHandler = async (req: Request, res: Response) => {

          const parsedBody = generateRequestSchema.safeParse(req.body);

          if(!parsedBody.success) {
                    res.status(400).json({
                              error: 'invalid request body',
                              details: parsedBody.error.flatten()
                    });
                    return;
          }

          const {userId, scopes, expiresAt, isOneTime} = parsedBody.data;

          const keyObj = generateKeyObject(userId, scopes, isOneTime, expiresAt);

          await insertKey(keyObj);

          res.status(201).json(keyObj);
          return;
}

export const validateKeyHandler: RequestHandler = async (req: Request, res: Response) => {
          const authHeader = req.headers.authorization;

          if(!authHeader) {
                    res.status(401).json({
                              error: 'Missing Authorization Header'
                    });
                    return;
          }

          // handels both Bearer or ApiKey scheme and trims header to extract just key
          const rawKey = authHeader.replace(/^(Bearer|ApiKey)\s+/i, '').trim();
          
          const validationObj = await validateKey(rawKey);

          if(!validationObj.valid) {
                    res.status(401).json(validationObj);
                    return;
          }

          await updateLastUsed(validationObj.keyId);
          res.status(200).json(validationObj);
          return;
}

export const revokeKeyHandler: RequestHandler = async (req: Request, res: Response) => {
          const authHeader = req.headers.authorization;

          if(!authHeader) {
                    res.status(401).json({
                              error: 'Missing Authorization Header'
                    });
                    return;
          }

          const rawKey = authHeader.replace(/^(Bearer|ApiKey)\s+/i, '').trim();
          const hashedKey = sha256Hash(rawKey);
          const revokeObj = await keyRevoker(hashedKey);
          res.status(200).json(revokeObj);
          return;
}