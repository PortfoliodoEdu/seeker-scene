import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Briefcase, Heart, Play } from "lucide-react";

export interface Candidate {
  id: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  hasChildren: boolean;
  childrenCount: number;
  hasExperience: boolean;
  interestArea: string;
  experienceYears?: number;
  email: string;
  phone: string;
  avatar: string;
  skills: string[];
  status: "available" | "interviewing" | "hired";
}

interface CandidateCardProps {
  candidate: Candidate;
  onViewProfile: (candidate: Candidate) => void;
  onScheduleInterview: (candidate: Candidate) => void;
}

export function CandidateCard({ candidate, onViewProfile, onScheduleInterview }: CandidateCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200";
      case "interviewing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "hired":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Disponível";
      case "interviewing":
        return "Em entrevista";
      case "hired":
        return "Contratado";
      default:
        return "Indefinido";
    }
  };

  return (
    <Card className="hover:shadow-medium transition-all duration-300 border-border hover:border-primary/30">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold text-lg">
            {candidate.name.charAt(0).toUpperCase()}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-lg text-foreground">{candidate.name}</h3>
                <p className="text-muted-foreground text-sm">
                  {candidate.age} anos • {candidate.gender}
                </p>
              </div>
              <Badge className={getStatusColor(candidate.status)}>
                {getStatusText(candidate.status)}
              </Badge>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{candidate.location}</span>
              </div>
              
              {candidate.hasChildren && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Heart className="h-4 w-4" />
                  <span>{candidate.childrenCount} filho{candidate.childrenCount > 1 ? 's' : ''}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                <span>{candidate.interestArea}</span>
                {candidate.hasExperience && candidate.experienceYears && (
                  <span className="text-primary">• {candidate.experienceYears} anos de exp.</span>
                )}
              </div>
            </div>

            {candidate.skills.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {candidate.skills.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {candidate.skills.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{candidate.skills.length - 3}
                  </Badge>
                )}
              </div>
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewProfile(candidate)}
                className="flex-1"
              >
                <Users className="h-4 w-4 mr-1" />
                Ver Perfil
              </Button>
              <Button
                size="sm"
                onClick={() => onScheduleInterview(candidate)}
                className="flex-1 bg-gradient-primary hover:opacity-90"
              >
                <Play className="h-4 w-4 mr-1" />
                Entrevista
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}