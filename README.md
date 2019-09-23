# My YouTube  
My youtube app built using youtube public data api.

## Installation Instructions
Assuming a working android sdk, please clone the repository and run below command inside terminal to install all the dependencies. 
```sh
$ npm install
``` 

## Runtime Environment
These things will be required to setup the environment for supporting android platform.

| Item | Version |
| ------ | ------ |
| Android Studio  | [Any latest version after 2.3.3]|
| Java JDK | [Version 8] |


## Comaptibility 
Due to rapidly changing react native eco system, some version mismatch errors could occur while building the application.
This application is using react native version 0.52 right now. 

## Data API Keys
Youtube data api key is required for all the operations.

## Project Wide Properties
Project wide properties can be defined inside android/build.gradle in case of version mismatch errors. For example. 

```
ext {
    compileSdkVersion = 26
    targetSdkVersion = 22   
    buildToolsVersion = "26.0.2"
    //supportLibVersion = "27.1.0"
    googlePlayServicesVersion = "11.2.0"
    gradle3EXPERIMENTAL = "yes"
}
```
now default versions are superseded by these versions defined in build.gradle file.
