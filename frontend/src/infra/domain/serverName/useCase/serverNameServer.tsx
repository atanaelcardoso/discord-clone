import { Container, Title, ExpandIcon } from '../../../../components/ServerName/styles';
import '../../../i18n/i18n'
import { ServerNameHooks } from '../../../../hooks/serverName/serverNameHooks';
  
export default function ServerName() {
  const {serverName}= ServerNameHooks();

  return (
    <Container>
      <Title>{serverName}</Title>
      <ExpandIcon />
    </Container>
  );
}