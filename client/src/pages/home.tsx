import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Gamepad2, 
  Rocket, 
  Sword, 
  Sparkles, 
  Zap, 
  ArrowRight,
  ArrowUp,
  ExternalLink,
  Circle,
  Triangle,
  Square,
  Hexagon,
  Star,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { App } from "@shared/schema";
import heroImage from "@assets/generated_images/epic_neon_gaming_portal.png";
import { DemogorgonScene } from "@/components/Model3D";

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

const borderColorMap: Record<string, string> = {
  purple: "border-violet-500/60",
  cyan: "border-cyan-400/60",
  green: "border-emerald-400/60",
  orange: "border-orange-400/60",
  blue: "border-blue-400/60",
};

const hoverGlowMap: Record<string, string> = {
  purple: "hover:shadow-violet-500/40 hover:shadow-2xl",
  cyan: "hover:shadow-cyan-400/40 hover:shadow-2xl",
  green: "hover:shadow-emerald-400/40 hover:shadow-2xl",
  orange: "hover:shadow-orange-400/40 hover:shadow-2xl",
  blue: "hover:shadow-blue-400/40 hover:shadow-2xl",
};

const colorShadowMap: Record<string, string> = {
  purple: "rgba(139, 92, 246, 0.4)",
  cyan: "rgba(34, 211, 238, 0.4)",
  green: "rgba(52, 211, 153, 0.4)",
  orange: "rgba(251, 146, 60, 0.4)",
  blue: "rgba(96, 165, 250, 0.4)",
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
  
  // Stranger Things style ember particles
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 6,
    size: 2 + Math.random() * 4,
  }));
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Stranger Things / Squid Game "001" background text */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <motion.span 
          className="text-[25rem] md:text-[35rem] lg:text-[45rem] font-black text-red-500/10 select-none"
          style={{ fontFamily: "monospace", textShadow: "0 0 100px rgba(239, 68, 68, 0.3)" }}
          animate={{ opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          001
        </motion.span>
      </div>
      
      {/* Floating geometric shapes */}
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
      
      {/* Stranger Things ember/ash particles */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute rounded-full"
          style={{ 
            left: `${particle.x}%`,
            bottom: "-5%",
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, rgba(239, 68, 68, 0.9) 0%, rgba(220, 38, 38, 0.6) 50%, transparent 100%)`,
            boxShadow: `0 0 ${particle.size * 2}px rgba(239, 68, 68, 0.8), 0 0 ${particle.size * 4}px rgba(220, 38, 38, 0.4)`,
          }}
          animate={{
            y: [0, -window.innerHeight * 1.2],
            x: [0, (Math.random() - 0.5) * 100],
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 0.8, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
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

function HeroSection({ onExplore, onAdminClick }: { onExplore: () => void; onAdminClick: () => void }) {
  return (
    <section className="relative h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Enhanced background with better overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Gaming Portal"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
        {/* Additional radial glow effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />
      </div>
      
      
      
      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Stranger Things style title - sharp and crisp */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-widest">
            <motion.span 
              className="block text-red-500"
              style={{ 
                fontFamily: "'Times New Roman', serif",
                letterSpacing: "0.15em",
                textShadow: "0 0 8px rgba(239, 68, 68, 0.9), 0 0 20px rgba(239, 68, 68, 0.5)"
              }}
              animate={{ 
                opacity: [1, 0.9, 1],
                textShadow: [
                  "0 0 8px rgba(239, 68, 68, 0.9), 0 0 20px rgba(239, 68, 68, 0.5)",
                  "0 0 12px rgba(239, 68, 68, 1), 0 0 30px rgba(239, 68, 68, 0.6)",
                  "0 0 8px rgba(239, 68, 68, 0.9), 0 0 20px rgba(239, 68, 68, 0.5)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Aidan's
            </motion.span>
            <motion.span 
              className="block text-red-500"
              style={{ 
                fontFamily: "'Times New Roman', serif",
                letterSpacing: "0.15em",
                textShadow: "0 0 8px rgba(239, 68, 68, 0.9), 0 0 20px rgba(239, 68, 68, 0.5)"
              }}
              animate={{ 
                opacity: [1, 0.9, 1],
                textShadow: [
                  "0 0 8px rgba(239, 68, 68, 0.9), 0 0 20px rgba(239, 68, 68, 0.5)",
                  "0 0 12px rgba(239, 68, 68, 1), 0 0 30px rgba(239, 68, 68, 0.6)",
                  "0 0 8px rgba(239, 68, 68, 0.9), 0 0 20px rgba(239, 68, 68, 0.5)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            >
              App Portal
            </motion.span>
          </h1>
        </motion.div>
        
        <motion.p
          className="text-sm sm:text-base md:text-lg text-foreground/80 max-w-2xl mx-auto font-normal mt-4 md:mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
          }}
        >A collection of awesome apps built just for you</motion.p>
        
        <motion.div
          className="mt-6 md:mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Stranger Things themed button */}
          <motion.div
            animate={{ 
              boxShadow: [
                "0 0 20px rgba(239, 68, 68, 0.4), 0 0 40px rgba(239, 68, 68, 0.2)",
                "0 0 30px rgba(239, 68, 68, 0.6), 0 0 60px rgba(239, 68, 68, 0.3)",
                "0 0 20px rgba(239, 68, 68, 0.4), 0 0 40px rgba(239, 68, 68, 0.2)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-xl"
          >
            <Button
              size="lg"
              onClick={onExplore}
              className="text-sm sm:text-base px-8 py-5 rounded-xl bg-red-600 hover:bg-red-700 border-2 border-red-500 hover:scale-105 transition-transform duration-300 font-bold uppercase tracking-widest"
              style={{
                fontFamily: "'Times New Roman', serif",
                textShadow: "0 0 10px rgba(239, 68, 68, 0.8)",
              }}
              data-testid="button-explore-apps"
            >
              <Gamepad2 className="w-6 h-6 mr-2" />
              Explore Apps
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
        
        {/* 3D Demogorgon Model - Clickable Easter Egg to Admin */}
        <motion.div
          className="flex justify-center relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Glow effect behind Demogorgon */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full blur-lg" 
              style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, rgba(147, 51, 234, 0.3) 40%, transparent 70%)" }}
            />
          </motion.div>
          <motion.div 
            className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-80 lg:h-80 cursor-pointer overflow-visible relative z-10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={onAdminClick}
          >
            <DemogorgonScene />
          </motion.div>
        </motion.div>
        
      </div>
    </section>
  );
}

function AppCard({ app, index }: { app: App; index: number }) {
  const Icon = iconMap[app.iconName] || Gamepad2;
  const gradientClass = colorMap[app.colorClass] || colorMap.purple;
  const glowClass = glowMap[app.colorClass] || glowMap.purple;
  const borderClass = borderColorMap[app.colorClass] || borderColorMap.purple;
  const hoverGlow = hoverGlowMap[app.colorClass] || hoverGlowMap.purple;
  const isActive = app.status === "active";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={isActive ? { scale: 1.03, y: -5 } : {}}
    >
      <Card 
        className={`group relative overflow-visible border-4 ${borderClass} rounded-2xl transition-all duration-300 ${
          isActive 
            ? `hover:shadow-xl ${hoverGlow} cursor-pointer bg-card/80 backdrop-blur-sm` 
            : "opacity-60 bg-card/50"
        }`}
        data-testid={`card-app-${app.id}`}
      >
        {/* Gradient border glow effect for active cards */}
        {isActive && (
          <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500/20 via-cyan-500/20 to-emerald-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
        )}
        
        <CardContent className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            {/* Enhanced icon with glow effect */}
            <motion.div 
              className={`p-4 rounded-2xl bg-gradient-to-br ${gradientClass} shadow-lg`}
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.3 }}
              style={{ boxShadow: isActive ? `0 8px 25px ${colorShadowMap[app.colorClass] || colorShadowMap.purple}` : undefined }}
            >
              <Icon className="w-8 h-8 text-white drop-shadow-md" />
            </motion.div>
            <Badge 
              variant={isActive ? "default" : "secondary"}
              className={isActive 
                ? "bg-gradient-to-r from-emerald-400 to-green-500 text-white font-bold uppercase text-xs px-3 py-1 shadow-lg shadow-emerald-500/30" 
                : "uppercase text-xs"
              }
            >
              {app.status === "active" ? "Active" : "Coming Soon"}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-bold tracking-tight">{app.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {app.description}
            </p>
          </div>
          
          {isActive ? (
            <Button 
              className="w-full rounded-xl py-5 text-base font-bold uppercase tracking-wide bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.open(app.url, "_blank")}
              data-testid={`button-launch-${app.id}`}
            >
              <Rocket className="w-5 h-5 mr-2" />
              Launch App
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              className="w-full rounded-xl py-5 text-base font-bold uppercase tracking-wide" 
              variant="secondary"
              disabled
            >
              <Clock className="w-5 h-5 mr-2" />
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
        {/* Enhanced header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between flex-wrap gap-4"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-cyan-400">
              Welcome Aidan!
            </h2>
            <p className="text-lg text-muted-foreground mt-2 font-medium">Choose your next adventure</p>
          </div>
          <Button 
            variant="outline" 
            onClick={onBack}
            className="rounded-xl border-2 hover:border-violet-500/50 transition-colors"
            data-testid="button-back-home"
          >
            <ArrowUp className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </motion.div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse rounded-2xl border-4 border-border/30">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-muted" />
                    <div className="w-20 h-6 rounded-full bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <div className="w-32 h-7 rounded bg-muted" />
                    <div className="w-full h-12 rounded bg-muted" />
                  </div>
                  <div className="w-full h-12 rounded-xl bg-muted" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
  const [, setLocation] = useLocation();
  
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
  
  const handleAdminClick = () => {
    setLocation("/admin");
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
            <HeroSection onExplore={handleExplore} onAdminClick={handleAdminClick} />
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
