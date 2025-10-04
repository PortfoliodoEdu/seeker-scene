import { useState, useMemo } from "react";
import { CandidateFilters } from "@/components/candidate-filters";
import { CandidateCard, Candidate } from "@/components/candidate-card";
import { VideoPlayer } from "@/components/video-player";
import { mockCandidates } from "@/data/candidates";
import { useToast } from "@/hooks/use-toast";
import { Search, Users } from "lucide-react";
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
  const { toast } = useToast();

  const filteredCandidates = useMemo(() => {
    return mockCandidates.filter((candidate) => {
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
  }, [filters, searchTerm]);

  const handleViewProfile = (candidate: Candidate) => {
    toast({
      title: "Perfil do Candidato",
      description: `Visualizando perfil completo de ${candidate.name}`,
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
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-3">
            <CandidateFilters onFiltersChange={setFilters} />
          </div>

          {/* Candidates List */}
          <div className="lg:col-span-6">
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
                  Candidatos Encontrados
                </h2>
                <span className="text-sm text-muted-foreground">
                  {filteredCandidates.length} candidato{filteredCandidates.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Candidates Grid */}
              <div className="space-y-4">
                {filteredCandidates.length > 0 ? (
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

          {/* Video Player */}
          <div className="lg:col-span-3">
            <VideoPlayer 
              candidateName="Ana Silva - Entrevista Técnica"
              interviewDate="29 de Setembro, 2025 - 14:30"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
