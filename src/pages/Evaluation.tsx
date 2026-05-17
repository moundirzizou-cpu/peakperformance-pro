import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Star, ChevronRight } from 'lucide-react';
import { employees, evaluationCriteria } from '@/data/mockData';
import { cn } from '@/lib/utils';

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 10 }, (_, i) => (
        <button key={i} onClick={() => onChange(i + 1)} aria-label={`Rate ${i + 1} out of 10`} className="transition-transform hover:scale-110">
          <Star
            size={22}
            className={cn(
              "transition-colors",
              i < value ? "fill-warning text-warning" : "text-muted-foreground/30"
            )}
          />
        </button>
      ))}
    </div>
  );
}

function SegmentedButtons({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex rounded-lg overflow-hidden border border-border">
      {[1, 2].map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={cn(
            "flex-1 py-2 px-4 text-sm font-medium transition-colors",
            value === opt ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"
          )}
        >
          Option {opt} ({opt === 1 ? '5' : '10'} pts)
        </button>
      ))}
    </div>
  );
}

function calculateScore(type: string, value: number | boolean): number {
  switch (type) {
    case 'binary': return value ? 0 : 10;
    case 'threshold': return (value as number) < 70 ? 0 : (value as number) / 10;
    case 'direct': return (value as number) / 10;
    case 'choice': return value === 1 ? 5 : 10;
    case 'scale': return (value as number) >= 8 ? 10 : 0;
    default: return 0;
  }
}

export default function Evaluation() {
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<Record<string, number | boolean>>({
    c1: false, c2: 50, c3: 50, c4: 1, c5: 5,
  });
  const [notes, setNotes] = useState('');

  const selectedEmp = employees.find((e) => e.id === selectedEmployee);

  const totalScore = evaluationCriteria.reduce((sum, c) => sum + calculateScore(c.type, formValues[c.id]), 0);

  if (!selectedEmployee) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">Evaluation Module</h1>
          <p className="text-muted-foreground text-sm mt-1">Select an employee to begin evaluation</p>
        </div>
        <Card className="border-border shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead className="text-right">Current Score</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((emp) => (
                  <TableRow key={emp.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedEmployee(emp.id)}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{emp.avatar}</div>
                        <span className="font-medium text-foreground">{emp.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{emp.position}</TableCell>
                    <TableCell className="text-muted-foreground">{emp.branch}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={emp.score >= 90 ? 'default' : emp.score >= 70 ? 'secondary' : 'destructive'}>
                        {emp.score}%
                      </Badge>
                    </TableCell>
                    <TableCell><ChevronRight size={16} className="text-muted-foreground" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => setSelectedEmployee(null)}>← Back</Button>
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">Evaluate: {selectedEmp?.name}</h1>
          <p className="text-muted-foreground text-sm">{selectedEmp?.position} · {selectedEmp?.branch}</p>
        </div>
      </div>

      {evaluationCriteria.map((criterion) => (
        <Card key={criterion.id} className="border-border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-heading flex items-center justify-between">
              <span>{criterion.name}</span>
              <Badge variant="outline" className="font-normal text-xs">
                {calculateScore(criterion.type, formValues[criterion.id]).toFixed(1)} pts
              </Badge>
            </CardTitle>
            <p className="text-xs text-muted-foreground">{criterion.description}</p>
          </CardHeader>
          <CardContent>
            {criterion.type === 'binary' && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Yes = 0 pts · No = 10 pts</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">No</span>
                  <Switch checked={formValues[criterion.id] as boolean} onCheckedChange={(v) => setFormValues((prev) => ({ ...prev, [criterion.id]: v }))} />
                  <span className="text-xs text-muted-foreground">Yes</span>
                </div>
              </div>
            )}

            {criterion.type === 'threshold' && (
              <div className="space-y-3">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Below 70% = 0 pts · Above 70% = Value/10</span>
                  <span className="font-bold text-foreground">{formValues[criterion.id] as number}%</span>
                </div>
                <Slider
                  value={[formValues[criterion.id] as number]}
                  onValueChange={([v]) => setFormValues((prev) => ({ ...prev, [criterion.id]: v }))}
                  max={100} step={1}
                />
              </div>
            )}

            {criterion.type === 'direct' && (
              <div className="space-y-3">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Direct percentage → pts/10</span>
                  <span className="font-bold text-foreground">{formValues[criterion.id] as number}%</span>
                </div>
                <Slider
                  value={[formValues[criterion.id] as number]}
                  onValueChange={([v]) => setFormValues((prev) => ({ ...prev, [criterion.id]: v }))}
                  max={100} step={1}
                />
              </div>
            )}

            {criterion.type === 'choice' && (
              <SegmentedButtons
                value={formValues[criterion.id] as number}
                onChange={(v) => setFormValues((prev) => ({ ...prev, [criterion.id]: v }))}
              />
            )}

            {criterion.type === 'scale' && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Below 8 = 0 pts · 8 or above = 10 pts</p>
                <StarRating
                  value={formValues[criterion.id] as number}
                  onChange={(v) => setFormValues((prev) => ({ ...prev, [criterion.id]: v }))}
                />
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {/* Notes */}
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-heading">Manager Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Add observations, recommendations, or development areas..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="border-primary/30 bg-accent shadow-sm">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Score</p>
            <p className="text-3xl font-bold font-heading text-primary">{totalScore.toFixed(1)} <span className="text-lg text-muted-foreground">/ 50</span></p>
          </div>
          <Button className="px-8">Submit Evaluation</Button>
        </CardContent>
      </Card>
    </div>
  );
}
