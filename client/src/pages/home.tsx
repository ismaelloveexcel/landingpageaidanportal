import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Gamepad2, 
  Rocket, 
  Sword, 
  Sparkles, 
  Zap, 
  ArrowRight,
  ExternalLink,
  Circle,
  Triangle,
  Square,
  Hexagon,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { App } from "@shared/schema";
import heroImage from "@assets/generated_images/epic_neon_gaming_portal.png";

const iconMap: Record<string, typeof Rocket> = {
  rocket: Rocket,
  sword: Sword,
  sparkles: Sparkles,
  zap: Zap,
  gamepad: Gamepad2,
};

const colorMap: Record<string, string> = {
  purple: "from-violet-500 to-purple-600",
  cyan: "from-cyan-400 to-blue-500",
  green: "from-emerald-400 to-green-500",
  orange: "from-orange-400 to-amber-500",
  blue: "from-blue-400 to-indigo-500",
};

const glowMap: Record<string, string> = {
  purple: "shadow-violet-500/50",
  cyan: "shadow-cyan-400/50",
  green: "shadow-emerald-400/50",
  orange: "shadow-orange-400/50",
  blue: "shadow-blue-400/50",
};

interface FloatingShape {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  shape: "circle" | "triangle" | "square" | "hexagon" | "star";
  color: string;
}

function BackgroundEffects() {
  const [shapes, setShapes] = useState<FloatingShape[]>([]);
  
  useEffect(() => {
    const shapeTypes: FloatingShape["shape"][] = ["circle", "triangle", "square", "hexagon", "star"];
    const colors = [
      "text-violet-400",
      "text-cyan-400", 
      "text-emerald-400",
      "text-blue-400",
      "text-purple-400",
      "text-indigo-400",
    ];
    
    const newShapes: FloatingShape[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 8,
      size: 16 + Math.random() * 32,
      shape: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setShapes(newShapes);
  }, []);
  
  const ShapeIcon = ({ shape, className, size }: { shape: FloatingShape["shape"]; className: string; size: number }) => {
    const style = { width: size, height: size };
    switch (shape) {
      case "circle": return <Circle className={className} style={style} />;
      case "triangle": return <Triangle className={className} style={style} />;
      case "square": return <Square className={className} style={style} />;
      case "hexagon": return <Hexagon className={className} style={style} />;
      case "star": return <Star className={className} style={style} />;
    }
  };
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute ${shape.color}`}
          style={{ 
            left: `${shape.x}%`,
            bottom: "-10%",
          }}
          animate={{
            y: [0, -window.innerHeight * 1.3],
            rotate: [0, 360],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <ShapeIcon 
            shape={shape.shape} 
            className="drop-shadow-lg"
            size={shape.size}
          />
        </motion.div>
      ))}
      
      <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 via-transparent to-cyan-900/20" />
      
      <motion.div 
        className="absolute top-20 left-10 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
      />
    </div>
  );
}

function PortalAnimation({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-64 h-64"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, ease: "linear" }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400 animate-pulse" />
        <div className="absolute inset-4 rounded-full bg-background" />
        <div className="absolute inset-8 rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-purple-500 animate-pulse" />
        <div className="absolute inset-12 rounded-full bg-background flex items-center justify-center">
          <motion.span 
            className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            LOADING...
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function HeroSection({ onExplore }: { onExplore: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Gaming Portal"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight"
            style={{
              textShadow: `
                0 0 20px hsl(var(--primary) / 0.5),
                0 0 40px hsl(var(--primary) / 0.3),
                0 4px 0 hsl(var(--primary) / 0.4),
                0 8px 20px rgba(0,0,0,0.5)
              `,
            }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              Aidan's
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              App Portal
            </span>
          </h1>
        </motion.div>
        
        <motion.p
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
          }}
        >
          Your personal collection of awesome apps built just for you!
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button
            size="lg"
            onClick={onExplore}
            className="text-lg px-8 py-6 bg-gradient-to-r from-violet-500 to-cyan-500 border-none shadow-lg shadow-violet-500/30"
            data-testid="button-explore-apps"
          >
            <Gamepad2 className="w-6 h-6 mr-2" />
            Explore Apps
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
        
        <motion.div
          className="flex justify-center gap-4 pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {["circle", "triangle", "square"].map((shape, i) => (
            <motion.div
              key={shape}
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ 
                duration: 2, 
                delay: i * 0.2, 
                repeat: Infinity,
              }}
              className="text-violet-400/60"
            >
              {shape === "circle" && <Circle className="w-8 h-8" />}
              {shape === "triangle" && <Triangle className="w-8 h-8" />}
              {shape === "square" && <Square className="w-8 h-8" />}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function AppCard({ app, index }: { app: App; index: number }) {
  const Icon = iconMap[app.iconName] || Gamepad2;
  const gradientClass = colorMap[app.colorClass] || colorMap.purple;
  const glowClass = glowMap[app.colorClass] || glowMap.purple;
  const isActive = app.status === "active";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card 
        className={`group relative overflow-visible border-2 border-border/50 transition-all duration-300 ${
          isActive ? `hover:shadow-xl ${glowClass}` : "opacity-70"
        }`}
        data-testid={`card-app-${app.id}`}
      >
        <CardContent className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${gradientClass} shadow-lg`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <Badge 
              variant={isActive ? "default" : "secondary"}
              className={isActive ? "bg-emerald-500 text-white" : ""}
            >
              {app.status}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-bold">{app.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {app.description}
            </p>
          </div>
          
          {isActive ? (
            <Button 
              className="w-full"
              onClick={() => window.open(app.url, "_blank")}
              data-testid={`button-launch-${app.id}`}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Launch App
            </Button>
          ) : (
            <Button 
              className="w-full" 
              variant="secondary"
              disabled
            >
              Coming Soon
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function AppsSection({ onBack }: { onBack: () => void }) {
  const { data: apps, isLoading } = useQuery<App[]>({
    queryKey: ["/api/apps"],
  });
  
  return (
    <section className="min-h-screen px-4 py-12 relative z-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between flex-wrap gap-4"
        >
          <div>
            <h2 
              className="text-3xl md:text-4xl uppercase font-normal"
              style={{
                textShadow: "0 0 20px hsl(var(--primary) / 0.3)",
              }}
            >Welcome doodle-tastic dusty</h2>
            <p className="text-muted-foreground mt-1">
              Choose an app to launch
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={onBack}
            data-testid="button-back-home"
          >
            Back to Home
          </Button>
        </motion.div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-14 h-14 rounded-xl bg-muted" />
                    <div className="w-16 h-6 rounded-full bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <div className="w-32 h-6 rounded bg-muted" />
                    <div className="w-full h-10 rounded bg-muted" />
                  </div>
                  <div className="w-full h-10 rounded bg-muted" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps?.map((app, index) => (
              <AppCard key={app.id} app={app} index={index} />
            ))}
          </div>
        )}
        
        {!isLoading && (!apps || apps.length === 0) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Gamepad2 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-bold mb-2">No Apps Yet</h3>
            <p className="text-muted-foreground">
              Apps will appear here once they're added!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default function Home() {
  const [showApps, setShowApps] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  
  const handleExplore = () => {
    setShowPortal(true);
  };
  
  const handlePortalComplete = () => {
    setShowPortal(false);
    setShowApps(true);
  };
  
  const handleBack = () => {
    setShowApps(false);
  };
  
  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundEffects />
      
      <AnimatePresence>
        {showPortal && (
          <PortalAnimation onComplete={handlePortalComplete} />
        )}
      </AnimatePresence>
      
      <AnimatePresence mode="wait">
        {!showApps ? (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <HeroSection onExplore={handleExplore} />
          </motion.div>
        ) : (
          <motion.div
            key="apps"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AppsSection onBack={handleBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
