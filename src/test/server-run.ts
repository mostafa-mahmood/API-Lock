import express from 'express';
import {config} from '../config/config';
import {router} from '../server/routes/keys.routes'

const app = express();

app.use(express.json());
app.use('/', router);

app.listen(config.app.port, () => {
          console.log(`Server Running On PORT: ${config.app.port}`);
})