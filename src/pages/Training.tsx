import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { trainingRequests } from '@/data/mockData';

const statusConfig = {
  Pending: { icon: Clock, className: 'bg-warning/10 text-warning border-warning/20' },
  Approved: { icon: CheckCircle2, className: 'bg-success/10 text-success border-success/20' },
  Rejected: { icon: XCircle, className: 'bg-destructive/10 text-destructive border-destructive/20' },
};

const priorityVariant = {
  High: 'destructive' as const,
  Medium: 'secondary' as const,
  Low: 'outline' as const,
};

function RequestForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Course Title</Label>
          <Input placeholder="e.g., Advanced React Development" />
        </div>
        <div className="space-y-2">
          <Label>Field</Label>
          <Select><SelectTrigger><SelectValue placeholder="Select field" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
              <SelectItem value="hr">HR</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Problem Description</Label>
        <Textarea placeholder="Describe the skill gap or problem..." rows={3} />
      </div>
      <div className="space-y-2">
        <Label>Justification</Label>
        <Textarea placeholder="Why is this training needed?" rows={2} />
      </div>
      <div className="space-y-2">
        <Label>Training Goal</Label>
        <Input placeholder="Expected outcome of the training" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Skill Type</Label>
          <Select><SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="soft">Soft Skills</SelectItem>
              <SelectItem value="leadership">Leadership</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Priority</Label>
          <Select><SelectTrigger><SelectValue placeholder="Priority" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Target Semester</Label>
          <Select><SelectTrigger><SelectValue placeholder="Semester" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="s1-2026">S1-2026</SelectItem>
              <SelectItem value="s2-2026">S2-2026</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Language</Label>
          <Select><SelectTrigger><SelectValue placeholder="Language" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ar">Arabic</SelectItem>
              <SelectItem value="fr">French</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Suggested Trainer</Label>
          <Input placeholder="Trainer name or organization" />
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Submit Request</Button>
      </div>
    </div>
  );
}

function CoordinationForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Location</Label>
          <Input placeholder="Training venue or online platform" />
        </div>
        <div className="space-y-2">
          <Label>Cost ($)</Label>
          <Input type="number" placeholder="0" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Success Indicator</Label>
        <Input placeholder="How will success be measured?" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Measurement Method</Label>
          <Select><SelectTrigger><SelectValue placeholder="Method" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="immediate">Immediate Assessment</SelectItem>
              <SelectItem value="on-the-job">On-the-job Evaluation</SelectItem>
              <SelectItem value="trend">Performance Trend</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Follow-up Manager</Label>
          <Input placeholder="Manager responsible for follow-up" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Final Evaluation Score</Label>
        <Input type="number" placeholder="0-100" />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Save Coordination</Button>
      </div>
    </div>
  );
}

export default function Training() {
  const [newRequestOpen, setNewRequestOpen] = useState(false);
  const [coordOpen, setCoordOpen] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">Training Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Request, approve, and coordinate training programs</p>
        </div>
        <Dialog open={newRequestOpen} onOpenChange={setNewRequestOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus size={16} /> New Request</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-heading">New Training Request</DialogTitle>
            </DialogHeader>
            <RequestForm onClose={() => setNewRequestOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        {['all', 'pending', 'approved', 'rejected'].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card className="border-border shadow-sm">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Course Title</TableHead>
                      <TableHead>Field</TableHead>
                      <TableHead>Requested By</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Semester</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trainingRequests
                      .filter((r) => tab === 'all' || r.status.toLowerCase() === tab)
                      .map((req) => {
                        const StatusIcon = statusConfig[req.status].icon;
                        return (
                          <TableRow key={req.id}>
                            <TableCell className="font-mono text-xs text-muted-foreground">{req.id}</TableCell>
                            <TableCell className="font-medium text-foreground">{req.title}</TableCell>
                            <TableCell className="text-muted-foreground">{req.field}</TableCell>
                            <TableCell className="text-muted-foreground">{req.requestedBy}</TableCell>
                            <TableCell><Badge variant={priorityVariant[req.priority]}>{req.priority}</Badge></TableCell>
                            <TableCell className="text-muted-foreground">{req.semester}</TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig[req.status].className}`}>
                                <StatusIcon size={12} />
                                {req.status}
                              </span>
                            </TableCell>
                            <TableCell>
                              {req.status === 'Pending' && (
                                <div className="flex gap-1">
                                  <Button size="sm" variant="ghost" className="text-success h-7 px-2">Approve</Button>
                                  <Button size="sm" variant="ghost" className="text-destructive h-7 px-2">Reject</Button>
                                </div>
                              )}
                              {req.status === 'Approved' && (
                                <Dialog open={coordOpen} onOpenChange={setCoordOpen}>
                                  <DialogTrigger asChild>
                                    <Button size="sm" variant="outline" className="h-7">Coordinate</Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-lg">
                                    <DialogHeader>
                                      <DialogTitle className="font-heading">Coordination Details</DialogTitle>
                                    </DialogHeader>
                                    <CoordinationForm onClose={() => setCoordOpen(false)} />
                                  </DialogContent>
                                </Dialog>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
