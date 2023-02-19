describe("EditableSpan", () => {
    it('base example visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto("http://localhost:9009/iframe.html?id=span-component-editablespan--editable-span-with-state-changing")
        const image = await page.screenshot()

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot()
    })
})

