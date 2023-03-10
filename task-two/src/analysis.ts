/**
 * First task - Read the csv files in the inputPath and analyse them
 *
 * @param {string[]} inputPaths An array of csv files to read
 * @param {string} outputPath The path to output the analysis
 */

import fs from 'fs';
import dns from 'dns'
import validator from 'email-validator';

function analyseFiles(inputPaths: string[], outputPath: string) {
  const emailsFromFs = fs.readFileSync(inputPaths[0], 'utf-8');
  const emailsFromFsArr = emailsFromFs.trim().split('\n').slice(1);
  const validEmails = emailsFromFsArr.filter((email: string) => {
    return validator.validate(email) === true;
  });

  const validEmailDomainsCount: any = {};
  for (const emails of validEmails) {
    const domains = emails.split('@')[1];

    if (validEmailDomainsCount[domains]) {
      validEmailDomainsCount[domains]++;
    } else {
      validEmailDomainsCount[domains] = 1;
    }
  }
  const validEmailDomains: string[] = Object.keys(validEmailDomainsCount);

  const output = {
    'valid-domains': validEmailDomains,
    totalEmailsParsed: emailsFromFsArr.length,
    totalValidEmails: validEmails.length,
    categories: validEmailDomainsCount,
  };

  const outputDatas = JSON.stringify(output, null, 1);
//cconsole.log(outputDatas);
  fs.writeFileSync(outputPath, outputDatas);
}

analyseFiles(['./fixtures/inputs/medium-sample.csv'], 'report-analysis.json')

export default analyseFiles;
