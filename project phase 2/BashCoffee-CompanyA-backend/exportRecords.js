//install first --> 1.npm install json2csv mongodb
// 2.npm install csv-writer

const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path'); // Import the 'path' module
const express = require("express");
const cors = require("cors");
const { Timestamp } = require("mongodb");

const app = express();
const port = 3030;
app.use(express.json());
app.use(cors());
const csvWriter = require('csv-writer').createObjectCsvWriter;

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

const dbName = 'BashCoffeeDB';
const collectionName = 'record';

async function exportRecordsToCSV() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        // Fetch records from the collection
        const records = await collection.find({}).toArray();

        if (records.length === 0) {
            console.log('No records found in the database.');
            return;
        }

        // Transform records to ensure proper handling of nested fields
        const transformedRecords = records.map(record => {
            return {
                ...record,
                Menu: record.Menu.map(item => {
                    // Check if it's a beverage or a bakery item
                    if (item.Drink_Name) {
                        // Handle beverage items
                        return `${item.Drink_Name} (${item.Drink_Type} - ${item.Price} Baht, ${item.Add_On || 'None'})`;
                    } else if (item.Bakery_Name) {
                        // Handle bakery items
                        return `${item.Bakery_Name} (${item.Price} Baht, ${item.Add_On || 'None'})`;
                    } else {
                        // Default case if the item does not fit either
                        return 'Unknown Item';
                    }
                }).join('; '), // Join menu items into a single string
                date: new Date(record.date).toLocaleString(), // Format the date to be readable
            };
        });

        // Prepare CSV writer
        const csvFilePath = path.join(__dirname, 'records.csv'); // Use 'path' here
        const writer = csvWriter({
            path: csvFilePath,
            header: [
                { id: '_id', title: 'ID' },
                { id: 'Customer', title: 'Customer' },
                { id: 'Tel', title: 'Telephone' },
                { id: 'Menu', title: 'Menu' },
                { id: 'promotion', title: 'Promotion' },
                { id: 'totalPrice', title: 'Total Price' },
                { id: 'date', title: 'Date' },
            ],
        });

        // Write records to CSV
        await writer.writeRecords(transformedRecords);
        console.log(`Records successfully exported to ${csvFilePath}`);
    } catch (error) {
        console.error('Error exporting records:', error);
    } finally {
        await client.close();
    }
}

exportRecordsToCSV();


//
//async function exportRecordsToCSV() {
//    const client = new MongoClient(uri);
//
//    try {
//        await client.connect();
//        const database = client.db(dbName);
//        const collection = database.collection(collectionName);
//
//        // Fetch records from the collection
//        const records = await collection.find({}).toArray();
//
//        if (records.length === 0) {
//            console.log('No records found in the database.');
//            return;
//        }
//
//        // Prepare CSV writer
//        const csvFilePath = path.join(__dirname, 'records.csv'); // Use 'path' here
//        const writer = csvWriter({
//            path: csvFilePath,
//            header: [
//                { id: '_id', title: 'ID' },
//                { id: 'Customer', title: 'Customer' },
//                { id: 'Tel', title: 'Telephone' },
//                { id: 'Menu', title: 'Menu' },
//                { id: 'promotion', title: 'Promotion' },
//                { id: 'totalPrice', title: 'Total Price' },
//                { id: 'date', title: 'Date' },
//            ],
//        });
//
//        // Write records to CSV
//        await writer.writeRecords(records);
//        console.log(`Records successfully exported to ${csvFilePath}`);
//    } catch (error) {
//        console.error('Error exporting records:', error);
//    } finally {
//        await client.close();
//    }
//}
//
//exportRecordsToCSV();
