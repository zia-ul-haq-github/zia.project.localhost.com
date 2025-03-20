# Online Tutor Finding Application
#### - Your ultimate online tutor finding application.

The "Online Tutor Finding Application" is a web-based platform designed to simplify the process of finding and hiring educational tutors. The system enables parents/users to browse tutors based on specific categories like Computer Science, Mathematics, Medical, and Engineering. The admin manages tutor registrations, categories, and financial operations. Tutors interact with the system to manage classes, share resources, and conduct quizzes.

### Key Objectives:
1. Simplify tutor discovery for users.
2. Provide a platform for tutors to manage and deliver their services.
3. Offer administrative tools for efficient management and reporting.

### Stakeholders:
1. Admin: Manages tutors, categories, and finances.
2. Parents/Users: Browse, select tutors, and access services.
3. Tutors: Provide educational services and track student progress.


----

### Language & Framework Used:
1. PHP : v8+
2. Laravel : v10+
3. Nodejs : v20.11.0
4. NPM : 10.2.4
5. Reactjs : 18.2.0
6. Ant Design Pro : 6.0.0 

----

### How to Setup the Project:

#### 1. Clone Project
Open the terminal and run the following command.
```bash
git clone https://github.com/zia-ul-haq-github/zia.project.localhost.com.git
```
after clonning go to the project drectory by runing the following command.
```bash 
cd zia.project.localhost.com
```
----

#### 2. Setup Enviornment
Create `.env` file & Copy `.env.example` file to `.env` file and setup database, currently we are using mysql database `zia.project.localhost.com` so make sure you have this database on your server if not so create it or setup what you want.

----

#### 3. Re-build UI App
The clonned project will include the last build assets of frontend UI app but if you would like to rebuild or modify the app so, do the following steps.
1. Navigate to the `resources` -> `app-ui`
1. Instal the development dependencies by running the following command.
```bash 
npm install 
```
1. Re-build the UI app assets by running the following commands.
```bash 
npm run build
```
----

#### 4. Install PHP Dependencies
Run the following commands to install the required packages and generate the autoload files.
```bash 
composer install
```
----

#### 5. DB Tables & Dummy Data
Now migrate and seed database to complete whole project setup by running the following command.
``` bash
php artisan migrate:refresh --seed
```
It will create the app-required tables in the database and will also insert the following dummy data to set up the demonstration.
1. Users ( 24 ) 01 Admin, 03 Tutors, 20 Users
1. Qualifications ( 09 )
1. Experiences ( 06 )

----

### 6. Run the server -
``` bash
php artisan serve
```

----

### 7. Visit the following url in your browser.
http://127.0.0.1:8000 

----