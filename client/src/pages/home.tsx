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
    // Squid Game inspired: focus on circle, triangle, square (the iconic guard masks)
    const shapeTypes: FloatingShape["shape"][] = ["circle", "triangle", "square", "hexagon", "star"];
    // Mixed palette: Squid Game pink/teal + Fortnite/Roblox neon + Doodle God gold/mystical
    const colors = [
      "text-pink-400",      // Squid Game pink
      "text-teal-400",      // Squid Game teal contrast
      "text-violet-400",    // Fortnite purple
      "text-cyan-400",      // Roblox/gaming cyan
      "text-amber-400",     // Doodle God elemental gold
      "text-emerald-400",   // Gaming green
    ];
    
    const newShapes: FloatingShape[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 8,
      size: 14 + Math.random() * 28,
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
  
  // Mixed ember particles: Stranger Things red + Squid Game pink + Doodle God golden
  const particles = Array.from({ length: 35 }, (_, i) => {
    const particleTypes = [
      { color: "rgba(236, 72, 153, 0.9)", glow: "rgba(236, 72, 153, 0.6)" }, // Pink (Squid Game)
      { color: "rgba(239, 68, 68, 0.9)", glow: "rgba(220, 38, 38, 0.6)" },   // Red (Stranger Things)
      { color: "rgba(251, 191, 36, 0.9)", glow: "rgba(245, 158, 11, 0.6)" }, // Gold (Doodle God)
      { color: "rgba(20, 184, 166, 0.9)", glow: "rgba(13, 148, 136, 0.6)" }, // Teal (Squid Game)
    ];
    const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
    return {
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 7 + Math.random() * 6,
      size: 2 + Math.random() * 4,
      color: type.color,
      glow: type.glow,
    };
  });
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Squid Game inspired player number - subtle pink glow */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <motion.span 
          className="text-[20rem] md:text-[28rem] lg:text-[36rem] font-black select-none"
          style={{ 
            fontFamily: "monospace", 
            color: "rgba(236, 72, 153, 0.08)",
            textShadow: "0 0 80px rgba(236, 72, 153, 0.2), 0 0 120px rgba(20, 184, 166, 0.1)"
          }}
          animate={{ opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          456
        </motion.span>
      </div>
      
      {/* Floating geometric shapes - Squid Game iconic symbols */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute ${shape.color}`}
          style={{ 
            left: `${shape.x}%`,
            bottom: "-10%",
            filter: "drop-shadow(0 0 8px currentColor)",
          }}
          animate={{
            y: [0, -window.innerHeight * 1.3],
            rotate: [0, 180],
            opacity: [0, 0.5, 0.5, 0],
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
      
      {/* Multi-themed ember particles */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute rounded-full"
          style={{ 
            left: `${particle.x}%`,
            bottom: "-5%",
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, ${particle.color} 0%, ${particle.glow} 50%, transparent 100%)`,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}, 0 0 ${particle.size * 4}px ${particle.glow}`,
          }}
          animate={{
            y: [0, -window.innerHeight * 1.2],
            x: [0, (Math.random() - 0.5) * 80],
            opacity: [0, 0.9, 0.9, 0],
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
      
      {/* Gradient overlays - balanced multi-theme glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-900/15 via-transparent to-teal-900/15" />
      
      {/* Ambient glow orbs - Doodle God elemental + gaming neon */}
      <motion.div 
        className="absolute top-20 left-10 w-56 h-56 bg-pink-500/8 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      />
      <motion.div 
        className="absolute top-1/3 right-1/4 w-48 h-48 bg-amber-500/8 rounded-full blur-3xl"
        animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 7, repeat: Infinity, delay: 2 }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.4, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, delay: 3 }}
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
        {/* Outer ring - pink/teal gradient (Squid Game + gaming) */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-teal-400 to-pink-500 animate-pulse" />
        <div className="absolute inset-4 rounded-full bg-background" />
        {/* Inner ring - complementary gradient */}
        <div className="absolute inset-8 rounded-full bg-gradient-to-r from-teal-400 via-violet-500 to-pink-500 animate-pulse" />
        <div className="absolute inset-12 rounded-full bg-background flex items-center justify-center">
          <motion.span 
            className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-teal-400 to-violet-400"
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
      {/* Enhanced background with multi-theme overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Gaming Portal"
          className="w-full h-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/20 to-background" />
        {/* Multi-theme radial glow - pink/teal/violet blend */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-900/15 via-teal-900/10 to-transparent" />
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Multi-theme title - Squid Game pink with cyan/teal accents */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-widest">
            <motion.span 
              className="block"
              style={{ 
                fontFamily: "'Fredoka', sans-serif",
                letterSpacing: "0.12em",
                background: "linear-gradient(135deg, #ec4899 0%, #f472b6 50%, #22d3ee 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 20px rgba(236, 72, 153, 0.5)) drop-shadow(0 0 40px rgba(34, 211, 238, 0.3))"
              }}
              animate={{ 
                filter: [
                  "drop-shadow(0 0 15px rgba(236, 72, 153, 0.5)) drop-shadow(0 0 30px rgba(34, 211, 238, 0.3))",
                  "drop-shadow(0 0 25px rgba(236, 72, 153, 0.7)) drop-shadow(0 0 50px rgba(34, 211, 238, 0.4))",
                  "drop-shadow(0 0 15px rgba(236, 72, 153, 0.5)) drop-shadow(0 0 30px rgba(34, 211, 238, 0.3))"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Aidan's
            </motion.span>
            <motion.span 
              className="block"
              style={{ 
                fontFamily: "'Fredoka', sans-serif",
                letterSpacing: "0.12em",
                background: "linear-gradient(135deg, #22d3ee 0%, #14b8a6 50%, #ec4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 20px rgba(34, 211, 238, 0.5)) drop-shadow(0 0 40px rgba(236, 72, 153, 0.3))"
              }}
              animate={{ 
                filter: [
                  "drop-shadow(0 0 15px rgba(34, 211, 238, 0.5)) drop-shadow(0 0 30px rgba(236, 72, 153, 0.3))",
                  "drop-shadow(0 0 25px rgba(34, 211, 238, 0.7)) drop-shadow(0 0 50px rgba(236, 72, 153, 0.4))",
                  "drop-shadow(0 0 15px rgba(34, 211, 238, 0.5)) drop-shadow(0 0 30px rgba(236, 72, 153, 0.3))"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              App Portal
            </motion.span>
          </h1>
        </motion.div>
        
        <motion.p
          className="text-sm sm:text-base md:text-lg text-foreground/85 max-w-2xl mx-auto font-medium mt-4 md:mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            textShadow: "0 2px 20px rgba(0,0,0,0.6)",
          }}
        >A collection of awesome apps built just for you</motion.p>
        
        {/* Demogorgon behind button container */}
        <motion.div
          className="mt-12 md:mt-16 relative flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* 3D Demogorgon Model - Behind the button, positioned to peek from above */}
          <motion.div
            className="absolute -top-32 sm:-top-40 md:-top-48 lg:-top-56 flex justify-center"
            style={{ zIndex: 1 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Multi-theme glow effect behind Demogorgon - pink/teal blend */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.4, 0.25] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full blur-xl" 
                style={{ background: "radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(20, 184, 166, 0.2) 40%, transparent 70%)" }}
              />
            </motion.div>
            <motion.div 
              className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-80 lg:h-80 cursor-pointer overflow-visible"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={onAdminClick}
            >
              <DemogorgonScene />
            </motion.div>
          </motion.div>
          
          {/* Multi-theme button - pink/teal gradient inspired by Squid Game + Fortnite */}
          <motion.div
            animate={{ 
              boxShadow: [
                "0 0 20px rgba(236, 72, 153, 0.4), 0 0 40px rgba(20, 184, 166, 0.2)",
                "0 0 35px rgba(236, 72, 153, 0.6), 0 0 60px rgba(20, 184, 166, 0.35)",
                "0 0 20px rgba(236, 72, 153, 0.4), 0 0 40px rgba(20, 184, 166, 0.2)"
              ]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-xl relative z-20"
          >
            <Button
              size="lg"
              onClick={onExplore}
              className="text-sm sm:text-base px-8 py-5 rounded-xl bg-gradient-to-r from-pink-500 via-pink-600 to-teal-500 hover:from-pink-600 hover:via-pink-700 hover:to-teal-600 border-2 border-pink-400/50 hover:scale-105 transition-all duration-300 font-bold uppercase tracking-wide text-white"
              style={{
                fontFamily: "'Fredoka', sans-serif",
                textShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
              }}
              data-testid="button-explore-apps"
            >
              <Gamepad2 className="w-6 h-6 mr-2" />
              Explore Apps
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
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
              className="w-full rounded-xl py-5 text-base font-bold uppercase tracking-wide bg-gradient-to-r from-pink-500 via-violet-500 to-teal-500 hover:from-pink-600 hover:via-violet-600 hover:to-teal-600 shadow-lg hover:shadow-xl transition-all duration-300"
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
        {/* Enhanced header with multi-theme styling */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between flex-wrap gap-4"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 via-teal-400 to-violet-400 bg-clip-text text-transparent">
              Welcome Aidan!
            </h2>
            <p className="text-lg text-muted-foreground mt-2 font-medium">Choose your next adventure</p>
          </div>
          <Button 
            variant="outline" 
            onClick={onBack}
            className="rounded-xl border-2 hover:border-pink-500/50 transition-colors"
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
