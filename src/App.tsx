import { PortalLeads } from './components/PortalLeads/PortalLeads';
import { WhatsAppFloating } from './components/PortalLeads/WhatsAppFloating';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <PortalLeads />
      <WhatsAppFloating />
    </div>
  );
}

export default App;
