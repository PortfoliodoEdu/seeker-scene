import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Volume2, Maximize, SkipBack, SkipForward } from "lucide-react";
import interviewVideo from "@/assets/interview-video.jpg";

interface VideoPlayerProps {
  candidateName?: string;
  interviewDate?: string;
}

export function VideoPlayer({ candidateName = "Entrevista em Andamento", interviewDate }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("02:34");
  const [totalTime] = useState("15:42");

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Card className="h-fit shadow-medium">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Vídeo da Entrevista</CardTitle>
          <Badge className="bg-red-100 text-red-800 border-red-200">
            AO VIVO
          </Badge>
        </div>
        {candidateName && (
          <p className="text-sm text-muted-foreground">{candidateName}</p>
        )}
        {interviewDate && (
          <p className="text-xs text-muted-foreground">{interviewDate}</p>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Video Container */}
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          <img 
            src={interviewVideo} 
            alt="Interview Video"
            className="w-full h-full object-cover"
          />
          
          {/* Play Overlay */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center group hover:bg-black/30 transition-colors cursor-pointer">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-black h-16 w-16 rounded-full p-0 opacity-80 group-hover:opacity-100 transition-opacity"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8 ml-1" />
              )}
            </Button>
          </div>

          {/* Video Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="text-white text-sm">
              <div className="flex items-center justify-between">
                <span>Entrevista Técnica</span>
                <span>{currentTime} / {totalTime}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-1 mt-2">
                <div className="bg-primary h-1 rounded-full w-1/6"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={togglePlay}>
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <Button variant="outline" size="sm">
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Volume2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Interview Notes */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Notas da Entrevista</h4>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>• Candidato demonstrou boa comunicação</p>
            <p>• Experiência técnica adequada para a vaga</p>
            <p>• Disponibilidade para início imediato</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">
            Agendar 2ª Entrevista
          </Button>
          <Button className="flex-1 bg-gradient-primary hover:opacity-90">
            Aprovar Candidato
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}