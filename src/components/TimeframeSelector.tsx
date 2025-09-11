
import { Button } from "@/components/ui/button";
import { TimeframeType } from "@/data/employeesData";

interface TimeframeSelectorProps {
  activeTimeframe: TimeframeType;
  onChange: (timeframe: TimeframeType) => void;
}

export function TimeframeSelector({ activeTimeframe, onChange }: TimeframeSelectorProps) {
  const timeframes: { value: TimeframeType; label: string }[] = [
    { value: 'daily', label: 'Diario' },
    { value: 'weekly', label: 'Semanal' },
    { value: 'monthly', label: 'Mensual' },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {timeframes.map((tf) => (
        <Button
          key={tf.value}
          variant={activeTimeframe === tf.value ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(tf.value)}
          className={activeTimeframe === tf.value ? "bg-primary text-white" : ""}
        >
          {tf.label}
        </Button>
      ))}
    </div>
  );
}
