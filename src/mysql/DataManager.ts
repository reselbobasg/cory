import "reflect-metadata";
import {getConnection, Connection} from "typeorm";
import {createConnection} from "typeorm";
import {Person} from "./entity/Person";
import {Vendor} from "./entity/Vendor";
import {Capability} from "./entity/Capability";
import {Feature} from "./entity/Feature";
import {Rating} from "./entity/Rating";

export class DataManager {
    connection: Connection
    async connectToDb(): Promise<Connection>{
        if(!this.connection) this.connection = await createConnection();
        return this.connection
    }

    async getCapabilities(): Promise<Capability[]> {
        const conn = await this.connectToDb()
        return this.connection.manager.find(Capability)
    }

    async getCapability(id:string): Promise<any> {
        const conn = await this.connectToDb()
        const capability = conn
            .getRepository(Capability)
            .createQueryBuilder("capability")
            .where("capability.id = :id", { id: id })
            .getOne();
        return capability
    }

    close(){
        this.connection.close();
    }
}
