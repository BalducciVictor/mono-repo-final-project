import { expect, browser, $$ } from '@wdio/globals';
import axios from 'axios';
import AllureReporter from '@wdio/allure-reporter';

const baseURL = 'http://onby-front.ghgmbbhubqhfbnc2.francecentral.azurecontainer.io/dashboard/home';



describe('HomePage test', () => {
    before(async () => {
        await browser.url(baseURL);
    });
    
    it('should return 200', async () => {
        AllureReporter.startStep('Vérifier que le code de statut de la réponse est 200');
        try {
            const response = await axios.get(baseURL);
            AllureReporter.addAttachment('Statut de réponse reçu', `${response.status}`, 'text/plain');
            expect(response.status).toBe(200);
        } catch (error: unknown) {
            if (error instanceof Error) {
                AllureReporter.addAttachment('Erreur', error.toString(), 'text/plain');
                throw error;
            } else {
                throw new Error('le code de la page ne correspond pas');
            }
        } finally {
            AllureReporter.endStep();
        }
    });

})