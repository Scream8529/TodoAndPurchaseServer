// import { createClient } from "redis";

// class RedisService {
//   private client = createClient({
//     url: `redis://seeneradmin:AS8sasd2SDcx@localhost:6379`,
//     // seeneradmin AS8sasd2SDcx54
//   });
//   private connected: boolean = false;
//   constructor() {
//     this.init();
//   }

//   async init() {
//     this.client.on("error", (err) => console.log("Redis Client Error", err));
//     try {
//       await this.client.connect();
//       this.connected = true;
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   public async disconect() {
//     await this.client.disconnect();
//     this.connected = false;
//   }
//   public async getRedisItem(id: string) {
//     if (this.connected) {
//       try {
//         const value = await this.client.get(id);
//         return value;
//       } catch (error) {
//         console.log(error);
//       }
//     } else console.log("Redis Not connected");
//   }
//   public async setRedisItem(id: string, token: string) {
//     if (this.connected) {
//       try {
//         const value = await this.client.set(id, token);
//         return value;
//       } catch (error) {
//         console.log(error);
//       }
//     } else console.log("Redis Not connected");
//   }
//   public async removeRedisItem(id: string) {
//     this.client.del(id);
//   }
//   public async clearRedisDb() {
//     this.client.flushAll();
//   }
// }
// export const redisService = new RedisService();
