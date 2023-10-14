import { expect, browser, $$ } from '@wdio/globals';
import axios from 'axios';
import AllureReporter from '@wdio/allure-reporter';

const baseURL = 'http://onby-front.ghgmbbhubqhfbnc2.francecentral.azurecontainer.io/';

describe('Login page test', () => {
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
        
    it("should have exactly one H1 displayed", async () => {
        AllureReporter.startStep('Vérifier qu’un seul élément h1 est présent');
        try {
            const headers = await $$("h1");
            AllureReporter.addAttachment('Nombre d\'éléments h1 trouvés', `${headers.length}`, 'text/plain');
            expect(headers.length).toBe(1);
        } catch (error: unknown) {
            if (error instanceof Error) {
                AllureReporter.addAttachment('Erreur', error.toString(), 'text/plain');
                throw error;
            } else {
                throw new Error('erreur, il y a plus de 1 h1');
            }
        } finally {
            AllureReporter.endStep();
        }
    });
        
    it('should have correct h1 text', async () => {
        AllureReporter.startStep('Vérifier que le texte de h1 contient "Welcome Back!"');
        try {
            const headers = await $$("h1");
            const headerText = await headers[0].getText();
            AllureReporter.addAttachment('Texte h1 reçu', `${headerText}`, 'text/plain');
            expect(headerText).toEqual("Welcome Back!"); 
        } catch (error: unknown) {
            if (error instanceof Error) {
                AllureReporter.addAttachment('Erreur', error.toString(), 'text/plain');
                throw error;
            } else {
                throw new Error('le h1 ne correspond pas');
            }
        } finally {
            AllureReporter.endStep();  
        }
    });
    
});
