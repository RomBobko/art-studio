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

const getElementBox = async (locator) => {
  const element = locator.first();

  await expect(element).toBeVisible();

  return element.evaluate((node) => {
    const rect = node.getBoundingClientRect();

    return {
      top: Math.round(rect.top),
      right: Math.round(rect.right),
      bottom: Math.round(rect.bottom),
      left: Math.round(rect.left),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    };
  });
};

const boxesOverlap = (firstBox, secondBox) =>
  !(
    firstBox.right <= secondBox.left ||
    firstBox.left >= secondBox.right ||
    firstBox.bottom <= secondBox.top ||
    firstBox.top >= secondBox.bottom
  );

const applyThemeForLayoutCheck = async (page, theme) => {
  await page.evaluate((selectedTheme) => {
    localStorage.setItem("theme", selectedTheme);
    document.documentElement.dataset.theme = selectedTheme;
  }, theme);
};

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

  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/");

  const header = page.getByRole("banner");
  const openMenuButton = header.getByRole("button", {
    name: "Open navigation menu",
  });

  await expect(openMenuButton).toBeVisible();
  await expect(openMenuButton).toHaveAttribute("aria-expanded", "false");

  await openMenuButton.click();

  const navigation = header.getByRole("navigation", { name: "Primary" });

  await expect(navigation).toBeVisible();
  await expect(
    header.getByRole("button", { name: "Close navigation menu" }),
  ).toHaveAttribute("aria-expanded", "true");

  await navigation.getByRole("link", { name: "Learn" }).click();

  await expect(page).toHaveURL(/\/learn$/);
  await expect(
    header.getByRole("button", { name: "Open navigation menu" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: /^Cart/ })).toBeVisible();
});

test("mobile navigation opens as a full-screen overlay", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Run once with custom widths");

  const widths = [768, 430, 390, 360];
  const themes = ["light", "dark"];

  for (const theme of themes) {
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      await applyThemeForLayoutCheck(page, theme);

      const header = page.getByRole("banner");
      const openMenuButton = header.getByRole("button", {
        name: "Open navigation menu",
      });

      await expect(openMenuButton).toBeVisible();
      await openMenuButton.click();

      const closeMenuButton = header.getByRole("button", {
        name: "Close navigation menu",
      });
      const overlay = page.locator("#mobile-navigation");
      const navigation = header.getByRole("navigation", { name: "Primary" });

      await expect(closeMenuButton).toBeVisible();
      await expect(closeMenuButton).toHaveAttribute("aria-expanded", "true");
      await expect(overlay).toBeVisible();
      await expect(navigation).toBeVisible();
      await expect(
        header.getByRole("button", { name: /Switch to/ }),
      ).toBeHidden();
      await expect(
        header.getByRole("link", { name: "Open login page" }),
      ).toBeHidden();
      await expect(header.getByRole("button", { name: /^Cart/ })).toBeHidden();

      const overlayReport = await overlay.evaluate((panel) => {
        const rect = panel.getBoundingClientRect();
        const nav = panel.querySelector("nav");
        const navRect = nav?.getBoundingClientRect();
        const links = [...panel.querySelectorAll("a")].map((link) => {
          const linkRect = link.getBoundingClientRect();

          return {
            top: Math.round(linkRect.top),
            right: Math.round(linkRect.right),
            bottom: Math.round(linkRect.bottom),
            left: Math.round(linkRect.left),
            height: Math.round(linkRect.height),
          };
        });

        const linksStayInsideOverlay = links.every(
          (link) =>
            link.left >= rect.left &&
            link.right <= rect.right &&
            link.top >= rect.top &&
            link.bottom <= rect.bottom,
        );
        const linksAreStacked = links.every(
          (link, index) => index === 0 || link.top >= links[index - 1].bottom,
        );
        const minLinkHeight = Math.min(...links.map((link) => link.height));

        return {
          bodyLocked: document.body.classList.contains("mobile-menu-open"),
          horizontalOverflow:
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth,
          linkCount: links.length,
          linksAreStacked,
          linksStayInsideOverlay,
          minLinkHeight,
          navCenterOffset: navRect
            ? Math.abs(navRect.top + navRect.height / 2 - window.innerHeight / 2)
            : window.innerHeight,
          overlayHeight: Math.round(rect.height),
          overlayLeft: Math.round(rect.left),
          overlayPosition: getComputedStyle(panel).position,
          overlayTop: Math.round(rect.top),
          overlayWidth: Math.round(rect.width),
        };
      });

      expect(overlayReport.overlayPosition).toBe("fixed");
      expect(overlayReport.overlayLeft).toBeLessThanOrEqual(1);
      expect(overlayReport.overlayTop).toBeLessThanOrEqual(1);
      expect(overlayReport.overlayWidth).toBeGreaterThanOrEqual(width - 1);
      expect(overlayReport.overlayHeight).toBeGreaterThanOrEqual(899);
      expect(overlayReport.linkCount).toBe(4);
      expect(overlayReport.linksAreStacked).toBe(true);
      expect(overlayReport.linksStayInsideOverlay).toBe(true);
      expect(overlayReport.minLinkHeight).toBeGreaterThanOrEqual(48);
      expect(overlayReport.navCenterOffset).toBeLessThanOrEqual(90);
      expect(overlayReport.horizontalOverflow).toBeLessThanOrEqual(1);
      expect(overlayReport.bodyLocked).toBe(true);

      await closeMenuButton.click();

      await expect(overlay).toBeHidden();
      await expect(
        header.getByRole("button", { name: "Open navigation menu" }),
      ).toHaveAttribute("aria-expanded", "false");
      await expect
        .poll(() =>
          page.evaluate(() =>
            document.body.classList.contains("mobile-menu-open"),
          ),
        )
        .toBe(false);
    }
  }
});

test("key pages do not scroll horizontally on small mobile screens", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chrome", "Mobile-only test");

  const pagesToCheck = [
    "/",
    "/discover",
    "/discover/abstract",
    "/artworks/abstract-cascade",
    "/artists/elena-novak",
    "/learn",
    "/challenges",
    "/checkout",
    "/dashboard",
  ];
  const mobileWidths = [390, 360];

  for (const width of mobileWidths) {
    await page.setViewportSize({ width, height: 900 });

    for (const path of pagesToCheck) {
      await page.goto(path);

      const horizontalOverflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      );

      expect(horizontalOverflow).toBeLessThanOrEqual(1);
    }
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

test("featured artists carousel keeps visible card content inside the carousel", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Run once with custom widths");

  const widths = [1440, 1280, 1024, 768, 430, 390, 360];
  const themes = ["light", "dark"];

  for (const theme of themes) {
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/discover");
      await applyThemeForLayoutCheck(page, theme);

      const featuredArtists = page.locator("section").filter({
        has: page.getByRole("heading", { name: "Featured Artists" }),
      });

      await featuredArtists.scrollIntoViewIfNeeded();

      const carouselReport = await featuredArtists.evaluate((section) => {
        const list = section.querySelector("ul");
        const viewport = list?.parentElement;

        if (!viewport) {
          return {
            visibleCardCount: 0,
            clippedItems: ["Featured artists viewport was not found."],
            buttonTopDifference: 0,
          };
        }

        const viewportRect = viewport.getBoundingClientRect();
        const visibleCards = [...section.querySelectorAll("article")].filter(
          (card) => {
            const cardRect = card.getBoundingClientRect();
            const visibleWidth =
              Math.min(cardRect.right, viewportRect.right) -
              Math.max(cardRect.left, viewportRect.left);

            return visibleWidth > 40;
          },
        );

        const clippedItems = visibleCards.flatMap((card) => {
          const cardRect = card.getBoundingClientRect();
          const artistName = card.querySelector("h3");
          const profileLink = card.querySelector("a");
          const itemsToCheck = [
            ["card", cardRect],
            ["artist name", artistName?.getBoundingClientRect()],
            ["profile link", profileLink?.getBoundingClientRect()],
          ];

          return itemsToCheck
            .filter(([, rect]) => {
              if (!rect) {
                return true;
              }

              return (
                rect.left < viewportRect.left - 1 ||
                rect.right > viewportRect.right + 1
              );
            })
            .map(([label]) => `${label} is clipped`);
        });

        const buttonTopValues = visibleCards.map((card) =>
          Math.round(card.querySelector("a")?.getBoundingClientRect().top || 0),
        );
        const buttonTopDifference =
          buttonTopValues.length > 1
            ? Math.max(...buttonTopValues) - Math.min(...buttonTopValues)
            : 0;

        return {
          visibleCardCount: visibleCards.length,
          clippedItems,
          buttonTopDifference,
        };
      });

      const expectedVisibleCardCount = width >= 1280 ? 3 : width >= 901 ? 2 : 1;

      expect(carouselReport.visibleCardCount).toBe(expectedVisibleCardCount);
      expect(carouselReport.clippedItems).toEqual([]);
      expect(carouselReport.buttonTopDifference).toBeLessThanOrEqual(2);
    }
  }
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

  await page.getByLabel("Name").fill("Gallery Friend");
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

  await page.getByLabel("Name").fill("Gallery Friend");
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

test("cart toast stays clear of the drawer checkout button", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Run once with custom widths");

  const widths = [1440, 1280, 1024, 768, 430, 390, 360];
  const themes = ["light", "dark"];

  for (const theme of themes) {
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/artworks/abstract-cascade");
      await applyThemeForLayoutCheck(page, theme);

      await page.getByRole("button", { name: "Add to cart" }).click();
      await page.getByRole("button", { name: "Cart (1 item)" }).click();

      const cartDrawer = page.getByRole("dialog", { name: "Shopping Cart" });
      const toast = page.getByRole("alert").filter({
        hasText: "Abstract Cascade added to cart.",
      });

      await expect(cartDrawer).toBeVisible();

      const toastBox = await getElementBox(toast);
      const checkoutBox = await getElementBox(
        cartDrawer.getByRole("button", { name: "Checkout" }),
      );

      expect(boxesOverlap(toastBox, checkoutBox)).toBe(false);
    }
  }
});

test("mobile checkout toast stays clear of shipping fields", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Run once with custom widths");

  const widths = [768, 430, 390, 360];
  const themes = ["light", "dark"];
  const checkoutFieldLabels = [
    "Full name",
    "Address",
    "City",
    "State",
    "ZIP code",
  ];

  for (const theme of themes) {
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/artworks/abstract-cascade");
      await applyThemeForLayoutCheck(page, theme);

      await page.getByRole("button", { name: "Add to cart" }).click();
      await page.getByRole("button", { name: "Cart (1 item)" }).click();
      await page
        .getByRole("dialog", { name: "Shopping Cart" })
        .getByRole("button", { name: "Checkout" })
        .click();

      await expect(page).toHaveURL(/\/checkout$/);

      const toastBox = await getElementBox(
        page.getByRole("alert").filter({
          hasText: "Abstract Cascade added to cart.",
        }),
      );

      for (const fieldLabel of checkoutFieldLabels) {
        const fieldBox = await getElementBox(
          page.getByLabel(fieldLabel, { exact: true }),
        );
        const fieldIsInViewport = fieldBox.bottom > 0 && fieldBox.top < 900;

        if (fieldIsInViewport) {
          expect(boxesOverlap(toastBox, fieldBox)).toBe(false);
        }
      }
    }
  }
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
  await page.getByLabel("Email address").fill("collector@example.com");
  await page.getByLabel("Address", { exact: true }).fill("123 Gallery Lane");
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
