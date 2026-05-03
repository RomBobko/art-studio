import { test, expect } from "@playwright/test";

test("home page opens", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("body")).toBeVisible();
});

test("desktop navigation is visible", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Desktop-only test");

  await page.goto("/");

  await expect(page.getByRole("navigation")).toBeVisible();
});

test("mobile page loads with navigation element present", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chrome", "Mobile-only test");

  await page.goto("/");

  await expect(page.getByRole("navigation")).toBeAttached();
});
