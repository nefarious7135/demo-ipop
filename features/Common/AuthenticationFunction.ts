import { Page } from '@playwright/test';
import { UI } from '../Keyword/CommonKeyword';

export const Auth = {

    AuthenticationFunctionEss: async (page: Page) => {
        await UI.login_Ess(page);
    },
    AuthenticationFunctionMss: async (page: Page) => {
        await UI.login_Mss(page);
    },
    AuthenticationFunctionHr: async (page: Page) => {
        await UI.login_Hr(page);
    },
}