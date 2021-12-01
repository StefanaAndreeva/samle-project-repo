# InventorySampleApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



# SETUP - Jest, Cypress, ESLint, Prettier
The steps bellow are based on this [Source](https://medium.com/@rjnay1984/creating-a-modern-angular-app-with-jest-cypress-eslint-and-prettier-75411086872e).

### Add ESLint
`ng add @angular-eslint/schematics`

### Add jest and remove Karma

`ng add @briebug/jest-schematic`

`npm uninstall -D @types/jasmine jasmine-core jasmine-spec-reporter karma-coverage`

In **jest.config.js** add the following line: testMatch: `["<rootDir>/src/**/*.spec.ts"]`

Note: This is important once we install cypress, so jest doesn’t try to test those specs as well

### Add Cypress:
`ng add @briebug/cypress-schematic`

### Add Prettier with airbnb styleguide:
`npm i -D eslint-config-airbnb-typescript eslint-plugin-import eslint-config-prettier eslint-plugin-prettier prettier`

#### Add **.prettierrc** file:

`{
  "singleQuote": true,
  "arrow-body-style": "off",
  "prefer-arrow-callback": "off",
  "printWidth": 120,
  "overrides": [
    {
      "files": "*.html",
      "options": {
        "parser": "html"
      }
    },
    {
      "files": "*.component.html",
      "options": {
        "parser": "angular"
      }
    }
  ]
}`

#### Add **.prettierignore** file:

`/dist`

`/coverage`

### Modify .eslintrc.json file
See commented lines

### Lint, Test, e2e
`npm run lint`

`npm run test`

`npm run e2e`

**Note:** if npm run test fails refer to [this post](https://gitmemory.cn/repo/briebug/jest-schematic/issues/72).

## Folder structure

##### Core Module
* core module is to be imported ONLY in the app module - to prevent re-importing the module elsewhere, we should add a module-import-guard in it’s constructor method
* contains only services that are singleton and reused in more than one feature module in the application
* a good place to add route guards and http interceptors
* constants, enums, utils, and universal data models (interfaces)
* might contain static components like the toolbar/navbar and footer

##### Shared Module
* contains all components, directives and pipes that are shared and used in multiple feature modules or the app.module.ts
* shared module will be imported in any feature module that requires the shared components
* shared module may be imported in app module as well if the app module needs a component from the shared module
* shared module shouldn’t have any dependency to the rest of the application, and should therefore not rely on any other module

##### Feature Modules
* all feature areas are in their own folder, with their own module
* feature modules deliver user experience dedicated to a particular application feature
* contains a top component that acts as the feature root and private, supporting sub-components descend from it (smart and dump components)

##### Styles Folder
* contains mixins or css-functions, responsible for their own areas


#### Example

├── src
  
    ├── core                   
    
        ├── services (async, store, facade)                      
    
        ├── router-guards                  
    
        ├── interceptors

        ├── components                         
        
        ├── constants        

        ├── enums   

        ├── models

        ├── utils                 
    
        └── core.module.ts 

    ├── shared                   
    
        ├── components                      
    
        ├── directives                
    
        ├── pipes             
    
        └── shared.module.ts     

    ├── styles                   
    
        ├── _colors.scss                      
    
        ├── _utils.scss                          
    
        └── _index.scss    

    ├── features                   
    
        ├── feature-A  

          ├── components (dump components)  

          ── feature-a-routing.module.ts  

          ── feature-a.module.ts

          ── feature-a.component.html|scss|ts (smart component)                 
    
        ├── feature-B            
    
        ...            
    
        └── feature-C  

    └── app.module.ts      


## Skeleton of the app

### Generate new project

`ng new inventory-management-app`

### Create a feature module with routing in a feature folder and register it with the root AppModule.

`ng generate module features/users/users --module app --flat --routing`

### Create a component inside a folder/module

`ng generate component features/users/users-list --flat`

### Cretae core and shared modules

`ng generate module core --module app`

`ng generate module shared --module`

### Create service (in core folder)

`ng generate service core/services/async/data-access`

`ng generate service core/services/store/users-state`

### Creat guard (in core folder)

`ng generate guard core/guards/auth`
