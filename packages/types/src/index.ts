export interface HealthResponse {
  status: string;
  timestamp: string;
}

export interface ImageProcessingJob {
  id: string;
  userId: string;
  originalUrl: string;
  processedUrl?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  type: 'bg-removal' | 'lifestyle' | 'ghost-mannequin' | 'studio-white';
  createdAt: string;
  updatedAt: string;
}
