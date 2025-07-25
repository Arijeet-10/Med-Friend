"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { suggestDiagnoses } from '@/ai/flows/suggest-diagnoses';
import { Sparkles, Lightbulb } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

export function AiDiagnosis() {
  const [symptoms, setSymptoms] = useState('');
  const [diagnoses, setDiagnoses] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) {
      toast({
        title: 'Symptoms required',
        description: 'Please enter patient symptoms before suggesting diagnoses.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setDiagnoses(null);

    try {
      const result = await suggestDiagnoses({ symptoms });
      setDiagnoses(result.diagnoses);
    } catch (error) {
      console.error('AI diagnosis error:', error);
      toast({
        title: 'Error',
        description: 'Failed to get AI-powered suggestions. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI-Assisted Diagnosis
        </CardTitle>
        <CardDescription>
          Enter patient symptoms to get a list of potential diagnoses. This tool is for informational purposes and does not replace professional medical advice.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="symptoms">Symptoms</Label>
            <Textarea
              id="symptoms"
              placeholder="e.g., high fever, persistent cough, headache..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              rows={4}
              disabled={isLoading}
            />
          </div>
          {isLoading && (
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          )}
          {diagnoses && (
            <Card className="bg-muted/50">
                <CardHeader className='pb-2'>
                    <CardTitle className="text-md flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-yellow-500" />
                        Suggested Diagnoses
                    </CardTitle>
                </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-sm">{diagnoses}</p>
              </CardContent>
            </Card>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Thinking...' : 'Suggest Diagnoses'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
