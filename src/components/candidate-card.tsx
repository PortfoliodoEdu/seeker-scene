import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Briefcase, Heart, Play, Pause, Volume2 } from "lucide-react";
import interviewVideo from "@/assets/interview-video.jpg";

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
  status: "new" | "interviewing" | "hired";
}

interface CandidateCardProps {
  candidate: Candidate;
  onViewProfile: (candidate: Candidate) => void;
  onScheduleInterview: (candidate: Candidate) => void;
}

export function CandidateCard({ candidate, onViewProfile, onScheduleInterview }: CandidateCardProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  const toggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case "interviewing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "hired":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "interviewing":
        return "Em entrevista";
      case "hired":
        return "Contratado";
      default:
        return "Novo";
    }
  };

  return (
    <Card className="hover:shadow-medium transition-all duration-300 border-border hover:border-primary/30">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left Side - Candidate Info */}
          <div className="flex-1 min-w-0">
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
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Briefcase className="h-4 w-4" />
                    <span>{candidate.interestArea}</span>
                    {candidate.hasExperience && (
                      <span className="text-primary">• Com experiência</span>
                    )}
                  </div>
                  
                  {candidate.hasChildren && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Heart className="h-4 w-4" />
                      <span>Tem {candidate.childrenCount} filho{candidate.childrenCount > 1 ? 's' : ''}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewProfile(candidate)}
                    className="flex-1"
                  >
                    <Users className="h-4 w-4 mr-1" />
                    Ver Currículo
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onScheduleInterview(candidate)}
                    className="flex-1 bg-gradient-primary hover:opacity-90"
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Agendar
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Mini Video Player */}
          <div className="lg:w-80 w-full">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-medium">
              <img 
                src={interviewVideo} 
                alt={`Vídeo de entrevista - ${candidate.name}`}
                className="w-full h-full object-cover"
              />
              
              {/* Video Overlay Controls */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center group hover:bg-black/30 transition-colors">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white/90 hover:bg-white text-black h-12 w-12 rounded-full p-0 opacity-80 group-hover:opacity-100 transition-opacity"
                  onClick={toggleVideo}
                >
                  {isVideoPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6 ml-0.5" />
                  )}
                </Button>
              </div>

              {/* Video Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <div className="text-white text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">Entrevista - {candidate.name}</span>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-white hover:bg-white/20"
                      >
                        <Volume2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-1">
                    <div className="bg-primary h-1 rounded-full w-1/4"></div>
                  </div>
                </div>
              </div>

              {/* Status Badge on Video */}
              {isVideoPlaying && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-red-500/90 text-white border-0">
                    AO VIVO
                  </Badge>
                </div>
              )}
            </div>

            {/* Video Actions */}
            <div className="mt-3 space-y-2">
              <div className="text-xs text-muted-foreground">
                <p>• Comunicação clara e objetiva</p>
                <p>• Experiência técnica relevante</p>
                <p>• Disponibilidade para início</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}