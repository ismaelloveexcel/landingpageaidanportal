import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { Plus, Pencil, Trash2, ArrowLeft, Lock } from "lucide-react";
import { Link } from "wouter";
import type { App } from "@shared/schema";

const ADMIN_KEY_STORAGE = "aidan-portal-admin-key";

const appFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  url: z.string().url("Must be a valid URL"),
  status: z.enum(["active", "coming soon"]),
  iconName: z.string().min(1, "Icon is required"),
  colorClass: z.string().min(1, "Color is required"),
  order: z.number().int().min(0),
});

type AppFormData = z.infer<typeof appFormSchema>;

function AdminLogin({ onLogin }: { onLogin: (key: string) => void }) {
  const [key, setKey] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key.trim()) {
      localStorage.setItem(ADMIN_KEY_STORAGE, key);
      onLogin(key);
    }
  };
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/">
              <Button variant="ghost" size="icon" data-testid="button-login-back-home">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
          </div>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Admin Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-key">Admin Password</Label>
              <Input
                id="admin-key"
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Enter admin password"
                data-testid="input-admin-key"
              />
            </div>
            <Button type="submit" className="w-full" data-testid="button-admin-login">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function AppForm({ 
  app, 
  onSubmit, 
  onCancel,
  isLoading 
}: { 
  app?: App; 
  onSubmit: (data: AppFormData) => void;
  onCancel: () => void;
  isLoading: boolean;
}) {
  const form = useForm<AppFormData>({
    resolver: zodResolver(appFormSchema),
    defaultValues: app ? {
      title: app.title,
      description: app.description,
      url: app.url,
      status: app.status as "active" | "coming soon",
      iconName: app.iconName,
      colorClass: app.colorClass,
      order: app.order,
    } : {
      title: "",
      description: "",
      url: "",
      status: "active",
      iconName: "rocket",
      colorClass: "purple",
      order: 0,
    },
  });
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>App Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="My Awesome App" data-testid="input-app-title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} placeholder="What does this app do?" data-testid="input-app-description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://example.com" data-testid="input-app-url" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger data-testid="select-app-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="coming soon">Coming Soon</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="iconName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger data-testid="select-app-icon">
                    <SelectValue placeholder="Select icon" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="rocket">Rocket</SelectItem>
                  <SelectItem value="sword">Sword</SelectItem>
                  <SelectItem value="sparkles">Sparkles</SelectItem>
                  <SelectItem value="zap">Zap</SelectItem>
                  <SelectItem value="gamepad">Gamepad</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="colorClass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger data-testid="select-app-color">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="purple">Purple</SelectItem>
                  <SelectItem value="cyan">Cyan</SelectItem>
                  <SelectItem value="green">Green</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                  <SelectItem value="blue">Blue</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Order</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  {...field} 
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  data-testid="input-app-order" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex gap-2 pt-4">
          <Button type="submit" disabled={isLoading} data-testid="button-save-app">
            {isLoading ? "Saving..." : app ? "Update App" : "Add App"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel} data-testid="button-cancel">
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}

function AdminDashboard({ adminKey }: { adminKey: string }) {
  const { toast } = useToast();
  const [editingApp, setEditingApp] = useState<App | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const { data: apps, isLoading } = useQuery<App[]>({
    queryKey: ["/api/apps"],
  });
  
  const createMutation = useMutation({
    mutationFn: async (data: AppFormData) => {
      const res = await fetch("/api/apps", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-admin-key": adminKey 
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create app");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/apps"] });
      setIsAddDialogOpen(false);
      toast({ title: "App added successfully" });
    },
    onError: () => {
      toast({ title: "Failed to add app", variant: "destructive" });
    },
  });
  
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<AppFormData> }) => {
      const res = await fetch(`/api/apps/${id}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          "x-admin-key": adminKey 
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update app");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/apps"] });
      setIsEditDialogOpen(false);
      setEditingApp(null);
      toast({ title: "App updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update app", variant: "destructive" });
    },
  });
  
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/apps/${id}`, {
        method: "DELETE",
        headers: { "x-admin-key": adminKey },
      });
      if (!res.ok) throw new Error("Failed to delete app");
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/apps"] });
      toast({ title: "App deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete app", variant: "destructive" });
    },
  });
  
  const handleLogout = () => {
    localStorage.removeItem(ADMIN_KEY_STORAGE);
    window.location.reload();
  };
  
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" data-testid="button-back-home">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-cyan-400">Admin Dashboard</h1>
          </div>
          <div className="flex gap-2">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button data-testid="button-add-app">
                  <Plus className="w-4 h-4 mr-2" />
                  Add App
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New App</DialogTitle>
                </DialogHeader>
                <AppForm 
                  onSubmit={(data) => createMutation.mutate(data)}
                  onCancel={() => setIsAddDialogOpen(false)}
                  isLoading={createMutation.isPending}
                />
              </DialogContent>
            </Dialog>
            <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
              Logout
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="h-6 bg-muted rounded w-1/3 mb-2" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-4">
            {apps?.map((app) => (
              <Card key={app.id} data-testid={`card-admin-app-${app.id}`}>
                <CardContent className="p-4 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold truncate">{app.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">{app.url}</p>
                    <span className={`text-xs ${app.status === "active" ? "text-emerald-400" : "text-yellow-400"}`}>
                      {app.status}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => {
                        setEditingApp(app);
                        setIsEditDialogOpen(true);
                      }}
                      data-testid={`button-edit-${app.id}`}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => {
                        if (confirm("Delete this app?")) {
                          deleteMutation.mutate(app.id);
                        }
                      }}
                      data-testid={`button-delete-${app.id}`}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit App</DialogTitle>
            </DialogHeader>
            {editingApp && (
              <AppForm 
                app={editingApp}
                onSubmit={(data) => updateMutation.mutate({ id: editingApp.id, data })}
                onCancel={() => {
                  setIsEditDialogOpen(false);
                  setEditingApp(null);
                }}
                isLoading={updateMutation.isPending}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default function Admin() {
  const [adminKey, setAdminKey] = useState<string | null>(() => 
    localStorage.getItem(ADMIN_KEY_STORAGE)
  );
  
  if (!adminKey) {
    return <AdminLogin onLogin={setAdminKey} />;
  }
  
  return <AdminDashboard adminKey={adminKey} />;
}
