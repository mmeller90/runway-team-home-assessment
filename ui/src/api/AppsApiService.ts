import type { AppDto } from "../model/AppDto";
import { BaseApiService } from "./BaseApiService";

export class AppsApiService extends BaseApiService {
  async fetchAllApps(): Promise<AppDto[]> {
    const response = await fetch(`${this.baseUrl}/apps`);
    return (await response.json()).apps;
  }
}
