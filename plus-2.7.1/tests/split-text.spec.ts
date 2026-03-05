import { expect, test } from "@playwright/test"

test.describe("Split Text", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/tests/SplitText")
    })

    test("should split text into characters, words, and lines", async ({
        page,
    }) => {
        // Check if text is split correctly
        const text = await page.textContent("[data-testid=split-text]")
        expect(text).toBe(
            "Hello world, 😅 this is an example of splitting text word by word and line by line with one very long German word: Aufmerksamkeitshyperaktivitätsstörung. Also same with a shytag: Aufmerksamkeitshyper­aktivitätsstörung"
        )

        // Click the button to split the text
        await page.click("button#split")
        await page.waitForTimeout(100) // Wait for the split to complete

        // Check if characters are split correctly (0 because preserveHyphens: true)
        const chars = await page.$$("[data-testid=split-text] .split-char")
        expect(chars.length).toBe(0)

        // Check if words are split correctly
        const words = await page.$$("[data-testid=split-text] .split-word")
        expect(words.length).toBe(30)

        // Check if lines are split correctly
        const lines = await page.$$("[data-testid=split-text] .split-line")
        expect(lines.length).toBeGreaterThan(0)

        // Check specific element classes
        const firstWord = await page.$(".split-word[data-index='0']")
        expect(await firstWord?.textContent()).toBe("Hello")
    })
})
