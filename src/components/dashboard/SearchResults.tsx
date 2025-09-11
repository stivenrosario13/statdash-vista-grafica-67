
import { CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { ClientProfileCard } from "./ClientProfileCard";
import { SearchResult, ClientProfile } from "./types";

interface SearchResultsProps {
  searchResults: SearchResult[];
  clientProfiles: ClientProfile[];
  onSelectResult: (result: SearchResult) => void;
  onViewClientDetails: (client: ClientProfile) => void;
  onAccountStatement: (client: ClientProfile) => void;
}

export function SearchResults({ 
  searchResults, 
  clientProfiles, 
  onSelectResult, 
  onViewClientDetails, 
  onAccountStatement 
}: SearchResultsProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'client': return 'text-blue-600';
      case 'invoice': return 'text-green-600';
      case 'payment': return 'text-purple-600';
      case 'employee': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const hasResults = searchResults.length > 0 || clientProfiles.length > 0;

  if (!hasResults) {
    return <CommandEmpty>No se encontraron resultados.</CommandEmpty>;
  }

  return (
    <>
      {/* Tarjetas de Perfiles de Clientes */}
      {clientProfiles.length > 0 && (
        <CommandGroup heading="Perfiles de Clientes">
          <div className="p-2 space-y-3">
            {clientProfiles.map((client) => (
              <ClientProfileCard
                key={client.id}
                client={client}
                onViewDetails={onViewClientDetails}
                onAccountStatement={onAccountStatement}
              />
            ))}
          </div>
        </CommandGroup>
      )}

      {/* Resultados Generales */}
      {searchResults.length > 0 && (
        <CommandGroup heading="Otros Resultados">
          {searchResults.map((result) => {
            const Icon = result.icon;
            return (
              <CommandItem
                key={result.id}
                onSelect={() => onSelectResult(result)}
                className="cursor-pointer hover:bg-gray-50"
              >
                <Icon className={`mr-2 h-4 w-4 ${getTypeColor(result.type)}`} />
                <div className="flex flex-col">
                  <span className="font-medium">{result.title}</span>
                  <span className="text-xs text-gray-500">{result.subtitle}</span>
                </div>
              </CommandItem>
            );
          })}
        </CommandGroup>
      )}
    </>
  );
}
