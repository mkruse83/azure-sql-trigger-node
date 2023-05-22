# About

This repository demonstrates how to use the SQL Trigger for Azure Functions for javascript.

NOTE: The Azure SQL Trigger is currently in preview. Any code is subject to change.

This example is based on the Azure examples: https://github.com/Azure/azure-functions-sql-extension/blob/release/trigger/samples/samples-js/ProductsTrigger/index.js

# Setup

The setup has been taken from https://dev.to/willvelida/working-with-azure-sql-triggers-in-azure-functions-1op4

Roughly: 

1. Enable change tracking on the SQL database.
2. Create the table you want to track.
3. Enable change tracking for your table.
4. Start/Deploy function.

# Execute locally

## Prerequisites

Create local.settings.json in root folder:

```
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "<STORAGE ACCOUNT KEY HERE>",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "SqlConnectionString": "<DB CONNECTION STRING HERE>"
  }
}
```

The sql connection string can be found in the azure portal and looks like this:

```
Server=tcp:<SERVER>.database.windows.net,1433;Initial Catalog=<DATABASE>;Persist Security Info=False;User ID=<USERNAME>;Password=<PASSWORD>;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;
```

## Start

Use `func start` to start the function locally. Then modify the database entry. The output will be as follows.

The message passed to the function will contain the changed Item in the field `Item`. The Operation field will be:

- 0: Item created with new item as payload
- 1: Item changed with the updated item as payload
- 2: Item deleted with the item id as payload only


```
func start

Azure Functions Core Tools
Core Tools Version:       4.0.5174 Commit hash: N/A  (64-bit)
Function Runtime Version: 4.19.2.20636


Functions:

	SQLTrigger: sqlTrigger

For detailed output, run func with --verbose flag.
[2023-05-22T18:40:34.965Z] Worker process started and initialized.
[2023-05-22T18:40:38.561Z] Host lock lease acquired by instance ID '000000000000000000000000CAFFA7E7'.
[2023-05-22T18:40:40.735Z] Executing 'Functions.SQLTrigger' (Reason='New change detected on table 'dbo.Orders' at 2023-05-22T18:40:40.6921560Z.', Id=bb1689fc-1248-4e21-9b3b-fad505124318)
[2023-05-22T18:40:40.803Z] SQL Changes: [{"Operation":0,"Item":{"Id":1,"ProductName":"test","Price":1}}]
[2023-05-22T18:40:40.826Z] Executed 'Functions.SQLTrigger' (Succeeded, Id=bb1689fc-1248-4e21-9b3b-fad505124318, Duration=122ms)
[2023-05-22T18:41:40.194Z] Executing 'Functions.SQLTrigger' (Reason='New change detected on table 'dbo.Orders' at 2023-05-22T18:41:40.1936180Z.', Id=a72ec330-6886-42ff-9a03-59f2e77de125)
[2023-05-22T18:41:40.200Z] SQL Changes: [{"Operation":1,"Item":{"Id":1,"ProductName":"test2","Price":1}}]
[2023-05-22T18:41:40.200Z] Executed 'Functions.SQLTrigger' (Succeeded, Id=a72ec330-6886-42ff-9a03-59f2e77de125, Duration=7ms)
[2023-05-22T18:54:45.542Z] Executing 'Functions.SQLTrigger' (Reason='New change detected on table 'dbo.Orders' at 2023-05-22T18:54:45.5424570Z.', Id=1b11a417-8833-4630-a960-329d5ae3fe9f)
[2023-05-22T18:54:45.545Z] SQL Changes: [{"Operation":2,"Item":{"Id":1}}]
[2023-05-22T18:54:45.545Z] Executed 'Functions.SQLTrigger' (Succeeded, Id=1b11a417-8833-4630-a960-329d5ae3fe9f, Duration=3ms)
[2023-05-22T18:55:12.591Z] Executing 'Functions.SQLTrigger' (Reason='New change detected on table 'dbo.Orders' at 2023-05-22T18:55:12.5908880Z.', Id=dd1fb6b3-1335-4eb2-9fd4-cd20fcb2920e)
[2023-05-22T18:55:12.594Z] SQL Changes: [{"Operation":0,"Item":{"Id":2,"ProductName":"new item","Price":22}}]
[2023-05-22T18:55:12.595Z] Executed 'Functions.SQLTrigger' (Succeeded, Id=dd1fb6b3-1335-4eb2-9fd4-cd20fcb2920e, Duration=4ms)
```

