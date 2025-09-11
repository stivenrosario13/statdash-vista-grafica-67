
import { useState, useEffect } from "react";
import { Command, CommandDialog, CommandInput, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SearchResults } from "./SearchResults";
import { ClientDetailsModal } from "./ClientDetailsModal";
import { mockSearchData, getMockClientProfiles } from "./mockData";
import { SearchResult, ClientProfile } from "./types";
import { useRealtimeUpdates } from '@/hooks/useRealtimeUpdates';

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [clientProfiles, setClientProfiles] = useState<ClientProfile[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientProfile | null>(null);
  const [showClientDetails, setShowClientDetails] = useState(false);
  const navigate = useNavigate();
  const { lastUpdate } = useRealtimeUpdates();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Cargar datos iniciales y actualizarlos cuando hay cambios
  useEffect(() => {
    console.log('GlobalSearch: Loading data, lastUpdate:', lastUpdate);
    loadData();
  }, [lastUpdate]);

  const loadData = () => {
    console.log('GlobalSearch: Loading all client profiles...');
    const allClients = getMockClientProfiles();
    console.log('GlobalSearch: Loaded clients:', allClients.length);
    
    setClientProfiles(allClients);
    setSearchResults(mockSearchData);
    
    // Si hay una búsqueda activa, filtrar
    if (searchQuery && searchQuery.length >= 1) {
      handleSearch(searchQuery);
    }
  };

  const handleSearch = (value: string) => {
    console.log('GlobalSearch: Searching for:', value);
    setSearchQuery(value);
    
    const allClients = getMockClientProfiles();
    
    if (!value || value.length < 1) {
      // Mostrar todos los clientes si no hay búsqueda
      setSearchResults(mockSearchData);
      setClientProfiles(allClients);
      console.log('GlobalSearch: Showing all clients:', allClients.length);
      return;
    }

    // Filtrar resultados generales
    const filtered = mockSearchData.filter(item =>
      item.title.toLowerCase().includes(value.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(value.toLowerCase())
    );

    // Filtrar clientes
    const filteredClients = allClients.filter(client =>
      client.name.toLowerCase().includes(value.toLowerCase()) ||
      client.email.toLowerCase().includes(value.toLowerCase()) ||
      client.clientId.toLowerCase().includes(value.toLowerCase()) ||
      client.phone.includes(value)
    );

    setSearchResults(filtered);
    setClientProfiles(filteredClients);
    console.log('GlobalSearch: Filtered results:', filtered.length, 'clients:', filteredClients.length);
  };

  const handleSelect = (result: SearchResult) => {
    navigate(result.route);
    setOpen(false);
  };

  const handleClientDetails = (client: ClientProfile) => {
    setSelectedClient(client);
    setShowClientDetails(true);
  };

  const handleAccountStatement = (client: ClientProfile) => {
    navigate(`/clients?tab=accounts&clientId=${client.id}`);
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative w-64 justify-start text-sm text-muted-foreground hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        Buscar clientes, facturas, pagos...
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Buscar clientes, facturas, pagos..." 
          onValueChange={handleSearch}
          value={searchQuery}
        />
        <CommandList className="max-h-[70vh]">
          <SearchResults
            searchResults={searchResults}
            clientProfiles={clientProfiles}
            onSelectResult={handleSelect}
            onViewClientDetails={handleClientDetails}
            onAccountStatement={handleAccountStatement}
          />
        </CommandList>
      </CommandDialog>

      <ClientDetailsModal
        client={selectedClient}
        isOpen={showClientDetails}
        onClose={() => setShowClientDetails(false)}
        onAccountStatement={handleAccountStatement}
      />
    </>
  );
}
