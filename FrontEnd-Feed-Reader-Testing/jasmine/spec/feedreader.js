/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */


//check for valid URL
function isValidUrl(url) {
    try {
        return !!url.match(/^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/);
    } catch(error) {
        return false;
    }
}

//check for empty string
function isBlank(string) {
    return (!string || /^\s*$/.test(string));
}

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


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has a URL defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(isValidUrl(feed.url)).toBe(true);
            });
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has a name defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(isBlank(feed.name)).toBe(false);
            });
        });
    });


    /* test suite "The menu" */
    describe('The menu', function() {
        /* Test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        var body = $('body');
        var menuIcon = $('.menu-icon-link');
        it('is hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes visibility when the menu icon is clicked', function() {
            menuIcon.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(false);

            menuIcon.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });

    /* test suite "Initial Entries" */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('has at least one entry', function(done) {
            var entries = $('.feed').find('.entry');
            expect(entries.length >= 1).toBe(true);
            done();
        });
    });

    /* test suite "New Feed Selection" */
    describe('New Feed Selection', function() {
        var before, after;

        beforeEach(function(done) {
            expect(allFeeds.length >= 2).toBe(true);

            loadFeed(0, function() {
                before = $('.header-title').text() + $('.feed').find('.entry').text().replace(/ +/g, " ");
                loadFeed(1, function() {
                    after = $('.header-title').text() + $('.feed').find('.entry').text().replace(/ +/g, " ");
                    done();
                });
            });
        });
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('changes content', function(done){
            expect(before == after).toBe(false);
            done();
        });
    });
}());
