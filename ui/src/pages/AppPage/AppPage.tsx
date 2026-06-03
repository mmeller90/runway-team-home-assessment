import { useEffect, useState } from "react";

import "./AppPage.css";
import { AppsApiService } from "../../api/AppsApiService";
import type { AppDto } from "../../model/AppDto";
import AppCard from "./AppCard/AppCard";

const appsApiService = new AppsApiService();

const AppPage = () => {
  const [apps, setApps] = useState<AppDto[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await appsApiService.fetchAllApps();
      setApps(response);
    };

    fetch();
  }, []);
  return (
    <div className="apps">
      {apps.map((app) => (
        <div className="app" key={app.appId}>
          <AppCard name={app.name ?? "N/A"} id={app.appId} />
        </div>
      ))}
    </div>
  );
};

export default AppPage;
