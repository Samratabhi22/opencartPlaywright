import { expect, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { RandomDataUtil } from './randomDataGenerator';
import { MyAccountPage } from '../pages/MyAccountPage';
import { LogoutPage } from '../pages/LogoutPage';

export type RegisteredUser = {
  email: string;
  password: string;
};

export async function registerUserAndLogout(
  page: Page,
  password: string = 'test123',
): Promise<RegisteredUser> {
  const homePage = new HomePage(page);
  await homePage.clickMyAccount();
  await homePage.clickRegister();

  const registrationPage = new RegistrationPage(page);
  const email = RandomDataUtil.getEmail();

  await registrationPage.setFirstName(RandomDataUtil.getFirstName());
  await registrationPage.setLastName(RandomDataUtil.getlastName());
  await registrationPage.setEmail(email);
  await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());
  await registrationPage.setPassword(password);
  await registrationPage.setConfirmPassword(password);
  await registrationPage.setPrivacyPolicy();
  await registrationPage.clickContinue();

  expect(await registrationPage.getConfirmationMsg()).toContain('Your Account Has Been Created!');

  const myAccountPage = new MyAccountPage(page);
  const logoutPage: LogoutPage = await myAccountPage.clickLogout();
  expect(await logoutPage.isContinueButtonVisible()).toBe(true);
  await logoutPage.clickContinue();

  return { email, password };
}
