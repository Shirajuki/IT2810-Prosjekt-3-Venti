# Cloninge and running the application

### Install dependencies:

- Clone the applictaion with https.

`git clone https://gitlab.stud.idi.ntnu.no/it2810-h20/team-07/prosjekt-3.git `

- Run the following command in both the frontend and backed folder:

`npm install`

### Running the application

To run the application, enter the backend folder and run the command:

    npm run servers

### Running the cypress tests

To run the cypress tests, enter the frontend folder (in a separae teminal with the application still running) and run the command:

    npx cypress open

## Contents

Our application is a makeup store, where a user can search, sort and filter through the different products in the database. A user can also add and remove products from a cart as they wish. This will be saved so that when the user revisits the site, the cart will contain the products from the previous sessions. To make shopping easier for the user, they can read and write reviews under the different products. This makes the shopping experience better by knowing what products work and what products don't work.

All functions are easily available on the frontpage, as we wanted to make the shopping experience a breeze. When opening the application, a user will find a magnifying and cart icon. This is to represent the search function and the shopping cart function. By pressing the search icon, the user will get an input felt where they can type in a product they wish to see, here it is important to make sure that the word is typed correctly. If the user doesn't want to search for a product, they can scroll down and browse the product that are available. Here they have the option to either filter and/or sort the product catalog. By doing this they can easily find new products from brands they might not have heard of. If they decide they like the product, they can add them to the cart by pressing on the product and pressing on the buy button. This will then add the product to the cart until it is deleted. If a user has tried a product before, they can leave a review on the product by pressing the product and scrolling down to see reviews and add on there.

The application is designed to have a responsive design, to better accommodate for different types of users. This makes it so that the store will work both on large screens and on smaller ones. We made sure that the webpage was simple and intuitive to use, so that the user could have the best possible experience.

## React

Our website is written in TypeScript and based on the react framework. It was created using the create-react-app function. Here we have used both classes and functional components, although functional components have been used more due to their adaptability. The webpage is implemented as a single page application, as stated in the assignment.

When first looking at the products on the webpage there is little information about them, by clicking on the products, a user opens a modal where they can view all the information they need about the products, the cart, and what other users think of the products. The modals are opened and closed by listening to the state of the “modal prop” which contains the id of the product chosen.

React hooks such as UseState, UseEffect and UseRef have been heavily used throughout the application to open and close modals, keep track of data from the api, show and use the search bar etc.

To make the code as easy to read as possible and organized, we decided to divide most of the elements of the page into components such as items, modal and carousel. Items checks the property of the item and returns it to display the way we want it to be displayed. The modal component contains all the different parts of the modal. It is the collecting point of where a modal is put together so it will be featured correctly. The carousel contains the components that are needed to showcase the items as a carousel, this will show feature products so that a user can easily view new products (?).

To make sure that the application looked similar on all different devices, we decided to use the third part component react-icons. This is a better way to display icons as they are more reliable than the usual emojis that can vary between different devices.

## State management

For state management, we decided to mainly use MobX as the project isn’t that complex where Redux can be seen as an unnecessary complex for the functionality needed. Secondly, it is also known to be much easier to grasp MobX even though Redux got a much larger popularity and sources, since it’s known that the philosophy behind MobX is `simple`. This was also chosen as it is, because the groups experience with state management other than React hooks has been close to none up till now. We then thought in order to submit a great product where almost all of our components would need to handle form of states, choosing MobX to handle the states would benefit the group greatly in submitting the project in time with the best quality. MobX is known for using observable data that allows for tracking changes and updates its data automatically making it more simple and effortless to store and render states rather than Redux’ plain JavaScript objects as data structures to store states. MobX as a state management did also make it less confusing for managing different states of each component, since it allows for multiple stores rather than a single store like Redux. This was then used alongside React Context as an advantage for both separating the stores to its each main components for better code structure and readability, but also let the states become accessible by many other components at different levels. This means instead of Inject/Provider, we use React Hooks as it gives us the said freedom in both implementation but also for better testability and accessibility. `mobx-react-lite`, a more lightweight React binding for MobX, was thus used as a package instead of `mobx-react` as it completely drops Inject/Provider since useContext was meant to be used instead.

## REST API and MongoDB

We decided to use the REST api with a mongo database. We considered using mySQL since most of the group members were already familiar with it, but decided on mongoDB due to its similarity to json and because of the learning opportunity. We also briefly considered using the graphQL database after deciding on mongo since it is new and something we wanted to learn, but after testing it out for a bit we landed on REST as it better suited our needs and was easier to implement.

In the mongo database (that is running on the vm) we have 2 different collections, products and sessions, that keep track of all the makeup objects in our database and the session information such as shopping cart that a user might want to access later. To fill the product collection we used a python script to copy all of the information from the open source makeup api located here.https://makeup-api.herokuapp.com/api/v1/products.json

## User generated data

To comply with the requirement of having some user generated data we decided to have the user be able to add products to their shopping cart, which is saved for the next time they access the site.

## Third party components

One of the third party components we have decided to implement have been js-cookie that helps us keep track of, and derive information, from cookies. This aids in recognising an earlier customer and providing them with their previous shopping cart.

## Testing

The reason that we test is to make sure that the code gives us the expected result that we were hoping to get. There are many different types of testing and in this project we choose to have mock testing, snapshot test, end-to-end tests and unit tests. In this project, the main focus on testing was end-to-end and unit testing. An easy way to make an end-to-end test is by using Cypress. Cypress is a framework that does most of the interactive testing for us. This was used to write end-to-end tests, as it will dynamically test different elements on the webpage. The cypress folder, contains smaller tests to focus on the components for individual interactions, like filtering or searching, and one big end-to-end test that goes through how we think a user would use the application. To make mock tests and snapshot tests we used Jest and react-testing-library. Here we sendt in mock data and use that to make sure that all the different parts of the program work.

To run the cypress use code …

to run jest test use code …

## Git

Early on in the process we decided to make the issues for each important part of this project. By doing this we early had a good overview of the project and what needed to be done. We decided to make branches for the different issues as to always have a working master branch. When making commits we make sure to add the issue number so that we know what commits go to what.
