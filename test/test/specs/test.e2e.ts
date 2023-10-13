import { expect, browser, $$ } from '@wdio/globals';
import axios from 'axios';
import AllureReporter from '@wdio/allure-reporter';

const baseURL = 'http://onby-front.ghgmbbhubqhfbnc2.francecentral.azurecontainer.io/';

describe('Login page test', () => {
    beforeEach(async () => {
        await browser.url(baseURL);
    });

    it('should have correct h1 text', async () => {
        const headers = await $$('h1');
        
        AllureReporter.addStep('Vérifier que au moins un élément h1 est présent');
        expect(headers).toBeElementsArrayOfSize({ gte: 1 });

        AllureReporter.addStep('Vérifier que le texte de h1 contient "Welcome"');
        const headerText = await headers[0].getText();
        expect(headerText).toContain('Welcome');

        if (headerText !== 'Welcome') {
            AllureReporter.addStep('Échec : Le texte du h1 n’est pas "Welcome"');
            AllureReporter.addAttachment('Échec détail', 'Le texte du h1 n’est pas "Welcome"', 'text/plain');
        }
    });

    it('should return 200', async () => {
        AllureReporter.addStep('Vérifier que le code de statut de la réponse est 200');
        const response = await axios.get(baseURL);
        expect(response.status).toBe(200);

        if (response.status !== 200) {
            AllureReporter.addStep('Échec : Le code de statut n’est pas 200');
            AllureReporter.addAttachment('Échec détail', `Le code de statut est ${response.status}`, 'text/plain');
        }
    });
});
