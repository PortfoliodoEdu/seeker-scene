import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { RangeSlider } from "@/components/ui/range-slider";
import { Button } from "@/components/ui/button";
import { FilterX, Search } from "lucide-react";

interface FilterState {
  ageRange: [number, number];
  gender: string;
  hasChildren: boolean;
  childrenCount: string;
  location: string;
  hasExperience: boolean;
  interestArea: string;
}

interface CandidateFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
}

export function CandidateFilters({ onFiltersChange }: CandidateFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    ageRange: [18, 65],
    gender: "",
    hasChildren: false,
    childrenCount: "",
    location: "",
    hasExperience: false,
    interestArea: "",
  });

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const clearFilters = () => {
    const defaultFilters: FilterState = {
      ageRange: [18, 65],
      gender: "",
      hasChildren: false,
      childrenCount: "",
      location: "",
      hasExperience: false,
      interestArea: "",
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  return (
    <Card className="h-fit shadow-medium">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Filtros de Candidatos</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <FilterX className="h-4 w-4 mr-1" />
            Limpar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Idade */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Idade</Label>
          <div className="px-2">
            <RangeSlider
              value={filters.ageRange}
              onValueChange={(value) => updateFilters({ ageRange: value as [number, number] })}
              max={65}
              min={18}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{filters.ageRange[0]} anos</span>
              <span>{filters.ageRange[1]} anos</span>
            </div>
          </div>
        </div>

        {/* Gênero */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Gênero</Label>
          <Select
            value={filters.gender}
            onValueChange={(value) => updateFilters({ gender: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o gênero" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="masculino">Masculino</SelectItem>
              <SelectItem value="feminino">Feminino</SelectItem>
              <SelectItem value="nao-binario">Não-binário</SelectItem>
              <SelectItem value="prefere-nao-informar">Prefere não informar</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Filhos */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasChildren"
              checked={filters.hasChildren}
              onCheckedChange={(checked) => 
                updateFilters({ hasChildren: checked as boolean, childrenCount: checked ? filters.childrenCount : "" })
              }
            />
            <Label htmlFor="hasChildren" className="text-sm font-medium">
              Tem filhos
            </Label>
          </div>
          {filters.hasChildren && (
            <Select
              value={filters.childrenCount}
              onValueChange={(value) => updateFilters({ childrenCount: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Quantos filhos?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 filho</SelectItem>
                <SelectItem value="2">2 filhos</SelectItem>
                <SelectItem value="3">3 filhos</SelectItem>
                <SelectItem value="4+">4 ou mais filhos</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Endereço */}
        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm font-medium">
            Endereço/Localização
          </Label>
          <Input
            id="location"
            placeholder="Ex: São Paulo, SP"
            value={filters.location}
            onChange={(e) => updateFilters({ location: e.target.value })}
          />
        </div>

        {/* Experiência */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="hasExperience"
            checked={filters.hasExperience}
            onCheckedChange={(checked) => updateFilters({ hasExperience: checked as boolean })}
          />
          <Label htmlFor="hasExperience" className="text-sm font-medium">
            Tem experiência na área de interesse
          </Label>
        </div>

        {/* Área de Interesse */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Área de Interesse</Label>
          <Select
            value={filters.interestArea}
            onValueChange={(value) => updateFilters({ interestArea: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione a área" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tecnologia">Tecnologia</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="vendas">Vendas</SelectItem>
              <SelectItem value="financeiro">Financeiro</SelectItem>
              <SelectItem value="recursos-humanos">Recursos Humanos</SelectItem>
              <SelectItem value="operacoes">Operações</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="juridico">Jurídico</SelectItem>
              <SelectItem value="saude">Saúde</SelectItem>
              <SelectItem value="educacao">Educação</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
          <Search className="h-4 w-4 mr-2" />
          Aplicar Filtros
        </Button>
      </CardContent>
    </Card>
  );
}