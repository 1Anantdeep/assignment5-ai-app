import { test, expect } from "@playwright/test";

test("user can ask a question and see answer section", async ({ page }) => {
  await page.goto("/");
  await page.getByPlaceholder("Ask a question...").fill("What is this document about?");
  await page.getByRole("button", { name: "Ask" }).click();
  await expect(page.getByText("Answer")).toBeVisible();
});