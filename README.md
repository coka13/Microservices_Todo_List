

# Microservices Fullstack Todo-List ✅ 
The Microservices Fullstack Todo-List app manages todos efficiently through a modular architecture. It uses microservices like DBservice for database operations and managerService for handling todo statuses. The application integrates queue management via RabbitMQ, email notifications through SMTP, and ensures easy deployment with Docker. Users interact via a polished UI, supported by functionalities for updating todo statuses and retrieving completion statistics, facilitating seamless task management across different environments.

## ARCHITECTURE

![](https://pouch.jumpshare.com/preview/usu0zet-dJqzNyfOIQIszlf2ineFuJtRs3_wuSjR7KzDo7mtP7C9svPOoSg92Gx0RTG2P-0riBt5avBh_YUw5jFcTZZPEZgwyMYCaCzBuv4)

## TECHNOLOGIES

 **- React + HTML + CSS** for a user-friendly and visually appealing UI in the client side.
 

 **- Node.js + Express.js**  implementing a server with seamless integration with the client side requests.


 **- MongoDB** for an easy NoSQL database


 **-RabbitMQ** for queue implementation in the microservice architecture.
 
 
 **- SMTP** notifying user by email of actions.
 
 
 **- Docker** dockerizing the app and adding an option to run it in every environment.

## **MICROSERVICES**

1 - **DBservice** - Microservice to perform DB operations.

2 - **managerService** - Microservice dedicated to specific functionalities like managing and updating the status of todos.

# **INSTRUCTIONS**

 1.  Run from root folder for the first time:

    docker-compose down 
    docker-compose up --build
   

 2.  If you already have all containers run this command:
 
    docker-compose up -d

 3.  You can run all containers from Docker Desktop:
 
 ![](https://i.imgur.com/6vQpKhI.png)
 




## MongoDB Compass
**FOR WINDOWS**
 1. Find you local ipv4 address using "ipconfig" in cmd:

![](https://i.imgur.com/KetzBmn.png)

 1. Insert the address instead of the "localhost":
 
 ![](https://i.imgur.com/mBJld6N.png)

## SMTP4DEV
Go to **http://localhost5000/** to monitor SMTP messages

![](https://i.imgur.com/ef7ZPy8.png)
 

## RABBITMQ
Go to **http://localhost:15672/** login with:
**Username:** admin
**Password:** admin
Now you can monitor the queue


![](https://i.imgur.com/8qdkSRG.png)

## **CLIENT**

https://www.youtube.com/watch?v=21nfeRn7L-E
