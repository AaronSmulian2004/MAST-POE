Chef Menu App - Portfolio of Evidence (PoE)

Overview

This mobile application, developed in React Native, is designed to help Chef Christoffel manage his personalized culinary experiences. It provides a dynamic menu management system that allows him to easily update menu items, filter them by course, and provide guests with a seamless digital menu experience.

This version of the app is very different from what I submitted for Part 2. I wasn't happy with how Part 2 turned out, so I rewrote most of the code to fix bugs and make it work better.

Key Features

    Dynamic Menu Management: Allows Chef Christoffel to add, edit, and remove menu items with ease.

    Predefined Course List: Uses a dropdown/picker to select from a predefined list of courses (Starter, Main, Dessert, etc.).

    Guest Filtering: Enables guests to filter the menu by course on a separate page for easy browsing.

    Average Price Calculation: Calculates and displays the average price of menu items for each course.

    Data Persistence: Not implemented

    Responsive Design: Uses CSS for styling (and it is not correct)

    Complete Changlog:

Project Structure

The project is organized into the following directories:

    App.tsx: Contains the main application component, navigation setup, and global state management.

    _screens/: Contains the screen components:

        HomeScreen.tsx: Displays the menu, total menu items, and average prices.

        ManageMenuScreen.tsx: Allows the chef to add and remove menu items.

        MenuFilter.tsx: Allows guests to filter the menu by course.

Changelog (Since Part 2)

All the feedback I received has now been implemented!

    Improved all styling with new CSS

This code is the correct, working version, with all the tasks being delivered

    Fixed: The ability to now filter correctly and the styling has been applied.

This list indicates all changes implemented

Refactoring Changes

The following changes were made during the refactoring phase:

    Centralized state management in App.tsx using the useState hook to create a more organized single version of truth.

    Improved CSS with new colours.

    Components such as Picker and Text Input can now be entered correctly, as there is a value checker!

GitHub Repository

[Insert Link to Your GitHub Repository Here]

Video Demonstration

[Insert Link to Your Video Demo Here]

Conclusion


Thank you for reviewing my Portfolio of Evidence. I welcome any feedback and look forward to further developing my skills in mobile application development.
