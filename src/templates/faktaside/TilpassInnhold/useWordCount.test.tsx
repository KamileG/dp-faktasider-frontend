/*
TODO denne testen må nok implementeres med Cypruss el. .innerText som brukes av useWordCount støttes ikke i jsdom
https://stackoverflow.com/questions/47902335/innertext-is-undefined-in-jest-test

describe('wordCount teller riktig antall opprinnelige og skjulte ord', () => {
  test('Når litt tekst er skjult', async () => {
    expect(true).toBeTruthy();
    const result = render(<TestFaktaside
      partialContext={{ innhold: wordCountTestData, relatertInformasjon: [], kortFortalt: [] }}/>);
      const tilpassInnhold = result.getByLabelText(/tilpass/i)

      toggleFilter(result, /permittert/i);
      within(tilpassInnhold).getByText('viser nå 20 av 34 ord');
  });
});

*/
