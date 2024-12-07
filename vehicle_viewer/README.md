# Vehicle Viewer

1.Commands
2.Architecture
3.Mocked data
4.Improvements
5.Other issues

1.Commands
To start the project run these commands in the project folder:
npm i
npm start
Counting on NodeJS is already installed and repository is downloaded.

To build for production
npm build --prod

To run tests
npm test

2.Architecture
The project implements Model-View-Presenter pattern.
In this pattern, complex logic is located in presenters classes, injected in components that contains simpler components.

For state management, Redux is implemented.
This design pattern defines actions that user can dispatch.
These actions may execute effects, which communicates with backend.
After effect is done, or in case there are no effects related to the current action, reducers are executed. These are small pieces of code that perform specific operations in the state.
All changes in the state are retrieved by selectors, which transfers data to the components and services.

3.Mocked data
Some of the data used in this app has been hardcoded. This means is being written while it is supposed to be retrieved from back-end or configuration files.

The data that shall be transfered from back-end is:

- User roles (with a classic login view)
- Vehicles list
- Vehicle detail
  The following data may be retrieved from back-end, but it may also come in a config-file:
- Fuel list
- Colors list
- Vehicle types list

  4.Improvements
  UI/UX could be improved, since this app was created keeping it in its simplest way. It would be nice to define a two to five colors theme.
  Location files may be added, creating a file for each supported language (en.json, fr.json, es.json...), the language could be switched by enabling a button, may be inside a burger-menu.
  Environment files could be enabled.
  Test could cover html templates.

  5.Other issues
