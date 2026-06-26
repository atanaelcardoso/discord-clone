import { useEffect, useState } from 'react';
import api from '../../../../Services/api'; 
import { Container, Title, ExpandIcon } from '../../../../components/ServerName/styles';

import '../../../i18n/i18n'
import { useTranslation } from 'react-i18next';
  
export default function ServerName() {
  const { t } = useTranslation();
  const [serverName, setServerName] = useState<string>('Loading...');

  useEffect(() => {
    async function fetchServerName() {
      try {
        const response = await api.get('/servers');
        
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

  return (
    <Container>
      <Title>{serverName}</Title>
      <ExpandIcon />
    </Container>
  );
}