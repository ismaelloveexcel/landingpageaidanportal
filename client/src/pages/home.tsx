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
import { DemogorgonScene, NailBatScene } from "@/components/Model3D";

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

function HeroSection({ onExplore, onAdminClick }: { onExplore: () => void; onAdminClick: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
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
      
      {/* Nail Bat - Background decorative element (bottom-right) */}
      <div className="absolute bottom-8 right-4 md:bottom-16 md:right-8 w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 z-5 opacity-60">
        <NailBatScene />
      </div>
      
      
      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Enhanced title with animated gradient */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight">
            <motion.span 
              className="block gaming-text-gradient"
              style={{ 
                textShadow: "0 4px 30px rgba(34, 211, 238, 0.3)",
                filter: "drop-shadow(0 0 20px rgba(34, 211, 238, 0.2))"
              }}
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              Aidan's
            </motion.span>
            <motion.span 
              className="block bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400 bg-clip-text text-transparent animate-gradient-shift"
              style={{ 
                textShadow: "0 4px 30px rgba(139, 92, 246, 0.3)",
                filter: "drop-shadow(0 0 20px rgba(139, 92, 246, 0.2))",
                backgroundSize: "200% auto"
              }}
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              App Portal
            </motion.span>
          </h1>
        </motion.div>
        
        <motion.p
          className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto font-normal"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
          }}
        >🎮 A collection of (almost) awesome apps built just for you! 🚀</motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Enhanced button with glow pulse */}
          <Button
            size="lg"
            onClick={onExplore}
            className="text-xl px-10 py-7 rounded-2xl bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500 border-none animate-glow-pulse hover:scale-105 transition-transform duration-300 font-bold uppercase tracking-wide"
            data-testid="button-explore-apps"
          >
            <Gamepad2 className="w-7 h-7 mr-3" />
            Explore Apps
            <ArrowRight className="w-6 h-6 ml-3" />
          </Button>
        </motion.div>
        
        {/* 3D Demogorgon Model - Clickable Easter Egg to Admin */}
        <motion.div
          className="flex justify-center pt-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div 
            className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAdminClick}
            title="Click me..."
          >
            <DemogorgonScene />
          </motion.div>
        </motion.div>
        
        {/* Enhanced floating shapes with more variety */}
        <motion.div
          className="flex justify-center gap-6 pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            { shape: "star", color: "text-yellow-400", size: "w-8 h-8" },
            { shape: "circle", color: "text-cyan-400", size: "w-7 h-7" },
            { shape: "triangle", color: "text-violet-400", size: "w-8 h-8" },
            { shape: "hexagon", color: "text-emerald-400", size: "w-7 h-7" },
            { shape: "square", color: "text-indigo-400", size: "w-8 h-8" },
          ].map((item, i) => (
            <motion.div
              key={item.shape}
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 15, -15, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 2.5, 
                delay: i * 0.15, 
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={`${item.color} drop-shadow-lg`}
              style={{ filter: `drop-shadow(0 0 8px currentColor)` }}
            >
              {item.shape === "circle" && <Circle className={item.size} />}
              {item.shape === "triangle" && <Triangle className={item.size} />}
              {item.shape === "square" && <Square className={item.size} />}
              {item.shape === "hexagon" && <Hexagon className={item.size} />}
              {item.shape === "star" && <Star className={item.size} fill="currentColor" />}
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
