import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { suggestionservice } from "../../infra/domain/server/serverServer";
import type { ServerData } from "../../infra/domain/server/entity/server";

const service = new suggestionservice();

export  function ServerNameHooks() {
  const { t } = useTranslation();
  const [serverName, setServerName] = useState<string>('Loading...');

  useEffect(() => {
    async function fetchServerName() {
      try {
        //const response = await api.get('/servers');
        const response = await service.getAll()  as { data: ServerData | ServerData[] };;
        if (Array.isArray(response.data)) {
        setServerName(response.data[0]?.name || t('Servidor Central'));
      } else {
        setServerName(response.data?.name || t('Servidor Central'));
      }
      } catch (error) {
        console.error('API request error:', error);
        setServerName(t('Servidor Offline')); 
      }
    }

    fetchServerName();
  }, []);

  return {serverName};
}