/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* The test below loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('should have a URL', function() {
          for(let feed of allFeeds) {
            expect(feed.url).toBeDefined();
            expect(feed.url).not.toBe('');
           }
        });

        /* The following test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('should have a name', function() {
          for(let feed of allFeeds) {
            expect(feed.name).toBeDefined();
            expect(feed.name).not.toBe('');
          }
        });
    });


    /* New test suite: "The menu" */
    describe('The menu', function() {

        /* The test below ensures the menu element is
         * hidden by default.
         */
        it('should be hidden by default', function() {
            const bodyEl = document.querySelector('body');
            expect(bodyEl.classList.contains('menu-hidden')).toBe(true);
        });

         /* This test ensures the menu changes
          * visibility when the menu icon is clicked.
          */
        it('should change visibility', function() {
            const bodyEl = document.querySelector('body');
            const menuEl = document.querySelector('.menu-icon-link');

            menuEl.click();

            expect(bodyEl.classList.contains('menu-hidden')).toBe(false);

            menuEl.click();

            expect(bodyEl.classList.contains('menu-hidden')).toBe(true);

        });
    });

    /* New test suite: "Initial Entries" */

    describe('Initial Entries', function() {
        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, done);

        });

        it('should have at least a single entry element', function(done) {
            const feedChildren = document.querySelector('.feed').querySelectorAll('.entry');
            expect(feedChildren != null && feedChildren.length > 0).toBe(true);
            done();
        });
    });
    /* New test suite: "New Feed Selection" */
    describe('New Feed Selection', function() {
         const firstFeeds = [];

        beforeEach(function(done) {
            loadFeed(1, function(){
                const firstFeedCont = document.querySelector('.feed');
                for(let feed of firstFeedCont.children) {
                   firstFeeds.push(feed.innerHTML);
                }
                loadFeed(2, done);
            });
        });

        /* This test ensures that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         it('content actually changes', function(done) {
            const feedChildren = document.querySelector('.feed').querySelectorAll('.entry');
            for( let i = 0; i < feedChildren.length; i++) {
                expect(feedChildren[i].innerHTML === firstFeeds[i]).toBe(false);
            }
            done();
        });

    });


}());
