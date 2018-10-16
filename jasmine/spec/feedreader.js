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


        /* a new test spec that check if each of the allFeeds url is defined 
            * and their lenghts anything greater than 0. first we loop through the array of the feeds
         */
        it('define url', function() {
            for(let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        /* a new test spec that check if each of the allFeeds name is defined 
            * and their lenghts anything greater than 0. first we loop through the array of the feeds
            * same principle applied above in the case of the urls.
         */
        it('define name', function() {
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* TODO: Write a new test suite named "The menu" */
       describle('the menu', function() {
        /* We try to query the body element, to check if the menu item is actually hidden, 
        * Our Jasmine test would expect the menu-hidden class to be true
         */
        it('it is hidden', function(){
            const body = document.querySelector('body');
            expect(body.classList.contains('menu-hidden')).toBe(true)
        });

         /* this test checks for the toggle-ability of the menu. 
         *the body element is querried for the hidden menu class and sets it to false which displays 
         * the menu. And when the menu-hidden is expected to be true the menu is hidden.
          */

          it('toggles on and off', function() {
              const body = document.querySelector('body');
              const menu = document.querySelector('.menu-icon-link');

              menu.click();
              expect(body.classList.contains('menu-hidden')).toBe(false);
              
              menu.click();
              expect(body.classList.contains('menu-hidden')).toBe(true);
          });
         });
    
    /* TODO: Write a new test suite named "Initial Entries" */
          describe('Initial Entries', function() {
                /* A test that ensures when the loadFeed
            * function is called and completes its work, there is at least
            * a single .entry element within the .feed container.
            * Remember, loadFeed() is asynchronous so this test will require
            * the use of Jasmine's beforeEach and asynchronous done() function.
            */
           beforeEach(function(done) {
               loadFeed(0, done);
           });

           it('completed', function(){
               const feed = document.querySelector('.feed');
               expect(entries.children.length > 0).toBe(true);
           });

          });
      

    /* TODO: Write a new test suite named "New Feed Selection" */
          describe('New feed Selection', function() {
            /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
            const feed = document.querySelector('.feed');
            const firstFeed = [];
            // converting the children elements of the feed to an array list to loop over
            beforeEach(function(done) {
                loadFeed(0);
                Array.from(feed.children).forEach(function(entry){
                    firstFeed.push(entry.innerText);
                });
                loadFeed(1, done);
            });

            it('change content', function() {
                Array.from(feed.children).forEach(function(entry,index) {
                    expect(entry.innerText, firstFeed[index], entry.innerText === firstFeed[index]);
                    expect(entry.innerText === firstFeed[index]).toBe(false);
                });
            });
          });
        
}());
