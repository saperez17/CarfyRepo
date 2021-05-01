**CS50&#39;s Web Programming with Python and JavaScript**

**Final Project - Carfy**

**INTRODUCTION**

Carfy was born not only as this course&#39;s final assignment but as a real need among car drivers. In today&#39;s society, people have increasingly less time to attend secondary presential activities. That&#39;s why online alternatives such as online shopping have become popular, taking services one step closer to customers by offering easy-to-access cloud platforms. Food delivery, clothing and entertainment are among popular services now offered through the internet. There seems, however, to be a population with needs being left overseen, car drivers. More generally, automobile drivers, including motorcycles, SUVs &amp; EV cars, face a real challenge when their cars need technical assistance. Most drivers rely on their local technical shop, others on personal contacts or a car dealership guarantee. Those, however, are not centralized services and may even be unavailable when the driver needs it the most (a car broken on a high-traffic avenue). Carfy attempts to alleviate this by providing all vehicle drivers a single, centralized, always available marketplace for vehicle technical assistance &amp; services

**TECH STACK**

On a more technical description, Carfy runs on top of two main technologies: Django and React.

**DJANGO PROJECT STRUCTURE**

-backend application

The Django project contains two applications: &quot;api&quot; and &quot;frontend&quot;. The API application defines the Django models, API endpoints and manages the app&#39;s user authentication. This app contains no JavaScript code as it is solely tasked with the backend logic.

-frontend application

On the other hand, the frontend application contains the UI code created using React.js. This decoupling allows for a better separation of concerns by having two separate applications working simultaneously, performing fundamentally different tasks. The exact way of how React was integrated into Django will be explained in greater detail in subsequent sections.

**backend APLICATION**

The backend application structure is the same as any Django app. The following image shows this structure:

![](RackMultipart20210501-4-1p10h84_html_f9173778fec71628.png)

_Figure 1_

The most relevant files in this structure are models.py, serializers.py, urls.py, and views.py.

- **models.py** -\&gt; defined the app&#39;s models or database tables
- **serializers.py** -\&gt; Python classes to map external data formats into model instances and vice-versa.
- **Urls.py** -\&gt; defines the URL paths for each view on views.py
- **Views.py** -\&gt; defines the views accessible via URL

**Models.py**

Inside this file, we can find all model&#39;s definitions. First, two profile models are defined: Customer and ServiceProvider. They are called profile models because they extend Django&#39;s default User model by creating an OneToOne relationship. Next, because the ServiceProvider model represents shop owners, they should be able to create shops, as such a new model Shop is defined with an OneToMany relationship between the ServiceProvider and Shop models. Furthermore, each shop should be able to offer multiple services, thus the need for the ShopService model. Finally, a service can be requested by any Customer; this customer request data is encapsulated by the service request model. There are some extra classes in the file mainly for helping to organize multiple-choice field options.

**Urls.py**

The urls file contains the url routes the frontend will use to interact with the backend.

![](RackMultipart20210501-4-1p10h84_html_fe5469736d13c1a4.png)

_Figure 2_

The first three paths handle user authentication and creation. I decided to include these on the backend firstly because it&#39;s where data is being retrieved and sent to, thus it requires local user-based access control. Secondly, because I wanted to keep Django&#39;s default user authentication system. Each URL route accomplishes the following tasks:/Login -\&gt; log in users based on username and password

- /signin -\&gt; register new users
- /logout -\&gt; log outs users
- /check\_auth &amp; /lead/ -\&gt;testing endpoint
- /user -\&gt; list all registered users and user creation
- /customer -\&gt; for customer listing and creation
- /customer/requests/ -\&gt; list all customer service requests
- /service-provider/ -\&gt; for service provider listing and creation
- /shop -\&gt; for shop listing and creation
- /shop-service -\&gt; for shop service listing and creation
- /shop-service/\&lt;int:shop\_id\&gt; -\&gt; for shop service listing and creation with id=shop\_id
- /shop-service/\&lt;int:shop\_id\&gt;/requests -\&gt; service requests listing and creation for shop with id=shop\_id
- /service-request -\&gt; service requests listing and creation
- /service-request/\&lt;int:provider\_id\&gt; -\&gt; service requests listing and creation for provider with id=provider\_id

**Views.py**

The actual implementation of each path&#39;s function is done in the view.py. This did heavily use Django Rest Framework generic views, thus most of them are class-based views. In order to keep this documentation concise, let&#39;s take a look at the view for the /shop URL:

![](RackMultipart20210501-4-1p10h84_html_77403de0e3e464c5.png)

_Figure 3_

The ShopListCreate class inherits from generics.ListCreateAPIView and defines two class attributes: queryset and seralizer\_class. The first one is the queryset returned on a get request, while the serializer is a class used to transform the queryset into a suitable format for transmission over the network, which is JSON for this project. As it is evident from figure 3, the get and post methods were overwritten so as to allow for custom logic. The GET method verifies if there&#39;s a shop with the shopname retrieved from the request body. If true, that shop&#39;s data is returned, otherwise, all shop data is returned.

**Frontend APLICATION**

The frontend application defines the user facing interface with react. This app&#39;s structure looks as follows:

![](RackMultipart20210501-4-1p10h84_html_55a66c7a671c88a4.png)

_Figure 4_

Since this application is only tasked with presenting the UI, it doesn&#39;t hold any business-related logic, thus most of the commonly used files in a Django app are almost empty. Essentially, the urls.py file specifies the single view route, while the views.py file returns the corresponding HTML template from the templates/folder.

![](RackMultipart20210501-4-1p10h84_html_c2ac3d78d7998eee.png)

_Figure 5. urls.py file_

![](RackMultipart20210501-4-1p10h84_html_1dde0561036a7dc2.png)

_Figure 6_

As shown in figure 6, the index view renders the index.html file located in the frontend folder of the frontend application. As we are going to see, this HTML file loads the react code using Django static template tag.

![](RackMultipart20210501-4-1p10h84_html_e57508cbcec24eee.png)

_Figure 7_

Figure 7 shows the index.html file markup. There we see, first, the JavaScript code loading from frontend/public/main.js. This file is automatically created by webpack, a build tool used to compile and process the react code, styles, and other files. Later it&#39;ll be explained how this file is generated. Second, we see the single div tag with id &quot;root&quot;. This HTML element is where the react application is loaded into.

**Index.js**

![](RackMultipart20210501-4-1p10h84_html_b00784c85433d8bb.png)

_Figure 8_

This file, also known as the entry point for the webpack, defines where the React application will be loaded. In this case, that is inside the element with id &quot;root&quot; in the index.html file. We can see that the render method contains one parent component and one children component. The parent component, or BrowserRouter, is a routing component, and the App component is the Carfy UI React code we&#39;ll see shortly. Before moving on, we previously mentioned that the main.js file loaded into the index.html file was automatically generated. Well, we configured the webpack to take this index.js file as input, and output the main.js file. To do this, in the Django project root path we need to initialize a new npm package and create a webpack.config.js as shown below:

![](RackMultipart20210501-4-1p10h84_html_8ef06c0e89ec83d4.png)

_Figure 9_

Inside the webpack.config.js file, there&#39;s configuration code for what type of files the webpack will process, and where to put its output. However, the most important configuration part is the entry point file configuration and the output file. These two are defined in the entry and output attributes of the module.exports object: ![](RackMultipart20210501-4-1p10h84_html_d9e7a86c3e3cf6f0.png)

_Figure 10_

The entry attribute is assigned to an array with two values, the first one the babel compiler, and the second one the entry js code that will be compiled. In the output attribute, the output path and the output filename are defined. There are more custom webpack settings included in this file, but those are beyond this document scope.

NOTE:

All files seen and folders seen in figure 9, with the exception to the carfy folder (Django project) are pushed to the grading remote branch in order to adhere to the general file structure of previous project, and also because they are not required for running the application and are required at development time providing hot reloading of the react code.

**The App component**

As pointed out in the index.js section, in figure 8 the App react component is used. This component is where Carfy&#39;s UI interface is coded.

![](RackMultipart20210501-4-1p10h84_html_859a5472ce46392b.png)

_Figure 11_

Any React application is made up of components. In figure 11 there&#39;s a Components folder containing react components used in the App.js component, as well as in other components. App.js defines a single class-based App component that renders the top navbar and creates a routing system that renders different parts of the application based on the user&#39;s interaction with the web app. To achieve this, the App component uses the React Router routing library.

**SPECIFICATION**

**All Services** : The main page lists all services available. Each service should show the service name, category, a short description, and its price. It should also include a button that takes the user to a detail page about that service.

- A filter above the services listing section allows uses to filter services by date, price, or both.

**Profile View:** Customer and Service providers can access a profile view by clicking on the top-right profile icon and choosing the profile option from the dropdown menu.

- The profile page displays basic user information.

**Service Detail View:** The service detail view should show all information regarding that service. If the service includes pictures, these pictures should be visible.

- The view includes a &quot;Buy Now&quot; button that allows the user requests the service immediately, and an &quot;Add to cart&quot; button to add the service to the shopping cart.
- If the user is not logged in, the service cannot be requested and a pop-up notification shows up.

**Shopping Cart:** Customer users can access the shopping cart view where items added to it are listed.

- Each cart item displays its price and quantity.
- There is a delete button that removes the selected item from the shopping cart.
- At the bottom of the page, there&#39;s an order summary section displaying the order&#39;s total value and a checkout button to confirm the purchase.
- As for now, no actual payment is being proceeded.
- Upon confirming the order, the chosen service requests are made and the corresponding providers are notified

**Customer Requests View:** After a customer has confirmed any service request via the shopping cart view, the Requests View displays all services requested.

- Requests are listed based on their status: &quot;Accepted&quot;, &quot;Requested&quot; and &quot;Completed&quot;.
- There are buttons on top of the list that allows the user to change the listed requests.
- Each list item shows information about the requested service and its provider.

**My Shop View** : A service provider user has access to My Shop option by clicking on the top-right corner icon and clicking on the My Shop option.

- If the provider user has no registered shops, information about a shop is and how to register one is displayed. An action button is included which takes the user to a shop registration form.

- If the provider user has registered shops instead, they are all listed.
- Each listed shop shows relevant information about that shop: name, slogan, membership, and city.
- Each listed shop is a clickable element that takes the user to a detailed view of that shop.
- An add button is added at the end of the list for registering a new shop.

**Shop Detail View** : Each listed shop after being clicked takes the provider to a detail view with information about that shop.

- On top of the view, general information about the shop is displayed: Shop name, slogan, membership, and city.
- Below, there is a navigation bar with three sections: services, requests, and stats.
- The services section shows all services the current shop offers, as well as a button to add a new service.
- The requests section lists all service requests customers have made to this shop. Each row contains the following data: shop, service, customer name and contact, location, and an action column that allows the provider to accept or reject the request.
- Accepting or rejecting the request updates that request&#39;s status accordingly.

**HOW TO RUN THE APP**
Running Carfy is not much different from running any Django app. In the command line run "python -m manage runserver 9000", then once it
has finished loading go to 127.0.0.1:9000/carfy, this is the URL path to access Carfy.

Here there are two test users to test the app.
Customer.
username: santi
password: carfy123

Provider.
username: ale	
password: carfy123


**OBSERVATIONS**

Carfy is a full-stack web application that required the full knowledge acquired during the CS50&#39;s course development, as well as throughout research of technical documentation about react and Django, as well as other web development topics. Complex Django models were used, business logic was built and tested for this particular application; views and endpoints were made available for data management, and finally, a full React-based UI was created. Furthermore, the application followed strict version control patterns by having it on a remote GitHub repository and incrementally pushing changes to it. New branches were created, merged, and deleted as the app development progressed. It&#39;s also worth mentioning that Carfy is not simply a requirement-fulfillment project, and even though this project motivated its creation, it is of my interest to keep working on it. Overall, Carfy is a comprehensive web app that, from my perspective, evidences a good understanding of web development practices, modern technologies, and appropriate web dev patterns and practices.