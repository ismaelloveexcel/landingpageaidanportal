import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
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
  Wand2
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
  purple: "from-purple-500 to-violet-600",
  cyan: "from-cyan-400 to-teal-500",
  green: "from-emerald-400 to-green-500",
  orange: "from-orange-400 to-amber-500",
  pink: "from-pink-500 to-rose-500",
  blue: "from-blue-400 to-indigo-500",
  red: "from-red-500 to-rose-600",
  yellow: "from-yellow-400 to-orange-500",
};

const glowClasses: Record<string, string> = {
  purple: "shadow-purple-500/50",
  cyan: "shadow-cyan-400/50",
  green: "shadow-emerald-400/50",
  orange: "shadow-orange-400/50",
  pink: "shadow-pink-500/50",
  blue: "shadow-blue-400/50",
  red: "shadow-red-500/50",
  yellow: "shadow-yellow-400/50",
};

function HeroSection() {
  const scrollToApps = () => {
    document.getElementById("apps-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge 
            variant="secondary" 
            className="mb-6 px-4 py-2 text-sm font-semibold bg-primary/20 text-primary-foreground border-2 border-primary/40"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            LEVEL UP YOUR FUN
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight mb-6"
        >
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Awesome aidan</span>
          <br />
          <span className="text-white drop-shadow-2xl">
            Portal
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/80 font-medium mb-8 max-w-2xl mx-auto"
        >
          Your personal collection of awesome apps awaits. 
          <br className="hidden md:block" />
          Choose your adventure and start playing!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Button
            size="lg"
            onClick={scrollToApps}
            className="text-xl px-10 py-7 rounded-2xl font-bold uppercase tracking-wide bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-white/20 shadow-2xl shadow-purple-500/30"
            data-testid="button-explore-apps"
          >
            <Rocket className="w-6 h-6 mr-3" />
            Explore Apps
            <ChevronDown className="w-6 h-6 ml-3 animate-bounce" />
          </Button>
        </motion.div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/50"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </div>
    </section>
  );
}

function AppCard({ app, index }: { app: App; index: number }) {
  const IconComponent = iconMap[app.iconName] || Gamepad2;
  const gradientClass = colorClasses[app.colorClass] || colorClasses.purple;
  const glowClass = glowClasses[app.colorClass] || glowClasses.purple;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card 
        className={`group relative overflow-visible border-4 border-border rounded-3xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${glowClass}`}
        data-testid={`card-app-${app.id}`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-10 rounded-2xl`} />
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col items-center text-center gap-4">
            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${gradientClass} flex items-center justify-center shadow-lg ${glowClass}`}>
              <IconComponent className="w-10 h-10 md:w-12 md:h-12 text-white" />
            </div>
            
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
    <section id="apps-section" className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <Badge 
            variant="outline" 
            className="mb-4 px-4 py-2 text-sm font-semibold border-2 border-primary/40"
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
      color: "from-purple-500 to-violet-600",
      glow: "shadow-purple-500/30"
    },
    { 
      icon: Zap, 
      value: "∞", 
      label: "Hours of Fun", 
      color: "from-cyan-400 to-teal-500",
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
    <section className="py-16 md:py-24 px-4 bg-card/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge 
            variant="outline" 
            className="mb-4 px-4 py-2 text-sm font-semibold border-2 border-accent/40"
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
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`border-4 border-border rounded-3xl text-center py-8 shadow-xl ${stat.glow}`}>
                <CardContent className="space-y-4">
                  <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-10 h-10 text-white" />
                  </div>
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

  const handleSecretClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 5) {
      setIsUnlocked(true);
    }
  };

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
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
              <Card className="border-4 border-primary/50 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 shadow-2xl shadow-primary/20">
                <CardContent className="py-8 space-y-4">
                  <div className="text-6xl">
                    <Star className="w-16 h-16 mx-auto text-yellow-400" />
                  </div>
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
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border">
      <div className="max-w-5xl mx-auto text-center space-y-6">
        <div className="flex items-center justify-center gap-2 text-xl font-semibold">
          <span>Made with</span>
          <Heart className="w-6 h-6 text-red-500 fill-red-500 animate-pulse" />
          <span>for you</span>
        </div>
        
        <p className="text-muted-foreground">
          Your Epic App Portal - Where Adventures Begin
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
