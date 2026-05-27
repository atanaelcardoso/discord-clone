import { useEffect, useState } from 'react';
import api from '../../Services/api'; 
import { Container, Title, ExpandIcon } from './styles';

export default function ServerName() {
  const [serverName, setServerName] = useState<string>('Carregando...');

  useEffect(() => {
    async function fetchServerName() {
      try {
        const response = await api.get('/servers');
        
        if (Array.isArray(response.data)) {
          setServerName(response.data[0]?.name || 'Servidor Central');
        } else {
          setServerName(response.data?.name || 'Servidor Central');
        }
      } catch (error) {
        console.error('Erro na requisição da API:', error);
        setServerName('Servidor Offline'); 
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