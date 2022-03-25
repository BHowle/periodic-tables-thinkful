# Capstone: Restaurant Reservation System

## Live application URL
`https://pt-restaurant-frontend.herokuapp.com/dashboard`

## Technology Used
### Frontend
- ReactJS
- CSS
- JSX

### Backend
- Postgres (knex)
- NodeJS
- Express

<br>

## Summary
Periodic Tables is a restaurant management application that allows restaurant owners to create, edit, and manage reservations and tables. It also provides the ability to sort, search, and change the status of reservations made that the restaurant

<br>

## Installation Instructions

### Frontend
- `cd` into `Thinkful/front-end`
  - run `npm install`
  - run `npm start` to start the application

### Backend
- `cd` into `Thinkful/back-end`
  - run `npm install`
  - run `npm run reset` to rollback, migrate and seed the database
  - run `npm start` to start the application

<br>

# Features

## Manage Reservations
Managing reservations can be done via the Dashboard.

The dashboard by default lists the tables and any reservations that are for the current day. Using the previous and next buttons, users are able to cycle through the days to look at reservations, past or future.

The tables and their availability are listed in a table on the main page.

![dashboard](https://github.com/BHowle/periodic-tables-thinkful/blob/main/images/Dashboard.PNG)

## Create a Reservation
Creating a reservations is done by clicking 'New Reservation' on the navigation bar.

![newReservation](https://github.com/BHowle/periodic-tables-thinkful/blob/main/images/CreateReservation.PNG)

## Searching for a Specific Reservation
Users can search for a particular reservation by the mobile number associated with the reservation. This can be done by clicking the 'Search' option in the left-hand navigation.

![searchByMobile](https://github.com/BHowle/periodic-tables-thinkful/blob/main/images/Search.PNG)

## Edit Reservations
Users can also edit existing reservations if information needs to be changed and updated.

![editReservation](https://github.com/BHowle/periodic-tables-thinkful/blob/main/images/EditReservation.PNG)

## Managing Tables
Expanding the restaurant? Create new tables by selecting the 'New Table' option in the left-hand navigation.

![newTable](https://github.com/BHowle/periodic-tables-thinkful/blob/main/images/CreateTables.PNG)


# API

## Create Reservation
**POST** `/reservations`
  - Required body:
    | Param      |  type     |
    | ---------- | ---------- |
    | `first_name` | `str` |
    | `last_name` | `str` |
    | `party` | `int` |
    | `reservation_date` | `date` |
    | `reservation_time` | `str` |
    | `mobile_number` | `str` |




## Get Reservations by Date
**GET** `/reservations?date=<reservation_date>`

Returns reservations for a particular date



## Get Reservations by Id
 `/reservations/:reservation_id`

### Available Methods
- **GET** - Returns a reservation given an existing reservation Id
- **PUT** - Modifies an existing reservation given an existing reservation Id
  - Required params:
    - `reservation_id (int)`
  - Required body:
    | Param      |  type     |
    | ---------- | ---------- |
    | `first_name` | `str` |
    | `last_name` | `str` |
    | `party` | `int` |
    | `reservation_date` | `date` |
    | `reservation_time` | `str` |
    | `mobile_number` | `str` |



## Get Reservation Status
**GET** `/reservations/:reservation_id/status`

Returns a status of [ `booked, seated, finished, cancelled` ] for the particular reservation



## Get Tables
- **GET** `/tables`

Returns the available tables.



## Create Table
- **POST** `/tables`

Creates a table to be listed in the table list.

 - Required body:
    | Param      |  type     |
    | ---------- | ---------- |
    | `table_name` | `str` |
    | `capacity` | `int` |



## Update Table Status
- **PUT** `/tables/:table_id/seat`

Sets table status to 'occupied' and ties a `restaurant_id` to it.

 - Required body:
    | Param      |  type     |
    | ---------- | ---------- |
    | `reservation_id` | `int` |



## Finish Table
- **DELETE** `/tables/:table_id/seat`

Sets the table status to `free` and the accompanying reservation status to `finished`
 - Required body:
    | Param      |  type     |
    | ---------- | ---------- |
    | `reservation_id` | `int` |