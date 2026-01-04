import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Gamepad2, 
  Rocket, 
  Star, 
  Zap, 
  Trophy,
  Sparkles,
  ChevronDown,
  ExternalLink,
  Lock,
  Unlock,
  Heart,
  Flame,
  Target,
  Sword,
  Shield,
  Crown,
  Ghost,
  Skull,
  Bomb,
  Wand2,
  Eye,
  CircleDot,
  Triangle,
  Square,
  Circle,
  Hexagon,
  Droplets,
  Wind,
  Mountain
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { App } from "@shared/schema";
import heroImage from "@assets/generated_images/epic_neon_gaming_portal.png";

const iconMap: Record<string, typeof Gamepad2> = {
  gamepad: Gamepad2,
  rocket: Rocket,
  star: Star,
  zap: Zap,
  trophy: Trophy,
  sparkles: Sparkles,
  flame: Flame,
  target: Target,
  sword: Sword,
  shield: Shield,
  crown: Crown,
  ghost: Ghost,
  skull: Skull,
  bomb: Bomb,
  wand: Wand2,
};

const colorClasses: Record<string, string> = {
  purple: "from-violet-500 to-indigo-600",
  cyan: "from-cyan-400 to-blue-500",
  green: "from-emerald-400 to-teal-500",
  orange: "from-orange-400 to-amber-500",
  pink: "from-blue-500 to-cyan-500",
  blue: "from-blue-400 to-indigo-500",
  red: "from-red-500 to-orange-600",
  yellow: "from-yellow-400 to-orange-500",
};

const glowClasses: Record<string, string> = {
  purple: "shadow-violet-500/50",
  cyan: "shadow-cyan-400/50",
  green: "shadow-emerald-400/50",
  orange: "shadow-orange-400/50",
  pink: "shadow-blue-500/50",
  blue: "shadow-blue-400/50",
  red: "shadow-red-500/50",
  yellow: "shadow-yellow-400/50",
};

function FloatingParticle({ delay, duration, size, color, left, icon }: { 
  delay: number; 
  duration: number; 
  size: number; 
  color: string;
  left: string;
  icon?: "circle" | "square" | "triangle" | "star" | "hexagon";
}) {
  const icons = {
    circle: <Circle className="w-full h-full" />,
    square: <Square className="w-full h-full" />,
    triangle: <Triangle className="w-full h-full" />,
    star: <Star className="w-full h-full" />,
    hexagon: <Hexagon className="w-full h-full" />,
  };

  return (
    <motion.div
      className={`absolute ${color} opacity-20`}
      style={{ 
        width: size, 
        height: size, 
        left,
        bottom: -size,
      }}
      animate={{
        y: [0, -800, -1600],
        x: [0, Math.random() * 100 - 50, Math.random() * 200 - 100],
        rotate: [0, 180, 360],
        opacity: [0, 0.4, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {icon ? icons[icon] : <div className="w-full h-full rounded-full bg-current" />}
    </motion.div>
  );
}

function SquidGameShape({ type, delay }: { type: "circle" | "triangle" | "square"; delay: number }) {
  const shapes = {
    circle: <Circle className="w-8 h-8" />,
    triangle: <Triangle className="w-8 h-8" />,
    square: <Square className="w-8 h-8" />,
  };

  return (
    <motion.div
      className="absolute text-red-500/30"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        opacity: [0, 0.5, 0],
        scale: [0.5, 1.2, 0.5],
        rotate: [0, 360],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {shapes[type]}
    </motion.div>
  );
}

function StrangerThingsLight({ index }: { index: number }) {
  const colors = ["text-red-500", "text-yellow-400", "text-green-400", "text-blue-400", "text-purple-500"];
  
  return (
    <motion.div
      className={`absolute w-3 h-3 rounded-full ${colors[index % colors.length]}`}
      style={{
        left: `${10 + index * 8}%`,
        top: "15%",
      }}
      animate={{
        opacity: [0.2, 1, 0.2],
        scale: [0.8, 1.2, 0.8],
        boxShadow: [
          "0 0 5px currentColor",
          "0 0 20px currentColor, 0 0 40px currentColor",
          "0 0 5px currentColor",
        ],
      }}
      transition={{
        duration: 1.5 + Math.random(),
        delay: index * 0.3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="w-full h-full rounded-full bg-current" />
    </motion.div>
  );
}

function DoodleGodElement({ element, delay }: { element: "fire" | "water" | "air" | "earth"; delay: number }) {
  const elements = {
    fire: { icon: Flame, color: "text-orange-500" },
    water: { icon: Droplets, color: "text-blue-400" },
    air: { icon: Wind, color: "text-cyan-300" },
    earth: { icon: Mountain, color: "text-amber-600" },
  };
  
  const { icon: Icon, color } = elements[element];

  return (
    <motion.div
      className={`absolute ${color} opacity-0`}
      style={{
        left: `${Math.random() * 80 + 10}%`,
        top: `${Math.random() * 60 + 20}%`,
      }}
      animate={{
        opacity: [0, 0.6, 0],
        scale: [0.5, 1.5, 0.5],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Icon className="w-6 h-6" />
    </motion.div>
  );
}

function FortniteVBuck({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${Math.random() * 90 + 5}%`,
        top: "-20px",
      }}
      animate={{
        y: [0, 800],
        rotate: [0, 720],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center shadow-lg shadow-cyan-400/50">
        <span className="text-[8px] font-black text-blue-900">V</span>
      </div>
    </motion.div>
  );
}

function RobloxNoob({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${Math.random() * 80 + 10}%`,
        bottom: "0",
      }}
      animate={{
        y: [0, -50, 0],
        x: [0, 30, 0],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="w-4 h-6 bg-yellow-400 rounded-sm relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-300 rounded-sm" />
      </div>
    </motion.div>
  );
}

function AnimatedBackground() {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    delay: i * 0.4,
    duration: 8 + Math.random() * 6,
    size: 8 + Math.random() * 20,
    color: ["text-violet-500", "text-cyan-400", "text-emerald-400", "text-blue-500", "text-indigo-400"][i % 5],
    left: `${Math.random() * 100}%`,
    icon: ["circle", "square", "triangle", "star", "hexagon"][i % 5] as "circle" | "square" | "triangle" | "star" | "hexagon",
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <FloatingParticle key={p.id} {...p} />
      ))}
      
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <StrangerThingsLight key={`light-${i}`} index={i} />
      ))}
      
      {["circle", "triangle", "square"].map((type, i) => (
        <SquidGameShape key={`squid-${i}`} type={type as "circle" | "triangle" | "square"} delay={i * 2} />
      ))}
      
      {["fire", "water", "air", "earth"].map((el, i) => (
        <DoodleGodElement key={`doodle-${el}`} element={el as "fire" | "water" | "air" | "earth"} delay={i * 1.5} />
      ))}
      
      {[0, 1, 2].map((i) => (
        <FortniteVBuck key={`vbuck-${i}`} delay={i * 3} />
      ))}
      
      {[0, 1].map((i) => (
        <RobloxNoob key={`noob-${i}`} delay={i * 2} />
      ))}
    </div>
  );
}

function PortalTransition({ isActive, onComplete }: { isActive: boolean; onComplete: () => void }) {
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(onComplete, 1500);
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          
          <motion.div
            className="relative z-10"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: [0, 3, 15], rotate: [0, 180, 360] }}
            transition={{ duration: 1.2, ease: "easeIn" }}
          >
            <div className="w-40 h-40 rounded-full bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400 blur-xl" />
          </motion.div>
          
          <motion.div
            className="absolute z-20 text-white text-4xl font-black uppercase tracking-widest"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 2] }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            ENTERING PORTAL
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function HeroSection() {
  const [isPortalActive, setIsPortalActive] = useState(false);

  const handleExploreClick = () => {
    setIsPortalActive(true);
  };

  const handlePortalComplete = () => {
    setIsPortalActive(false);
    document.getElementById("apps-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <PortalTransition isActive={isPortalActive} onComplete={handlePortalComplete} />
      
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            transform: "scale(1.1)",
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        <AnimatedBackground />
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30, rotateX: -30 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8 }}
            style={{ perspective: "1000px" }}
          >
            <Badge 
              variant="secondary" 
              className="mb-6 px-4 py-2 text-sm font-semibold bg-violet-500/30 text-white border-2 border-violet-400/50 shadow-lg shadow-violet-500/30"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              LEVEL UP YOUR FUN
            </Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="relative"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight mb-6 relative">
              <motion.span 
                className="block bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-2xl"
                style={{
                  textShadow: "0 0 80px rgba(139, 92, 246, 0.5), 0 0 120px rgba(34, 211, 238, 0.3)",
                  filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.8))",
                }}
                animate={{
                  textShadow: [
                    "0 0 80px rgba(139, 92, 246, 0.5), 0 0 120px rgba(34, 211, 238, 0.3)",
                    "0 0 100px rgba(139, 92, 246, 0.7), 0 0 150px rgba(34, 211, 238, 0.5)",
                    "0 0 80px rgba(139, 92, 246, 0.5), 0 0 120px rgba(34, 211, 238, 0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Awesome Aidan
              </motion.span>
              <motion.span 
                className="block text-white relative"
                style={{
                  textShadow: "0 4px 20px rgba(0,0,0,0.9), 0 8px 40px rgba(0,0,0,0.7), 0 0 60px rgba(139, 92, 246, 0.4)",
                  filter: "drop-shadow(0 15px 35px rgba(0,0,0,0.9))",
                }}
              >
                Portal
              </motion.span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white font-medium mb-10 max-w-2xl mx-auto relative"
            style={{
              textShadow: "0 2px 20px rgba(0,0,0,0.9), 0 4px 40px rgba(0,0,0,0.7)",
            }}
          >
            Your personal collection of awesome apps awaits. 
            <br className="hidden md:block" />
            Choose your adventure and start playing!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
          >
            <Button
              size="lg"
              onClick={handleExploreClick}
              className="text-xl px-12 py-8 rounded-2xl font-black uppercase tracking-wide bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 border-4 border-white/30 shadow-2xl shadow-violet-500/40 hover:shadow-violet-500/60 transition-shadow"
              data-testid="button-explore-apps"
            >
              <Rocket className="w-7 h-7 mr-3" />
              Explore Apps
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="ml-3"
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
            </Button>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1 }}
            className="mt-6 text-sm text-white/60 font-mono"
          >
            [ Look for hidden easter eggs from your favorite games ]
          </motion.p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/60"
          >
            <ChevronDown className="w-10 h-10" />
          </motion.div>
        </div>
        
        <motion.div
          className="absolute bottom-4 right-4 text-red-500/60"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          title="The Upside Down is near..."
        >
          <Eye className="w-8 h-8" />
        </motion.div>
      </section>
    </>
  );
}

function AppCard({ app, index }: { app: App; index: number }) {
  const IconComponent = iconMap[app.iconName] || Gamepad2;
  const gradientClass = colorClasses[app.colorClass] || colorClasses.purple;
  const glowClass = glowClasses[app.colorClass] || glowClasses.purple;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ scale: 1.03, y: -5 }}
    >
      <Card 
        className={`group relative overflow-visible border-4 border-border rounded-3xl transition-all duration-300 shadow-xl hover:shadow-2xl ${glowClass}`}
        data-testid={`card-app-${app.id}`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-10 rounded-2xl`} />
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col items-center text-center gap-4">
            <motion.div 
              className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${gradientClass} flex items-center justify-center shadow-xl ${glowClass}`}
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <IconComponent className="w-10 h-10 md:w-12 md:h-12 text-white" />
            </motion.div>
            
            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                {app.title}
              </h3>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                {app.description}
              </p>
            </div>

            <Button
              asChild
              size="lg"
              className={`w-full mt-2 text-lg py-6 rounded-xl font-bold uppercase tracking-wide bg-gradient-to-r ${gradientClass} border-2 border-white/20 shadow-lg`}
            >
              <a 
                href={app.url} 
                target="_blank" 
                rel="noopener noreferrer"
                data-testid={`link-launch-app-${app.id}`}
              >
                <Zap className="w-5 h-5 mr-2" />
                Launch App
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function AppsSection() {
  const { data: apps, isLoading } = useQuery<App[]>({
    queryKey: ["/api/apps"],
  });

  return (
    <section id="apps-section" className="py-16 md:py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`bg-orb-${i}`}
            className="absolute w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{
              background: `radial-gradient(circle, ${["#8b5cf6", "#22d3ee", "#10b981"][i]} 0%, transparent 70%)`,
              left: `${i * 40}%`,
              top: `${i * 30}%`,
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <Badge 
            variant="outline" 
            className="mb-4 px-4 py-2 text-sm font-semibold border-2 border-violet-400/50"
          >
            <Gamepad2 className="w-4 h-4 mr-2" />
            YOUR APPS
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-4">
            Choose Your
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent ml-3">
              Adventure
            </span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Click on any app to launch it in a new tab. More apps coming soon!
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="border-4 border-border rounded-3xl animate-pulse">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-24 h-24 rounded-2xl bg-muted" />
                    <div className="w-40 h-8 bg-muted rounded" />
                    <div className="w-64 h-12 bg-muted rounded" />
                    <div className="w-full h-14 bg-muted rounded-xl" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : apps && apps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {apps.map((app, index) => (
              <AppCard key={app.id} app={app} index={index} />
            ))}
          </div>
        ) : (
          <Card className="border-4 border-dashed border-muted rounded-3xl">
            <CardContent className="py-16 text-center">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-2xl font-bold mb-2">No Apps Yet</h3>
              <p className="text-muted-foreground text-lg">
                Apps will appear here once they're added. Check back soon!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}

function StatsSection() {
  const { data: apps } = useQuery<App[]>({
    queryKey: ["/api/apps"],
  });

  const stats = [
    { 
      icon: Gamepad2, 
      value: apps?.length || 0, 
      label: "Total Apps", 
      color: "from-violet-500 to-indigo-600",
      glow: "shadow-violet-500/30"
    },
    { 
      icon: Zap, 
      value: "∞", 
      label: "Hours of Fun", 
      color: "from-cyan-400 to-blue-500",
      glow: "shadow-cyan-400/30"
    },
    { 
      icon: Trophy, 
      value: "100+", 
      label: "Adventures Awaiting", 
      color: "from-orange-400 to-amber-500",
      glow: "shadow-orange-400/30"
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-card/50 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge 
            variant="outline" 
            className="mb-4 px-4 py-2 text-sm font-semibold border-2 border-emerald-400/50"
          >
            <Trophy className="w-4 h-4 mr-2" />
            YOUR STATS
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black uppercase">
            Achievement
            <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent ml-3">
              Unlocked
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, type: "spring" }}
              whileHover={{ y: -5 }}
            >
              <Card className={`border-4 border-border rounded-3xl text-center py-8 shadow-xl ${stat.glow}`}>
                <CardContent className="space-y-4">
                  <motion.div 
                    className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="w-10 h-10 text-white" />
                  </motion.div>
                  <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold text-muted-foreground uppercase tracking-wide">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SecretSection() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [demogordonFound, setDemogordonFound] = useState(false);
  const [squidGameCode, setSquidGameCode] = useState("");
  const [squidGameUnlocked, setSquidGameUnlocked] = useState(false);

  const handleSecretClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 5) {
      setIsUnlocked(true);
    }
  };

  const handleDemogordon = () => {
    setDemogordonFound(true);
  };

  const handleSquidInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSquidGameCode(value);
    if (value.toLowerCase() === "456") {
      setSquidGameUnlocked(true);
    }
  };

  return (
    <section className="py-16 md:py-24 px-4 relative">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <button
            onClick={handleSecretClick}
            className="group inline-flex items-center gap-2 text-muted-foreground/50 hover:text-muted-foreground transition-colors cursor-pointer"
            data-testid="button-secret-code"
          >
            {isUnlocked ? (
              <Unlock className="w-5 h-5" />
            ) : (
              <Lock className="w-5 h-5" />
            )}
            <span className="text-sm font-mono uppercase tracking-widest">
              {isUnlocked ? "SECRET UNLOCKED" : `SECRET CODE [${clickCount}/5]`}
            </span>
          </button>

          {isUnlocked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="mt-8"
            >
              <Card className="border-4 border-violet-500/50 rounded-3xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 shadow-2xl shadow-violet-500/20">
                <CardContent className="py-8 space-y-4">
                  <motion.div 
                    className="text-6xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Star className="w-16 h-16 mx-auto text-yellow-400" />
                  </motion.div>
                  <h3 className="text-2xl md:text-3xl font-black uppercase">
                    You Found the Secret!
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    You're officially the coolest kid ever! 
                    Keep being awesome and never stop exploring!
                  </p>
                  <Badge className="px-6 py-2 text-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold">
                    <Crown className="w-5 h-5 mr-2" />
                    LEGENDARY STATUS
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <motion.button
            onClick={handleDemogordon}
            className="group relative p-4 rounded-xl border-2 border-dashed border-muted-foreground/30 hover:border-red-500/50 transition-colors"
            whileHover={{ scale: 1.05 }}
            title="Something lurks in the Upside Down..."
            data-testid="button-stranger-things-easter-egg"
          >
            <Ghost className={`w-8 h-8 ${demogordonFound ? "text-red-500" : "text-muted-foreground/50"}`} />
            {demogordonFound && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-red-400 font-mono whitespace-nowrap"
              >
                STRANGER THINGS
              </motion.span>
            )}
          </motion.button>
          
          <div className="relative">
            <input
              type="text"
              value={squidGameCode}
              onChange={handleSquidInput}
              placeholder="Enter player #"
              maxLength={3}
              className="w-32 px-4 py-2 rounded-lg bg-card border-2 border-muted text-center font-mono text-lg focus:border-red-500/50 outline-none transition-colors"
              data-testid="input-squid-game-code"
            />
            {squidGameUnlocked && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-2"
              >
                <CircleDot className="w-6 h-6 text-red-500" />
                <Triangle className="w-6 h-6 text-red-500" />
                <Square className="w-6 h-6 text-red-500" />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border relative overflow-hidden">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        viewport={{ once: true }}
      >
        {[Flame, Droplets, Wind, Mountain].map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute text-muted-foreground/20"
            style={{ left: `${20 + i * 20}%`, top: "50%" }}
            animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
          >
            <Icon className="w-6 h-6" />
          </motion.div>
        ))}
      </motion.div>
      
      <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
        <div className="flex items-center justify-center gap-2 text-xl font-semibold">
          <span>Made with</span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Heart className="w-6 h-6 text-red-500 fill-red-500" />
          </motion.div>
          <span>for Aidan</span>
        </div>
        
        <p className="text-muted-foreground">
          Awesome Aidan Portal - Where Adventures Begin
        </p>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-muted-foreground"
          data-testid="button-back-to-top"
        >
          <Rocket className="w-4 h-4 mr-2" />
          Back to Top
        </Button>
        
        <p className="text-xs text-muted-foreground/50 font-mono">
          [ Hint: Look for Stranger Things lights, Squid Game shapes, Doodle God elements, Fortnite V-Bucks, and Roblox noobs ]
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <AppsSection />
      <StatsSection />
      <SecretSection />
      <Footer />
    </div>
  );
}
