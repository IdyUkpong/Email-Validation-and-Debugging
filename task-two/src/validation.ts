/**
 * Stretch goal - Validate all the emails in this files and output the report
 *
 * @param {string[]} inputPath An array of csv files to read *
 * @param {string} outputFile The path where to output the report
 */

import fs from 'fs';
import validator from 'email-validator';
import dns from 'dns';

async function validateEmailAddresses(inputPath: string[], outputFile: string) {
  console.log('Complete the implementation in src/validation.ts');

  const emailsFromFs = fs.readFileSync(inputPath[0], 'utf-8');
  const emailsFromFsArr = emailsFromFs.trim().split('\n').slice(1);

  const validEmails = emailsFromFsArr
    .map((email: any) => {
      if (validator.validate(email)) return email;
    })
    .filter((email: string | undefined) => email !== undefined);

  const validEmailDomains = validEmails.map((email: string) =>
    dns.promises
      .lookup(email.split('@')[1])
      .then(() => email)
      .catch(() => undefined),
  );
  validEmailDomains;
  const resolvedEmailDomains = await Promise.all(validEmailDomains);
  resolvedEmailDomains;
  const validDomains = resolvedEmailDomains.filter(
    (email: string | undefined) => email !== undefined,
  );

  const emailArr = fs.readFileSync(inputPath[0], 'utf8').trim().split('\n');
  validDomains.unshift(emailArr[0]);

  const finalEmailArr = validDomains.join('\n');

  fs.writeFileSync(outputFile, finalEmailArr);
}

validateEmailAddresses(
  ['fixtures/inputs/medium-sample.csv'],
  'report-validation.csv',
);

export default validateEmailAddresses
