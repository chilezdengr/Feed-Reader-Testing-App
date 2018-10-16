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
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* a new test spec that check if each of the allFeeds url is defined 
            * and their lenghts anything greater than 0. first we loop through the array of the feeds
         */
        it('define url', () => {
            for(let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        /* a new test spec that check if each of the allFeeds name is defined 
            * and their lenghts anything greater than 0. first we loop through the array of the feeds
            * same principle applied above in the case of the urls.
         */
        it('define name', () => {
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* TODO: Write a new test suite named "The menu" */
       describe('the menu', function() {
        /* We try to query the body element, to check if the menu item is actually hidden, 
        * Our Jasmine test would expect the menu-hidden class to be true
         */
          const body = document.querySelector('body');
        it('it is hidden', () => {
            expect(body.classList.contains('menu-hidden')).toBe(true)
        });

         /* this test checks for the toggle-ability of the menu. 
         *the body element is querried for the hidden menu class and sets it to false which displays 
         * the menu. And when the menu-hidden is expected to be true the menu is hidden.
          */

          it('toggles on and off', () => {
              const menu = document.querySelector('.menu-icon-link');

              menu.click();
              expect(body.classList.contains('menu-hidden')).toBe(false);
              
              menu.click();
              expect(body.classList.contains('menu-hidden')).toBe(true);
          });
         });
    
    /* TODO: Write a new test suite named "Initial Entries" */
          describe('Initial Entries', () => {
                /* A test that ensures when the loadFeed
            * function is called and completes its work, there is at least
            * a single .entry element within the .feed container.
            * Remember, loadFeed() is asynchronous so this test will require
            * the use of Jasmine's beforeEach and asynchronous done() function.
            */
           beforeEach((done) => {
               loadFeed(0, done);
           });

           it('completed with one entry', () => {
             //const feed = document.querySelector('.feed');
               expect($('.feed .entry').length).not.toBe(0);
           });

          });
      

    /* TODO: Write a new test suite named "New Feed Selection" */
         describe('New Feed Selection', function(){
        let initialFeed;
        var newFeed;

        // save previous entries and load new ones
        beforeEach(function(done){
            // Get the previous first entry;
            loadFeed(0, function(){
                initialFeed = $('.feed').html(); //here the callback function runs only 
                //after loadFeed loads feed 0 so we know that $('.feed')
                // is already populated with 0th feed.(As suggested by the last reviewer)
                loadFeed(1, function(){
                    newFeed = $('.feed').html(); //the jquery's .html is similar to the .innerHTML method
                    done();
                });
            });
        });

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * We recall, loadFeed() is asynchronous.
         */
        it('load a new feed', function(){
            // Compare the HTML of both feeds.
            expect(newFeed).not.toBe(initialFeed);
        });
    })
        
}());
