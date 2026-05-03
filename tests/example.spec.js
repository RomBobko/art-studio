import { test, expect } from "@playwright/test";

const pageChecks = [
  { path: "/", heading: /Discover\s+Create\s+Share Art/i },
  { path: "/discover", heading: "Explore & Discover" },
  { path: "/learn", heading: "Learn & Create" },
  { path: "/challenges", heading: "Spring Light Study" },
  { path: "/checkout", heading: "Checkout" },
  { path: "/dashboard", heading: "Artist Dashboard" },
  { path: "/login", heading: "Login to get more ideas" },
  { path: "/signup", heading: "Create your creative account" },
  { path: "/discover/abstract", heading: "Abstract" },
  { path: "/artworks/abstract-cascade", heading: "Abstract Cascade" },
  { path: "/artists/elena-novak", heading: "Elena Novak" },
];

for (const { path, heading } of pageChecks) {
  test(`${path} opens without crashing`, async ({ page }) => {
    await page.goto(path);

    const pageHeading =
      typeof heading === "string"
        ? page.getByRole("heading", { name: heading, exact: true })
        : page.getByRole("heading", { name: heading });

    await expect(pageHeading).toBeVisible();
  });
}

test("desktop navigation links move between main pages", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Desktop-only test");

  await page.goto("/");

  const navigation = page.getByRole("navigation", { name: "Primary" });

  await expect(navigation).toBeVisible();

  await navigation.getByRole("link", { name: "Discover" }).click();
  await expect(page).toHaveURL(/\/discover$/);
  await expect(
    page.getByRole("heading", { name: "Explore & Discover" }),
  ).toBeVisible();

  await navigation.getByRole("link", { name: "Learn" }).click();
  await expect(page).toHaveURL(/\/learn$/);
  await expect(
    page.getByRole("heading", { name: "Learn & Create" }),
  ).toBeVisible();

  await navigation.getByRole("link", { name: "Challenges" }).click();
  await expect(page).toHaveURL(/\/challenges$/);
  await expect(
    page.getByRole("heading", { name: "Spring Light Study" }),
  ).toBeVisible();

  await navigation.getByRole("link", { name: "Home" }).click();
  await expect(page).toHaveURL("/");
  await expect(
    page.getByRole("heading", { name: /Discover\s+Create\s+Share Art/i }),
  ).toBeVisible();
});

test("theme toggle switches theme and keeps the saved choice", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.removeItem("theme"));
  await page.reload();

  const html = page.locator("html");
  const header = page.getByRole("banner");
  const switchToDarkButton = header.getByRole("button", {
    name: "Switch to dark theme",
  });

  await expect(switchToDarkButton).toBeVisible();
  await expect(html).toHaveAttribute("data-theme", "light");

  await switchToDarkButton.click();

  await expect(html).toHaveAttribute("data-theme", "dark");
  await expect(
    header.getByRole("button", { name: "Switch to light theme" }),
  ).toBeVisible();
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem("theme")))
    .toBe("dark");

  await header.getByRole("button", { name: "Switch to light theme" }).click();

  await expect(html).toHaveAttribute("data-theme", "light");
  await expect(
    header.getByRole("button", { name: "Switch to dark theme" }),
  ).toBeVisible();
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem("theme")))
    .toBe("light");

  await header.getByRole("button", { name: "Switch to dark theme" }).click();
  await page.reload();

  await expect(html).toHaveAttribute("data-theme", "dark");
  await expect(
    header.getByRole("button", { name: "Switch to light theme" }),
  ).toBeVisible();
});

test("mobile header has navigation or menu controls available", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chrome", "Mobile-only test");

  await page.goto("/");

  const navigation = page.getByRole("navigation", { name: "Primary" });
  const menuButton = page.getByRole("button", { name: /menu|navigation/i });

  if ((await menuButton.count()) > 0) {
    await menuButton.first().click();
    await expect(navigation).toBeVisible();
  } else {
    await expect(navigation).toBeAttached();
    await expect(page.getByRole("button", { name: /^Cart/ })).toBeVisible();
  }
});

test("home page call-to-action links navigate to the right pages", async ({
  page,
}) => {
  await page.goto("/");

  const main = page.getByRole("main");

  await main.getByRole("link", { name: "Explore Art" }).click();
  await expect(page).toHaveURL(/\/discover$/);
  await expect(
    page.getByRole("heading", { name: "Explore & Discover" }),
  ).toBeVisible();

  await page.goto("/");
  await page
    .getByRole("main")
    .getByRole("link", { name: "Start Selling" })
    .first()
    .click();
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(
    page.getByRole("heading", { name: "Artist Dashboard" }),
  ).toBeVisible();
});

test("discover search and category links work", async ({ page }) => {
  await page.goto("/discover");

  await page.getByLabel("Search artworks").fill("color storm");

  await expect(
    page.getByRole("heading", { name: "Search Results" }),
  ).toBeVisible();
  await expect(page.getByText("Color Storm")).toBeVisible();

  await page.getByRole("link", { name: "Abstract Faces" }).click();
  await expect(page).toHaveURL(/\/discover\/abstract-faces$/);
  await expect(
    page.getByRole("heading", { name: "Abstract Faces" }),
  ).toBeVisible();
});

test("discover artwork cards link to detail pages", async ({ page }) => {
  await page.goto("/discover");

  await page.getByLabel("Search artworks").fill("color storm");
  await page.getByRole("link", { name: "View Color Storm" }).click();

  await expect(page).toHaveURL(/\/artworks\/color-storm$/);
  await expect(
    page.getByRole("heading", { name: "Color Storm", exact: true }),
  ).toBeVisible();
});

test("category sorting and filters can be changed and cleared", async ({
  page,
}) => {
  await page.goto("/discover/paintings");

  await page.getByLabel("Sort by").selectOption("price-low");
  await expect(page.getByLabel("Sort by")).toHaveValue("price-low");

  const firstFilter = page.getByRole("checkbox").first();

  await firstFilter.check();
  await expect(firstFilter).toBeChecked();

  await page.getByRole("button", { name: "Clear All" }).click();
  await expect(firstFilter).not.toBeChecked();
});

test("tutorials start with four cards and View more reveals four more", async ({
  page,
}) => {
  await page.goto("/learn");

  const tutorialsRegion = page.getByRole("region", {
    name: "Tutorials",
    exact: true,
  });

  await expect(tutorialsRegion.getByRole("heading", { level: 3 })).toHaveCount(
    4,
  );
  await expect(
    tutorialsRegion.getByRole("button", { name: "View more" }),
  ).toBeVisible();

  await tutorialsRegion.getByRole("button", { name: "View more" }).click();

  await expect(tutorialsRegion.getByRole("heading", { level: 3 })).toHaveCount(
    8,
  );
});

test("tutorial category filtering keeps matching cards visible", async ({
  page,
}) => {
  await page.goto("/learn");

  await page.getByRole("button", { name: "Digital Art" }).click();

  const tutorialsRegion = page.getByRole("region", {
    name: "Tutorials",
    exact: true,
  });

  await expect(tutorialsRegion.getByText("Digital Color Moodboards")).toBeVisible();
  await expect(tutorialsRegion.getByText("Glitch Portrait Effects")).toBeVisible();
  await expect(tutorialsRegion.getByRole("heading", { level: 3 })).toHaveCount(
    2,
  );
  await expect(
    tutorialsRegion.getByRole("button", { name: "View more" }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("region", { name: "Featured Tutorials" }),
  ).toHaveCount(0);
});

test("featured tutorials start with three cards and View more reveals the rest", async ({
  page,
}) => {
  await page.goto("/learn");

  const featuredRegion = page.getByRole("region", {
    name: "Featured Tutorials",
  });

  await expect(featuredRegion.getByRole("heading", { level: 3 })).toHaveCount(
    3,
  );
  await expect(
    featuredRegion.getByRole("button", { name: "View more" }),
  ).toBeVisible();

  await featuredRegion.getByRole("button", { name: "View more" }).click();

  await expect(featuredRegion.getByRole("heading", { level: 3 })).toHaveCount(
    5,
  );
  await expect(
    featuredRegion.getByRole("button", { name: "View more" }),
  ).toHaveCount(0);
});

test("newsletter form accepts a valid email", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Email address").fill("reader@example.com");
  await page.getByRole("button", { name: "Subscribe" }).click();

  await expect(page.getByRole("status")).toHaveText("Thank you for subscribing.");
});

test("login and sign-up forms show local success messages", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel("Email Address").fill("artist@example.com");
  await page.getByLabel("Password", { exact: true }).fill("creative123");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByRole("status")).toHaveText(
    "Logged in locally. No real authentication was performed.",
  );

  await page.goto("/signup");

  await page.getByLabel("Username").fill("galleryfriend");
  await page.getByLabel("Email Address").fill("friend@example.com");
  await page.getByLabel("Password", { exact: true }).fill("creative123");
  await page.getByLabel("Confirm Password").fill("creative123");
  await page.getByRole("button", { name: "Sign Up" }).click();

  await expect(page.getByRole("status")).toHaveText(
    "Account created locally. No real sign-up was performed.",
  );
});

test("auth demo forms show validation messages", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel("Email Address").fill("not-an-email");
  await page.getByLabel("Password", { exact: true }).fill("creative123");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByRole("alert")).toHaveText(
    "Enter a valid email address.",
  );

  await page.goto("/signup");

  await page.getByLabel("Username").fill("galleryfriend");
  await page.getByLabel("Email Address").fill("friend@example.com");
  await page.getByLabel("Password", { exact: true }).fill("creative123");
  await page.getByLabel("Confirm Password").fill("different123");
  await page.getByRole("button", { name: "Sign Up" }).click();

  await expect(page.getByRole("alert")).toHaveText("Passwords do not match.");
});

test("challenge submission modal validates and adds a local submission", async ({
  page,
}) => {
  await page.goto("/challenges");

  await expect(
    page.getByRole("img", { name: "Spring Light Study challenge cover" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Submissions" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Past Challenges" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Participate" }).click();

  const dialog = page.getByRole("dialog", { name: "Submit Your Artwork" });

  await expect(dialog).toBeVisible();

  await dialog.getByRole("button", { name: "Submit Artwork" }).click();
  await expect(
    dialog.getByText("Please enter your artwork title."),
  ).toBeVisible();
  await expect(dialog.getByText("Please enter your name.")).toBeVisible();
  await expect(
    dialog.getByText("Please enter the medium used for your artwork."),
  ).toBeVisible();

  await dialog.getByLabel("Artwork title").fill("Playwright Spring Study");
  await dialog.getByLabel("Artist name").fill("Test Artist");
  await dialog.getByLabel("Medium").fill("Acrylic on paper");
  await dialog
    .getByLabel("Short description")
    .fill("A small local test entry.");
  await dialog.getByRole("button", { name: "Submit Artwork" }).click();

  await expect(dialog).toBeHidden();
  await expect(page.getByText("Playwright Spring Study")).toBeVisible();
});

test("cart drawer and checkout flow work locally", async ({ page }) => {
  await page.goto("/artworks/abstract-cascade");

  await page.getByRole("button", { name: "Add to cart" }).click();
  await page.getByRole("button", { name: "Cart (1 item)" }).click();

  const cartDrawer = page.getByRole("dialog", { name: "Shopping Cart" });

  await expect(cartDrawer).toBeVisible();
  await expect(cartDrawer.getByText("Abstract Cascade")).toBeVisible();

  await cartDrawer.getByRole("button", { name: "Checkout" }).click();

  await expect(page).toHaveURL(/\/checkout$/);
  await expect(page.getByRole("heading", { name: "Checkout" })).toBeVisible();

  await page.getByLabel("Full name").fill("Test Collector");
  await page.getByLabel("Address").fill("123 Gallery Lane");
  await page.getByLabel("City").fill("Austin");
  await page.getByLabel("State").selectOption("Texas");
  await page.getByLabel("ZIP code").fill("73301");
  await page.getByLabel("Card number").fill("4242424242424242");
  await page.getByLabel("Card expiry date").fill("12 / 30");
  await page.getByLabel("CVC").fill("123");
  await page.getByRole("button", { name: "Place Order" }).click();

  await expect(
    page.getByRole("heading", { name: "Order placed successfully" }),
  ).toBeVisible();
});
