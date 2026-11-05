import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ServerData } from "../../infra/domain/server/entity/server";
import { apiServices } from "../../infra/domain/apiServices";

const { serverService } = apiServices();

export function useServerName() {
  const { t } = useTranslation();
  const [serverName, setServerName] = useState<string>('Loading...');

  useEffect(() => {
    async function fetchServerName() {
      try {
        const data: ServerData[] = await serverService.getAll();
        setServerName(data[0]?.name || t('Servidor Central'));
      } catch (error) {
        console.error('API request error:', error);
        setServerName(t('Servidor Offline'));
      }
    }

    fetchServerName();
  }, [t]);

  return { serverName };
}
