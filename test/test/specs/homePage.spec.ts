import { expect, browser } from '@wdio/globals';
import AllureReporter from '@wdio/allure-reporter';
import EXPECTED_HREF from '../../fixtures/testCaseHref.fixture';

describe('HomePage Tests', () => {

    // Cette fonction s'exécutera avant chaque test pour s'assurer que vous êtes connecté
    beforeEach(() => {
        browser.url('http://onby-front.ghgmbbhubqhfbnc2.francecentral.azurecontainer.io');
    
        AllureReporter.addStep('Navigated to login page');
        const emailInput = $('#mail');
        const passwordInput = $('#password'); 
        const loginButton = $('button=Sign in');  
    
        emailInput.setValue('test.doe@test.com');
        passwordInput.setValue('string'); 
        loginButton.click();
    
        browser.pause(2000); 
    
        const currentUrl = browser.getUrl();
        expect(currentUrl).toEqual('http://onby-front.ghgmbbhubqhfbnc2.francecentral.azurecontainer.io/dashboard/home');
    
        AllureReporter.addStep('Logged in successfully');
    });
    

    it('should navigate to the correct URL when clicking "Créer un nouveau cours"', async () => {
        // Utiliser l'attribut data-testid pour sélectionner l'élément
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
    

    it('should have the correct href for "Home"', async () => {
        const homeLink = await $('[data-testid="idHome"]');
        console.log(homeLink)
        const homeHref = await homeLink.getAttribute('href');
        console.log(homeHref)

        // Ajout des détails au rapport Allure
        AllureReporter.addAttachment("Actual href for Home", homeHref, 'text/plain');
        AllureReporter.addAttachment("Expected href for Home", EXPECTED_HREF.home, 'text/plain');

        expect(homeHref).toEqual(EXPECTED_HREF.home);
    });


    it('should have the correct href for "Chapters"', async () => {
        const chaptersLink = await $('[data-testid="idChapitres"]');
        console.log(chaptersLink)
        const chaptersHref = await chaptersLink.getAttribute('href');
        console.log(chaptersHref)


        // Ajout des détails au rapport Allure
        AllureReporter.addAttachment("Actual href for Chapters", chaptersHref, 'text/plain');
        AllureReporter.addAttachment("Expected href for Chapters", EXPECTED_HREF.chapters, 'text/plain');

        expect(chaptersHref).toEqual(EXPECTED_HREF.chapters);
    });
});