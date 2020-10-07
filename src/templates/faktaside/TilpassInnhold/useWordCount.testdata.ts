import { createSanityBlock, createSanityBlockMedVisFor } from '../../../testUtils/createSanityBlock';
import parseRichText from '../../../utils/richTextUtils/parser/parseRichText';

export const wordCountTestData = parseRichText([
  createSanityBlock('Overskrift tre ord', 'h2'),
  createSanityBlockMedVisFor('Dette er litt studenttekst seks ord', 'normal', { student: true }),
  createSanityBlockMedVisFor('Dette er tekst til permitterte sju ord', 'normal', { permittert: true }),
  createSanityBlockMedVisFor('Dette er mer tekst til studenter åtte ord', 'normal', { student: true }),
  createSanityBlockMedVisFor('Overskrift til permitterte fem ord', 'h2', { permittert: true }),
  createSanityBlock('Teskt i bolk fem ord', 'normal'),
]);
