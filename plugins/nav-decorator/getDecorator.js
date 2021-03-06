const request = require("request");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const breadcrumbs = JSON.stringify([{ title: "Arbeidssøker eller permittert", url: "https://www.nav.no/arbeid/no/" }]);

const requestDecorator = (callback) => {
  const url = `https://www.nav.no/dekoratoren/?breadcrumbs=${breadcrumbs}&context=privatperson&chatbot=true`;
  return request(url, callback);
};

const getDecorator = () =>
  new Promise((resolve, reject) => {
    const callback = (error, response, body) => {
      if (!error && response.statusCode >= 200 && response.statusCode < 400) {
        const { document } = new JSDOM(body).window;
        const data = {
          NAV_SCRIPTS: document.getElementById("scripts").innerHTML,
          NAV_STYLES: document.getElementById("styles").innerHTML,
          NAV_HEADING: document.getElementById("header-withmenu").innerHTML,
          NAV_FOOTER: document.getElementById("footer-withmenu").innerHTML,
        };
        resolve(data);
      } else {
        reject(new Error(error));
      }
    };
    requestDecorator(callback);
  });

module.exports = getDecorator;
