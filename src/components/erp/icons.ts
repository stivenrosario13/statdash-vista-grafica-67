import {
  Users, ShoppingCart, Monitor, Shield, Factory, Truck, Package, Warehouse,
  CreditCard, Car, Settings, Receipt, Landmark, Building2, Calculator, Target,
  PieChart, BarChart3, UserCog, Wallet, Clock, HeartPulse, UtensilsCrossed,
  CheckSquare, RefreshCcw, FolderKanban, Headphones, TrendingUp, DollarSign,
  ShoppingBag, Boxes, FileText, MessageSquare, Mail, LineChart, Brain,
  Activity, UserCheck, Calendar, type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Users, ShoppingCart, Monitor, Shield, Factory, Truck, Package, Warehouse,
  CreditCard, Car, Settings, Receipt, Landmark, Building2, Calculator, Target,
  PieChart, BarChart3, UserCog, Wallet, Clock, HeartPulse, UtensilsCrossed,
  CheckSquare, RefreshCcw, FolderKanban, Headphones, TrendingUp, DollarSign,
  ShoppingBag, Boxes, FileText, MessageSquare, Mail, LineChart, Brain,
  Activity, UserCheck, Calendar,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || Package;
}
