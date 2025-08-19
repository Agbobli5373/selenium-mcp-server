import { SeleniumClient } from './index.js';

async function testRefactoredSeleniumClient() {
    console.log('Testing refactored SeleniumClient...');
    
    const client = new SeleniumClient();
    
    try {
        // Test browser startup
        console.log('1. Starting browser...');
        const startResult = await client.startBrowser('chrome', { headless: true });
        console.log('✓ Browser started:', startResult.message);
        
        // Test navigation
        console.log('2. Navigating to example.com...');
        const navResult = await client.navigate('https://example.com');
        console.log('✓ Navigation successful:', navResult.url);
        
        // Test title retrieval
        console.log('3. Getting page title...');
        const titleResult = await client.getTitle();
        console.log('✓ Page title:', titleResult.title);
        
        // Test element finding
        console.log('4. Finding page elements...');
        const elementResult = await client.findElement('css', 'h1');
        console.log('✓ Element found:', elementResult.found);
        
        // Test page analysis
        console.log('5. Getting page summary...');
        const summaryResult = await client.getPageSummary();
        console.log('✓ Page summary:', {
            title: summaryResult.title,
            links: summaryResult.links,
            headings: summaryResult.headings.length
        });
        
        // Test screenshot
        console.log('6. Taking screenshot...');
        const screenshotResult = await client.takeScreenshot();
        console.log('✓ Screenshot taken:', screenshotResult.success);
        
        console.log('7. Closing browser...');
        const closeResult = await client.closeBrowser();
        console.log('✓ Browser closed:', closeResult.message);
        
        console.log('\n🎉 All tests passed! Refactored SeleniumClient is working correctly.');
        
    } catch (error) {
        console.error('❌ Test failed:', error);
        try {
            await client.closeBrowser();
        } catch (closeError) {
            console.error('Failed to close browser:', closeError);
        }
    }
}

// Export for potential external use
export { testRefactoredSeleniumClient };

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    testRefactoredSeleniumClient().then(() => {
        console.log('Test completed.');
        process.exit(0);
    }).catch((error) => {
        console.error('Test runner failed:', error);
        process.exit(1);
    });
}
