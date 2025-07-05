import {generateKeyObject} from '../services/key-generator';
import {insertKey} from '../db/key-store.repository';

async function main(): Promise<void> {
          const keyObj = generateKeyObject('user_35326', ['read', 'write'], false);
          console.log(`new key before hash: ${keyObj.key}`);

          try {
                    await insertKey(keyObj);
                    console.log('Key Stored in DB successfuly');
          } catch(err) {
                    console.error(`Error Inserting Into DB: ${err}`);
          }
}

main();
