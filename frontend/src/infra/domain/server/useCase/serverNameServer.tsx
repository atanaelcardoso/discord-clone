import { Container, Title, ExpandIcon } from '../styles/stylesServerName';
import '../../../i18n/i18n'
import { useServerName } from '../../../../hooks/serverName/serverNameHooks';

export default function ServerName() {
  const { serverName } = useServerName();

  return (
    <Container>
      <Title>{serverName}</Title>
      <ExpandIcon />
    </Container>
  );
}