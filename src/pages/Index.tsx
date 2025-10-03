import { useState, useMemo, useEffect } from "react";
import { CandidateFilters } from "@/components/candidate-filters";
import { CandidateCard, Candidate } from "@/components/candidate-card";
import { VideoPlayer } from "@/components/video-player";
import { useToast } from "@/hooks/use-toast";
import { Search, Users, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FilterState {
  ageRange: [number, number];
  gender: string;
  hasChildren: boolean;
  childrenCount: string;
  location: string;
  hasExperience: boolean;
  interestArea: string;
}

interface ApiCandidate {
  row_number: number;
  "Nome Completo": string;
  "Idade": number;
  "Gênero": string;
  "Tem filhos": string;
  "Endereço": string;
  "Experiência na área": string;
  "Área de Interesse": string;
  "Link Currículo": string;
  "Link Vídeo": string;
}

const Index = () => {
  const [filters, setFilters] = useState<FilterState>({
    ageRange: [18, 65],
    gender: "",
    hasChildren: false,
    childrenCount: "",
    location: "",
    hasExperience: false,
    interestArea: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://integradorwebhook.sanjaworks.com/webhook/produtor-candidatos-site");
        const data: ApiCandidate[] = await response.json();
        
        const mappedCandidates: Candidate[] = data.map((item) => ({
          id: item.row_number.toString(),
          name: item["Nome Completo"],
          age: item["Idade"],
          gender: item["Gênero"].toLowerCase() === "masculino" ? "male" : "female",
          location: item["Endereço"],
          status: "new" as const,
          hasChildren: item["Tem filhos"].toLowerCase() === "sim",
          childrenCount: 0,
          hasExperience: item["Experiência na área"].toLowerCase() === "sim",
          interestArea: item["Área de Interesse"],
          videoUrl: item["Link Vídeo"],
          resumeUrl: item["Link Currículo"],
        }));
        
        setCandidates(mappedCandidates);
      } catch (error) {
        console.error("Erro ao carregar candidatos:", error);
        toast({
          title: "Erro ao carregar candidatos",
          description: "Não foi possível carregar os dados. Tente novamente.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidates();
  }, [toast]);

  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      // Age filter
      if (candidate.age < filters.ageRange[0] || candidate.age > filters.ageRange[1]) {
        return false;
      }

      // Gender filter
      if (filters.gender && candidate.gender !== filters.gender) {
        return false;
      }

      // Children filter
      if (filters.hasChildren && !candidate.hasChildren) {
        return false;
      }

      // Children count filter
      if (filters.childrenCount && candidate.hasChildren) {
        const expectedCount = filters.childrenCount === "4+" ? 4 : parseInt(filters.childrenCount);
        if (filters.childrenCount === "4+" && candidate.childrenCount < 4) {
          return false;
        } else if (filters.childrenCount !== "4+" && candidate.childrenCount !== expectedCount) {
          return false;
        }
      }

      // Location filter
      if (filters.location && !candidate.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      // Experience filter
      if (filters.hasExperience && !candidate.hasExperience) {
        return false;
      }

      // Interest area filter
      if (filters.interestArea && candidate.interestArea !== filters.interestArea) {
        return false;
      }

      // Search term filter
      if (searchTerm && !candidate.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [filters, searchTerm, candidates]);

  const handleViewProfile = (candidate: Candidate) => {
    toast({
      title: "Currículo Completo",
      description: `Visualizando currículo detalhado de ${candidate.name} com todas as informações e habilidades`,
    });
  };

  const handleScheduleInterview = (candidate: Candidate) => {
    toast({
      title: "Entrevista Agendada",
      description: `Entrevista com ${candidate.name} foi agendada com sucesso!`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Portal de Candidatos
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <CandidateFilters onFiltersChange={setFilters} />
          </div>

          {/* Candidates List - Now takes more space */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar candidatos por nome..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Results Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">
                  Candidatos com Vídeos
                </h2>
                <span className="text-sm text-muted-foreground">
                  {filteredCandidates.length} candidato{filteredCandidates.length !== 1 ? 's' : ''} • Cada um com vídeo integrado
                </span>
              </div>

              {/* Candidates Grid */}
              <div className="space-y-6">
                {isLoading ? (
                  <div className="text-center py-12">
                    <Loader2 className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
                    <p className="text-muted-foreground">
                      Carregando candidatos...
                    </p>
                  </div>
                ) : filteredCandidates.length > 0 ? (
                  filteredCandidates.map((candidate) => (
                    <CandidateCard
                      key={candidate.id}
                      candidate={candidate}
                      onViewProfile={handleViewProfile}
                      onScheduleInterview={handleScheduleInterview}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Nenhum candidato encontrado com os filtros selecionados
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
