import { expect, browser, $$ } from '@wdio/globals'

describe('My Login application', () => {
    it('should have correct h1 text', async () => {
        await browser.url(`http://onby-front.ghgmbbhubqhfbnc2.francecentral.azurecontainer.io/`)

        const headers = await $$('h1')  // Sélection de tous les éléments h1
        expect(headers).toBeElementsArrayOfSize({ gte: 1 })  // Vérifier qu'au moins un h1 existe

        // Vous pouvez également vérifier le texte du premier h1 si vous le souhaitez
        expect(headers[0]).toHaveTextContaining('Expected Text Here')
    })
})
