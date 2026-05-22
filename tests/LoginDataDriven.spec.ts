import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { DataProvider } from '../utils/dataProvider';
import { TestConfig } from '../test.config';
import { HomePage } from '../pages/HomePage';
import { registerUserAndLogout } from '../utils/authHelper';


//Load JSON test data logindata.json

const jsonPath="testdata/logindata.json";
const jsonTestData=DataProvider.getTestDataFromJson(jsonPath);


for(const data of jsonTestData)
{
   test(`Login Test with JSON Data: ${data.testName} @datadriven`, async({page})=>{

        const config = new TestConfig(); // create instance
        await page.goto(config.appUrl);    // getting appURL from test.config.ts file

        const homePage = new HomePage(page);
        await homePage.clickMyAccount();
        await homePage.clickLogin();

        const loginPage = new LoginPage(page);

        if(data.expected.toLowerCase()==='success')
        {
            const registeredUser = await registerUserAndLogout(page, data.password);
            await page.goto(config.appUrl);

            const refreshedHomePage = new HomePage(page);
            const refreshedLoginPage = new LoginPage(page);

            await refreshedHomePage.clickMyAccount();
            await refreshedHomePage.clickLogin();
            await refreshedLoginPage.login(registeredUser.email, registeredUser.password);

            const myAccountPage=new MyAccountPage(page);
            const isLoggedIn=await myAccountPage.isMyAccountPageExists();
            expect(isLoggedIn).toBeTruthy();

        }
        else{
            await loginPage.login(data.email, data.password);
            const errorMessage=await loginPage.getloginErrorMessage();
            //expect(errorMessage).toBe('Warning: No match for E-Mail Address and/or Password.');
            expect(errorMessage).toContain('Warning: No match');
        }
    })

}



//Load CSV test data logindata.json

const csvPath = "testdata/logindata.csv";
const csvTestData = DataProvider.getTestDataFromCsv(csvPath);


for(const data of csvTestData)
{
   test(`Login Test with CSV Data: ${data.testName} @datadriven`, async({page})=>{

        const config = new TestConfig(); // create instance
        await page.goto(config.appUrl);    // getting appURL from test.config.ts file

        const homePage = new HomePage(page);
        await homePage.clickMyAccount();
        await homePage.clickLogin();

        const loginPage = new LoginPage(page);

        if(data.expected.toLowerCase()==='success')
        {
            const registeredUser = await registerUserAndLogout(page, data.password);
            await page.goto(config.appUrl);

            const refreshedHomePage = new HomePage(page);
            const refreshedLoginPage = new LoginPage(page);

            await refreshedHomePage.clickMyAccount();
            await refreshedHomePage.clickLogin();
            await refreshedLoginPage.login(registeredUser.email, registeredUser.password);

            const myAccountPage=new MyAccountPage(page);
            const isLoggedIn=await myAccountPage.isMyAccountPageExists();
            expect(isLoggedIn).toBeTruthy();

        }
        else{
            await loginPage.login(data.email, data.password);
            const errorMessage=await loginPage.getloginErrorMessage();
            //expect(errorMessage).toBe('Warning: No match for E-Mail Address and/or Password.');
            expect(errorMessage).toContain('Warning: No match');    
        }
    })

}