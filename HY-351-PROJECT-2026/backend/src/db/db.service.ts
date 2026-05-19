import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as mysql from 'mysql2';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
    private connection: mysql.Connection;

    onModuleInit() {
        this.connection = mysql.createConnection({
            host: 'mysql',
            port: 3306,
            user: 'app_user',
            password: 'app_pass_12345',
            database: 'app_db',
        });

        this.connection.connect((err) => {
            if (err) {
                console.error('Error connecting to MySQL:', err.message);
            } else {
                console.log('Connected to MySQL.');
                //creates table if it doesn't exist -- its only for demo, you don't have to use this.
                //this.ensureEventsTable();
            }
        });
    }

    /*private ensureEventsTable() {
        const createTableSQL = `
          CREATE TABLE IF NOT EXISTS events (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            date DATE NOT NULL
          );
        `;

        this.connection.query(createTableSQL, (err) => {
            if (err) {
                console.error('Failed to create events table:', err.message);
            }  
        });
    }*/

    onModuleDestroy() {
        this.connection.end();
    }

    query(sql: string, params?: any[]): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, params, (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }
}