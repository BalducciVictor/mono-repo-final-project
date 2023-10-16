import { expect, browser } from '@wdio/globals';
import AllureReporter from '@wdio/allure-reporter';
import EXPECTED_HREF from '../../fixtures/testCaseHref.fixture';

describe('HomePage Tests', () => {

    beforeEach(async () => {
        await browser.url('http://onby-front.ghgmbbhubqhfbnc2.francecentral.azurecontainer.io');
    
        AllureReporter.addStep('Navigated to login page');
        const emailInput = await $('[data-testid="email-input-test"]');
        const passwordInput = await $('[data-testid="password-input-test"]');
        const loginButton = await $('[data-testid="login-button"]');  
    
        await emailInput.setValue("maksym.yankivskyy@techcorp.com");
        await passwordInput.setValue("Password123@"); 
        await loginButton.click();

        await browser.waitUntil(async () => {
            return await browser.getUrl() !== 'http://onby-front.ghgmbbhubqhfbnc2.francecentral.azurecontainer.io';
        }, {
            timeout: 3000,
            timeoutMsg: 'Expected URL to change after 3 seconds'
        });
    
        const currentUrl = await browser.getUrl();
        console.log(currentUrl)
        expect(currentUrl).toEqual('http://onby-front.ghgmbbhubqhfbnc2.francecentral.azurecontainer.io/dashboard/home');
    
        AllureReporter.addStep('Logged in successfully');
    });
    

    it('should navigate to the correct URL when clicking "Créer un nouveau cours"', async () => {
        const linkElement = await $('[data-testid="createCourse"]'); 
        console.log(linkElement)
    
        AllureReporter.addStep('Click on "Créer un nouveau cours" button');
        
        await linkElement.click();
    
        const currentUrl = await browser.getUrl();
        console.log(currentUrl)
        AllureReporter.addStep('Verify navigated URL');
        AllureReporter.addAttachment('Navigated URL', currentUrl, 'text/plain');
        
        expect(currentUrl).toEqual('http://onby-front.ghgmbbhubqhfbnc2.francecentral.azurecontainer.io/dashboard/create-chapter');
    });
    

    it('should have the correct href for "Acceuil"', async () => {
        const homeLink = await $('[data-testid="idHome"]');
        console.log(homeLink)
        const homeHref = await homeLink.getAttribute('href');
        console.log(homeHref)

        AllureReporter.addAttachment("Actual href for Home", homeHref, 'text/plain');
        AllureReporter.addAttachment("Expected href for Home", EXPECTED_HREF.home, 'text/plain');

        expect(homeHref).toEqual(EXPECTED_HREF.home);
    });


    it('should have the correct href for "Cours"', async () => {
        const chaptersLink = await $('[data-testid="idChapitres"]');
        console.log(chaptersLink)
        const chaptersHref = await chaptersLink.getAttribute('href');
        console.log(chaptersHref)

        AllureReporter.addAttachment("Actual href for Chapters", chaptersHref, 'text/plain');
        AllureReporter.addAttachment("Expected href for Chapters", EXPECTED_HREF.chapters, 'text/plain');

        expect(chaptersHref).toEqual(EXPECTED_HREF.chapters);
    });
});