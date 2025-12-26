// src/components/home/feature-showcase.tsx
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, TrendingUp, Shield as ShieldIcon } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Save Time",
    description: "Reduce document review time by up to 70% with AI-powered analysis",
    color: "text-blue-600"
  },
  {
    icon: TrendingUp,
    title: "Increase Efficiency",
    description: "Automate repetitive tasks and focus on high-value legal work",
    color: "text-green-600"
  },
  {
    icon: CheckCircle,
    title: "Improve Accuracy",
    description: "Minimize human error with consistent AI analysis",
    color: "text-purple-600"
  },
  {
    icon: ShieldIcon,
    title: "Reduce Risk",
    description: "Identify potential issues early with risk assessment tools",
    color: "text-orange-600"
  }
];

export default function FeatureShowcase() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Transform Your Legal Workflow
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience unprecedented efficiency and accuracy in your legal practice
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className={`inline-flex p-3 rounded-full bg-opacity-10 ${benefit.color.replace('text-', 'bg-')} mb-4`}>
                  <benefit.icon className={`h-8 w-8 ${benefit.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}