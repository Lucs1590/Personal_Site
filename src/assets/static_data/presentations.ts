import { PresentationEvent } from 'src/app/models/presentation-event.model';

export type { PresentationEvent };

export const presentationEvents: PresentationEvent[] = [
  {
    id: 1,
    date: '2022-11-15',
    location: 'Pompéia, SP, Brasil',
    tags: ['Machine Learning', 'Computer Vision', 'Agriculture', 'Deep Learning'],
    highlight: true,
    visibility: 'public'
  },
  {
    id: 2,
    date: '2023-04-20',
    location: 'Bauru, SP, Brasil',
    tags: ['Deep Learning', 'Sign Language', 'Accessibility', 'Computer Vision'],
    highlight: true,
    visibility: 'public'
  },
  {
    id: 3,
    date: '2023-08-10',
    location: 'Porto Alegre, RS, Brasil',
    tags: ['MLOps', 'SageMaker', 'MLflow', 'Machine Learning Engineering'],
    highlight: false,
    visibility: 'private'
  },
  {
    id: 4,
    date: '2022-03-05',
    location: 'Pompéia, SP, Brasil',
    tags: ['Big Data', 'Agriculture', 'Data Science'],
    highlight: false,
    visibility: 'public'
  },
  {
    id: 5,
    date: '2023-09-28',
    location: 'Bauru, SP, Brasil',
    tags: ['Semantic Segmentation', 'CNN', 'Remote Sensing', 'Deep Learning'],
    highlight: false,
    visibility: 'private'
  },
  {
    id: 6,
    date: '2020-06-05',
    location: 'Pompeia, SP, Brasil',
    videoUrl: 'https://www.youtube.com/watch?v=Zh-XW0s_LTc',
    tags: ['Neo4j', 'Graph Database', 'Cypher', 'NoSQL', 'SQL'],
    highlight: false,
    visibility: 'public'
  }
];
