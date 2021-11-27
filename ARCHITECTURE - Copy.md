# ANGULAR ARCHITECTURE

## LAYERED ANGULAR ARCHITECTURE
Goal: decomposing the system through abstraction layers to achieve loose-coupling, abstraction and separation of concerns, unidirectional data flow, reactive state management.

Sources:
[Architecting Enterprise Angular Application](https://medium.com/@getrohith.sathya/architecting-enterprise-angular-application-3276ac496c02)
and
[Angular Architecture Patterns and Best Practices (that help to scale)](https://dev-academy.com/angular-architecture-best-practices/)


## Horizontal division - three abstarction layers

### Presentation Layer (bottom) 
* presents the UI and delegates user’s actions to the core layer, through the abstraction layer)
* depends on the Facade layer, to get data and it should never directly interact with core layer

##### Dumb/Presentational Components
* do not have intelligence of their own
* depend on parent component to give them data (via Inputs)
* pass any user interaction back to parent component (via Outputs)

##### Smart/Container Components
* wrap one or more dumb/presentational components
* responsible for providing the data and handling the interactions from children component
* know where to get the data from and how to handle the events from children component
* interact with Facade layer

### Abstraction Layer (middle) 
* facade -  decouples the presentation layer from the core layer
* handles communication between presentation and core layer
* exposes the state data for the components in the presentational layer
* delegate logic execution to the core layer
* decide about data synchronization strategy (optimistic vs. pessimistic)
* might cache data from external API

##### Synchronization strategy
* **Optimistic update** changes the UI state first and then attempts to update the backend state. This provides a user with a better experience, as he does not see any delays, because of network latency. If backend update fails, then UI change has to be rolled back.
*	**Pessimistic update** changes the backend state first and only in case of success updates the UI state. Usually, it is necessary to show some kind of spinner or loading bar during the execution of backend request, because of network latency.

### Core Layer (top)
* contains application core logic - state management and async service
* responsible for all the data manipulation and outside world communication via APIs

##### State management
* we can pick any state management library that support RxJS (like NgRx) or simply use BehaviorSubjects. We can start with BehaviorSubjects to manage the state, and later if there is a need to replace State management with some other library, without impacting any other parts of the application
* state objects are immutable and they are returned by a pure function.

##### Async/API Service
* have only one responsibility, to communicate with API(REST) end points and nothing else
* avoid any caching, business logic or data manipulation here
* don’t let the async service know about the state management logic

## Vertical division - modular design
* vertical separation into feature modules
* each feature module shares the same horizontal separation of the core, abstraction, and presentation layer
* feature modules could be lazily loaded (and preloaded) into the browser

##### Two additional modules:
-	CoreModule - defines our singleton services, single-instance components, configuration, and export any third-party modules needed in AppModule. This module is imported only once in AppModule. 
-	SharedModule - contains common components/pipes/directives and also export commonly used Angular modules (like CommonModule). SharedModule can be imported by any feature module.



## ENTERPRISE ANGULAR MONOREPO PATTERN
 Sources:
[Starting Angular Projects With Nx](https://offering.solutions/blog/articles/2021/01/27/starting-angular-projects-with-nx/#creating-libraries)
and
[Nx Library Types](https://nx.dev/l/a/structure/library-types)

### Nx Workspace 
* consists of a single git repository with folders for apps (applications) and libs (libraries)
* a monorepo can contain multiple applications and multiple libraries

### Application
* an app produces a binary
* contains the minimal amount of code required to package many libs to create an artifact that is deployed
* meant only to organize other libs into a deployable artifact
* all of the application’s code is organized into libs
* contains a configuration for its build process
*	contains a configuration for running its tests
* can consume code from libraries

### Library
* a set of files packaged together that is consumed by apps
* similar to node modules or nuget packages, can be published to NPM or bundled with a deployed application as-is 
* libraries are either "app-specific" (used only by a particular app) or shared (shared things can be app specific and completely shared generic functionality)
* libraries are organized by scope (app-specific or shared) and type in the libs directory
* a typical Nx workspace contains only four (4) types of libs: feature, data-access, ui, and util

##### Feature libraries
* represent the entry point  and container components to that feature
* used as entry point when loading our feature from the app - this features are azy loaded from the app

##### Ui libraries 
* hold presentational components which are used by the feature components in the feature lib
* do not know data-services, they are getting the data passed in via @Input() decorated properties and help us to show the data they received
* They only care about how things have to look, not where the data comes from

##### Data-Access libraries 
* abstracting the data access and calls to a backend API like NodeJS, ASP.NET Core, etc. 
* all files related to state management also reside in a data-access folder (by convention, they can be grouped under a +state folder under src/lib).

##### Utility libraries
* things which are shared over that feature
* if you need some services over the complete feature, this is your place. 



