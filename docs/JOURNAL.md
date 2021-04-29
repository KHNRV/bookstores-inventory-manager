# Journal

## 2021-04-28 / Commentaries on release 0.0.1

In this entry, I will cover some of the wins, failures, and challenges I have met while working on this project. The goal is to reflect on the past two days of working on this project.

### Designing the API and the database

While the relationship between stores and books was evident, it was not clear how to implement the inventory. At first, I thought about simply tracking the stock of every store for each book in an inventory table. 

Although, this, I realized, would probably create problems down the line. How would one keep track of changes in the inventory? Does that mean that the API is receiving the updated stock and then modifies the database? What happens if two clients send different information for the same inventory? Would one be overwritten?

That's when I changed gears and used a transactional system instead. Each stock modification is being registered as a transaction. If five books are to leave a store's inventory, the client would have to say to the server to remove five units of a specific book from this store. Hence, the stock is now a computed value generated from the transactions recorded in the database.

### Checking the inventory every 1 minute

This feature is half-implemented. Here's why. The idea was to create an inventory watcher. Every minute, the watcher would generate a new inventory for each book at each store. This not new; the inventories API is already doing that.

The inventory watcher is monitoring changes like a new book being added, deleted, or stock change. Every time a change is found, the feature would send the modification to all clients through WebSocket. The logic of the watcher is working. Although, implementing WebSocket was more complicated than I thought. It did not play nicely with Jest making my API tests unusable. Not having enough time ahead, I reverted the changes. The function is just logging the changes for now.

### Looking forward

Saying that this project still needs works is obvious. Although, I do think some things would need to be tackled rather quickly. For example, I know that my implementation of Knex with Jest needs more works. It is not ideal to un-migrate, migrates and seeds the test database before each test. It would be more efficient to drop the database and create a new one every time. 

The inventory watcher needs works as it is useless without the implementation of WebSockets. Maybe it could also become an endpoint that the client would consult every one minute. But I think the server should be able to broadcast the information without the need of the client requesting that information.

Authentication is implemented at a basic level with JSON Web Token. Even if making API calls secures, there's no way, for now, to log in and get the said token.
