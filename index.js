import { argv } from 'process';
import argsParser from 'args-parser';
import { faker } from '@faker-js/faker';
import path from 'path';
import { fileURLToPath } from 'url';
import { mkdir, writeFile } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.join(__dirname, '/data');
const args = argsParser(argv);

if (!args['num']) {
  args['num'] = 1;
}

if (isNaN(parseInt(args['num']))) {
  console.error('num is not a valid number');
  process.exit();
}

const promises = Array.from({
  length: parseInt(args['num']),
}).map((_, i) => generateTenant(i));

async function generateTenant(i) {
  const data = generateTenantData();
  const dirPath = await createDirectoryIfNotExists(baseDir);
  const filePath = path.join(dirPath, `${i}.json`);
  await writeJson(filePath, data);
}

function generateTenantData() {
  const emailProvider = 'getnada.com';
  const gender = Math.floor(Math.random() * 10) % 2 === 0 ? 'male' : 'female';
  const firstName = faker.person.firstName(gender);
  const lastName = faker.person.lastName();
  const email = faker.internet.email({
    firstName,
    lastName,
    provider: emailProvider,
  });
  const phone = faker.phone.number('+23480########');
  const address1 = faker.location.streetAddress();
  const stateId = 'd37deb31-15f2-4062-8310-5d2bda43a11c';
  const countryId = 'f1a93271-2443-4c68-9373-30540fb106e7';
  const company = faker.company.name();
  const companyEmail = faker.internet.email({
    firstName: company,
    lastName: null,
    provider: emailProvider,
  });

  return {
    userInfo: {
      firstName,
      lastName,
      email,
      phone,
      countryId,
      stateId,
      address1,
    },
    billingInfo: {
      firstName,
      lastName,
      email,
      phone,
      countryId,
      stateId,
      address1,
    },
    tenantInfo: {
      name: company,
      email: companyEmail,
      phone,
      address1,
      countryId,
      stateId,
    },
    subscriptionInfo: {
      modules: [
        '01311f53-fe2c-4f19-a495-23cdfb604022',
        '1f0e8c86-5f27-4645-a6f8-1efec0ba3c99',
        '3dd8585c-1c60-49fa-8609-b5175a467fd3',
        'd44b7a6b-ecb2-43d1-8ae2-c18b9a18e808',
        'dabcec2b-28a3-4861-bc47-c99451dcaa72',
        '6e418c20-4b90-4411-a323-7aab56b6f275',
      ],
    },
  };
}

async function createDirectoryIfNotExists(dirPath) {
  return new Promise((resolve, reject) => {
    mkdir(dirPath, { recursive: true }, (err) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(dirPath);
      }
    });
  });
}

async function writeJson(path, data) {
  return new Promise((resolve, reject) => {
    writeFile(path, JSON.stringify(data, null, 4), (err) => {
      if (err) {
        console.log('🚀 err:', err);
        return reject(err);
      } else {
        return resolve(null);
      }
    });
  });
}

Promise.all(promises)
  .catch((e) => {
    console.log('exiting...');
    console.error(e);
    process.exit(1);
  })
  .then(() => {
    console.log('Tenants generated successfully!');
    process.exit(0);
  });
