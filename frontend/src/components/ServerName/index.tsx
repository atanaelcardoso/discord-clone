import { useEffect, useState } from 'react';
import api from '../../Services/api'; 
import { Container, Title, ExpandIcon } from './styles';

export default function ServerName() {
  const [serverName, setServerName] = useState<string>('Carregando...');

  useEffect(() => {
    async function fetchServerName() {
      try {
        const response = await api.get('/servers');
        
        setServerName(response.data.name); 
      } catch (error) {
        console.error('Erro ao buscar dados do servidor:', error);
        setServerName('Erro ao carregar');
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
