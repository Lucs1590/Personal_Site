import { PresentationEvent } from 'src/app/models/presentation-event.model';

export type { PresentationEvent };

export const presentationEvents: PresentationEvent[] = [
  {
    id: 1,
    date: '2020-12-29',
    location: 'Bauru, SP, Brasil',
    tags: ['Face Recognition', 'Image Processing', 'Machine Learning', 'Computer Vision'],
    videoUrl: 'https://youtu.be/pKoY04Jn1U8?si=twd4zR5utXk5bGBu',
    highlight: false,
    visibility: 'public'
  },
  {
    id: 2,
    date: '2020-12-29',
    location: 'Bauru, SP, Brasil',
    tags: ['Digital Image Processing', 'Computer Vision', 'Image Registration', 'Geometric Transformations', 'Camera Calibration'],
    videoUrl: 'https://youtu.be/nwN4Hpc_jTg?si=45ZydrlYlC1hNH7k',
    highlight: false,
    visibility: 'public'
  },
  {
    id: 3,
    date: '2020-09-27',
    location: 'Quintana, SP, Brasil',
    tags: ['GitHub', 'Software Development', 'Version Control', 'CI/CD'],
    videoUrl: 'https://youtu.be/FTPM2dpL-Rs?si=Y2bTQ_mLTDV3x92N',
    highlight: false,
    visibility: 'public'
  }
];
