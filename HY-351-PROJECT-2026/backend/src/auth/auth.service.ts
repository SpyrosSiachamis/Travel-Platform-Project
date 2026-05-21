import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/db/db.service";
import { AuthUser, user } from "./auth.model";
@Injectable()
export class AuthService {
    constructor(private readonly db: DatabaseService) { }
    // Authenticates user and returns id, role etc.
    async authenticateUser(user: user) {
        try {
            const queryText = `
            SELECT u.user_id, u.username,
                CASE
                    WHEN
                        e.user_id IS NOT NULL THEN
                        'excursionist'
                    WHEN
                        tc.user_id IS NOT NULL THEN
                        'trip_creator'
                    ELSE
                        'guest'
                    END AS role
        FROM users u
        LEFT JOIN excursionists e ON u.user_id = e.user_id
        LEFT JOIN trip_creators tc ON u.user_id = tc.user_id
        WHERE u.username = ? AND u.password = ?
    `;
            const results = await this.db.query(queryText, [user.username, user.password]);
            if (results.length === 0) {
                return null;
            }
            const returnedUser: AuthUser = results[0];
            const authUser: AuthUser = {
                user_id: returnedUser.user_id,
                username: returnedUser.username,
                role: returnedUser.role
            };
            return authUser;
        }
        catch (error) {
                console.error('DB connection error:',error);
                throw error;
        }
    }

    async logoutUser(session: Record<string,any>){
        await new Promise<void>((resolve,reject) =>{
            session.destroy((err) =>{
                if(err) {
                    return reject(err);
                }
                resolve();
            });
        });
        return {
            success: true,
            message: "User logged out"
        };
    }
}