import { Request, Response } from "express";

export default class HomeController {
  static async getTime(request: Request, response: Response) {

    const now = new Date();
    const epochSeconds = Math.round(now.getTime() / 1000);

    return response.status(200).send({serverTime: epochSeconds});
  }


  
}
