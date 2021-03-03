# SCHOOLSPACE-API

### Setup guide for developers

#### Prerequisites :
- node
- mysql

Git clone this project into a directory either using ssh or https :

(If you have a ssh key for github) SSH: ```git clone git@github.com:duttasamd/schoolspace-api.git```

https : ```git clone https://github.com/duttasamd/schoolspace-api.git```

#### MacOS :
(Optional) Install Homebrew : 

```/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"```

##### With Homebrew installed
Install node : ```brew install node```
Install mysql : ```brew install mysql```

After mysql has been installed, create a new database instance. (To follow this example name it **schoolspacedb**)

```mysql -u root``` or ```mysql -u root -p``` (with password)

Inside mysql (replace <> with own values) :

```CREATE DATABASE schoolspacedb;```

```CREATE USER '<user>'@'localhost';```

```GRANT ALL PRIVILEGES ON schoolspacedb.* To '<user>'@'localhost' IDENTIFIED BY '<password>';```


Open the cloned repository in an editor.
Copy the contents of ```.env.dist``` at the root of the project and create a new file ```.env``` in the same location and paste.


```
DB_USERNAME=<user>

DB_PASSWORD=<password>

ACCESS_TOKEN_SECRET=<64-bit secret key>

REFRESH_TOKEN_SECRET=<64-bit secret key>
```


To generate a 64-bit secret key, open Terminal and run node :

```node```

inside node prompt :

```require('crypto').randomBytes(64).toString('hex')```

use two different secrets for access and refresh tokens.



Next, open terminal and change to the root directory of the project :

```npm install```


Then run the migrations and seed the database :


```npx knex migrate:latest```

```npx knex seed:run```

Seed run might not work at once because of an unique field conflict issue. 
In that case use rollback and migrate and seed again.

```npx knex migrate:rollback --all```

```npx knex migrate:latest ```

```npx knex seed:run ```

Run the application :

```npm run dev```


##### Optional :

Under the folder `seeds`, you will find the `02_superadmins` file.

You can see/change your email and there. The default admin password is set to `admin123`.
