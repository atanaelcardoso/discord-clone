import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { serverRepository } from "../../infra/api/serverRepository";
import { apiServerRepository } from "../../infra/domain/server/useCase/serverServer";

const defaultRepositoy = new apiServerRepository();

export  function ServerNameHooks(repository: serverRepository = defaultRepositoy) {
  const { t } = useTranslation();
  const [serverName, setServerName] = useState<string>('Loading...');

  useEffect(() => {
    async function fetchServerName() {
      try {
        //const response = await api.get('/servers');
        const data = await repository.getServer() as { name?: string } | { name?: string }[];
        if (Array.isArray(data)) {
        setServerName(data[0]?.name || t('Servidor Central'));
      } else {
        setServerName(data?.name || t('Servidor Central'));
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